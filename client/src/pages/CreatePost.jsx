import { Button, FileInput, Select, TextInput, Alert } from 'flowbite-react'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import ReactQuill, {Quill} from 'react-quill';
import 'quill/dist/quill.snow.css';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { app } from '../firebase';
import QuillResizeImage from 'quill-resize-image';

Quill.register("modules/resize", QuillResizeImage);

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [quillImageUploadProgress, setQuillImageUploadProgress] = useState(null)
    const [quillImageUploadError, setQuillImageUploadError] = useState(null)
    const [quillVideoUploadProgress, setQuillVideoUploadProgress] = useState(null)
    const [quillVideoUploadError, setQuillVideoUploadError] = useState(null)
    const [formData, setFormData] = useState({content: ''});
    const [publishError, setPublishError] = useState(null);
    const quillRef = useRef(null)
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Tạo bài viết mới - Bụt kể chuyện'

        const savedFormData = sessionStorage.getItem('formData')
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }
    }, [])

    useEffect(() => {
        // Save form data to localStorage whenever formData changes
        sessionStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const handleUploadImage = async () => {
        try {
        if (!file) {
            setImageUploadError('Vui lòng chọn 1 ảnh để tải lên');
            return;
        }
        else {
            const isImage = file.type.startsWith('image/');
            if (!isImage) 
            {  setImageUploadError('File tải lên phải là ảnh (jpg, jpeg, png,...) :<')
                return
             }
            
        }
        setImageUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, `postThumbnails/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageUploadError('Không thể tải ảnh lên (ảnh không được lớn hơn 3MB)');
                setImageUploadProgress(null);
            },
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageUploadProgress(null);
                setImageUploadError(null);
                setFormData({ ...formData, image: downloadURL });
            });
            }
        );
        } catch (error) {
            setImageUploadError('Lỗi khi tải ảnh lên :(');
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/post/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            setPublishError(data.message);
            return;
          }
    
          if (res.ok) {
            setPublishError(null);
            navigate(`/post/${data.slug}`);
            sessionStorage.removeItem('formData')
          }
        } catch (error) {
          setPublishError('Có lỗi gì đó khi tạo bài viết mới :(');
          console.log(error);
        }
    };

    const imageHandler = async () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()
        input.onchange = async () => {
            const file = input.files[0]
            try {
            if (file) {
                const isImage = file.type.startsWith('image/');
                if (!isImage) 
                {  setQuillImageUploadError('File tải lên phải là ảnh (jpg, jpeg, png,...) :<')
                    return
                 }
                
            }
            setQuillImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, `postImages/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    setQuillImageUploadProgress('Chờ một chút, đang tải ảnh của bạn lên...');
                },
                (error) => {
                    setQuillImageUploadError('Không thể tải ảnh lên (ảnh không được lớn hơn 3MB)');
                    setQuillImageUploadProgress(null);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setQuillImageUploadProgress(null);
                    setQuillImageUploadError(null);
        
                    // Get the editor instance within the callback
                    if (quillRef.current) {
                        const editor = quillRef.current.getEditor();
                        
                        // Ensure the editor is ready
                        if (editor) {
                          // Get the length of the editor content
                          const range = editor.getSelection();
                            if (range) {
                            // Ensure the range is valid
                                if (range.index !== null && range.length !== null) {
                                    editor.insertEmbed(range.index, 'image', downloadURL)
                                } else {
                                    setQuillImageUploadError('Lỗi khi load ảnh lên trình soạn thảo :(')
                                    console.log('Invalid range', range);
                                }
                            } else {
                                setQuillImageUploadError('Lỗi khi load ảnh lên trình soạn thảo :(')
                                console.log('No range selected');
                            }
                        }
                        else {
                            setQuillImageUploadError('Lỗi khi load ảnh lên trình soạn thảo :(')
                            console.error('React Quill editor not found');
                        }
                      }
                  }
            );
            } catch (error) {
                setQuillImageUploadError('Lỗi khi tải ảnh lên :(');
                setQuillImageUploadProgress(null);
                console.log(error);
            }
        }
        
    }

    const videoHandler = async () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'video/*')
        input.click()
        input.onchange = async () => {
            const file = input.files[0]
            try {
            if (file) {
                const isvideo = file.type.startsWith('video/');
                if (!isvideo) 
                {  setQuillVideoUploadError('File tải lên phải là video (mp4, mkv, flv,...) :<')
                    return
                 }
                
            }
            setQuillVideoUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, `postVideos/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    setQuillVideoUploadProgress('Chờ một chút, đang tải video của bạn lên...');
                },
                (error) => {
                    setQuillVideoUploadError('Không thể tải video lên (video không được lớn hơn 50MB)');
                    setQuillVideoUploadProgress(null);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setQuillVideoUploadProgress(null);
                    setQuillVideoUploadError(null);
        
                    // Get the editor instance within the callback
                    if (quillRef.current) {
                        const editor = quillRef.current.getEditor();
                        
                        // Ensure the editor is ready
                        if (editor) {
                          // Get the length of the editor content
                          const range = editor.getSelection();
                            if (range) {
                                // Ensure the range is valid
                                if (range.index !== null && range.length !== null) {
                                    editor.insertEmbed(range.index, 'video', downloadURL)
                                } else {
                                    setQuillImageUploadError('Lỗi khi load video lên trình soạn thảo :(')
                                    console.log('Invalid range', range);
                                }
                            } else {
                                setQuillImageUploadError('Lỗi khi load video lên trình soạn thảo :(')
                                console.log('No range selected');
                            }
                        }
                        else {
                            setQuillImageUploadError('Lỗi khi load ảnh lên trình soạn thảo :(')
                            console.error('React Quill editor not found');
                        }
                      }
                  }
            );
            } catch (error) {
                setQuillVideoUploadError('Lỗi khi tải video lên :(');
                setQuillVideoUploadProgress(null);
                console.log(error);
            }
        }
        
    }

    useEffect(() => {
        if (quillRef.current) {
          const editor = quillRef.current.getEditor();
          
          // Ensure the editor is ready
          if (editor) {
            // Add the handler to a custom button
            const toolbar = editor.getModule('toolbar');
            toolbar.addHandler('image', imageHandler)
            toolbar.addHandler('background', videoHandler)
            const videoButton = document.querySelector('.ql-background');
            if (videoButton) {
                videoButton.innerHTML = '<i class="fas fa-file-video" style="height: 10px"></i>';
                videoButton.classList.add('dark:text-quilltool', 'inline-flex', 'h-[16px]')
            }
          }
        }
        
      }, []);
    
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-xl sm:text-3xl my-7 font-semibold font-merriweather'>Tạo bài viết mới</h1>
            <form action="" className='flex flex-col gap-4 mb-5' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' placeholder='Tiêu đề bài viết' required id='title'
                    className='flex-1 font-merriweather font-semibold' onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    value={formData.title} />
                    <Select onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                    value={formData.category}
                    className='font-merriweather'>
                        <option value="random">Chuyện lung tung</option>
                        <option value="life">Chuyện đời sống</option>
                        <option value="love">Chuyện tình yêu</option>
                        <option value="friendship">Chuyện tình bạn</option>
                        <option value="feelings">Lời tâm sự</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center thumbnail justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                        className='font-lora thumbnail-upload'
                    />
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        size='sm'
                        outline
                        onClick={handleUploadImage}
                        disabled={imageUploadProgress}
                        className='font-lora font-semibold'
                    >
                        {imageUploadProgress ? (
                        <div className='w-16 h-16'>
                            <CircularProgressbar
                            value={imageUploadProgress}
                            text={`${imageUploadProgress || 0}%`}
                            />
                        </div>
                        ) : (
                        'Tải ảnh lên'
                        )}
                    </Button>
                </div>
                {imageUploadError && <Alert className='font-lora font-semibold' color='failure'>{imageUploadError}</Alert>}
                {formData.image && (
                    <img
                        src={formData.image}
                        alt='upload'
                        className='w-full h-full object-cover'
                    />
                )}
                <ReactQuill 
                    ref={quillRef} 
                    theme='snow' 
                    placeholder='Viết gì đó đi...' 
                    className='min-h-72 mb-12' 
                    required 
                    onChange={(value) => {
                        setFormData({ ...formData, content: value })
                    }}
                    value={formData.content}
                    modules={{
                        toolbar: {
                            container: [
                                [{ 'header': [1, 2, 3, false] }],
                                [{ 'size': [] }],
                                [{ 'align' : []}],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                ['link', 'video', 'image', 'background'],
                                ['clean'],
                            ],
                        },
                        resize: {
                            
                        },
                    }}
                />
                {quillImageUploadProgress && <Alert className='font-lora font-semibold' color='success'>{quillImageUploadProgress}</Alert>}
                {quillImageUploadError && <Alert className='font-lora font-semibold' color='failure'>{quillImageUploadError}</Alert>}
                {quillVideoUploadProgress && <Alert className='font-lora font-semibold' color='success'>{quillVideoUploadProgress}</Alert>}
                {quillVideoUploadError && <Alert className='font-lora font-semibold' color='failure'>{quillVideoUploadError}</Alert>}
                <Button type='submit' gradientDuoTone='purpleToPink' className='font-merriweather font-semibold'>Xuất bản</Button>
                {publishError && (
                    <Alert className='mt-5 font-lora font-semibold' color='failure'>
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    )
}
