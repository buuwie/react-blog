import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState, useRef } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import QuillResizeImage from 'quill-resize-image';

Quill.register("modules/resize", QuillResizeImage);

export default function UpdatePost() {
  const [thumbnail, setThumbnail] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [quillImageUploadProgress, setQuillImageUploadProgress] = useState(null)
  const [quillImageUploadError, setQuillImageUploadError] = useState(null)
  const [quillVideoUploadProgress, setQuillVideoUploadProgress] = useState(null)
  const [quillVideoUploadError, setQuillVideoUploadError] = useState(null)
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const quillRef = useRef(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    document.title = 'Chỉnh sửa bài viết - Bụt kể chuyện';
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        setFormData(data.posts[0]);
        setPublishError(null);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!thumbnail) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const thumbnailName = new Date().getTime() + '-' + thumbnail.name;
      const storageRef = ref(storage, thumbnailName);
      const uploadTask = uploadBytesResumable(storageRef, thumbnail);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Không thể tải ảnh lên (ảnh không được lớn hơn 5MB)');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prevData) => ({ ...prevData, image: downloadURL }));
          });
        }
      );
    } catch (error) {
      setImageUploadError('Lỗi khi tải ảnh lên :(');
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${postId}/${currentUser._id}`, {
        method: 'PUT',
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
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const fileUpload = input.files[0];
      try {
        if (fileUpload) {
          const isImage = fileUpload.type.startsWith('image/');
          if (!isImage) {
            setQuillImageUploadError('File tải lên phải là ảnh (jpg, jpeg, png,...) :<');
            return;
          }
        }
        setQuillImageUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + fileUpload.name;
        const storageRef = ref(storage, `postImages/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, fileUpload);
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

            if (quillRef.current) {
              const editor = quillRef.current.getEditor();
              if (editor) {
                const range = editor.getSelection();
                if (range) {
                  if (range.index !== null && range.length !== null) {
                    editor.insertEmbed(range.index, 'image', downloadURL);
                  } else {
                    setQuillImageUploadError('Lỗi khi load ảnh lên trình soạn thảo :(')
                    console.log('Invalid range', range);
                  }
                } else {
                  setQuillImageUploadError('Lỗi khi load ảnh lên trình soạn thảo :(')
                  console.log('No range selected');
                }
              } else {
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
    };
  };

  const videoHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();
    input.onchange = async () => {
      const fileUpload = input.files[0];
      try {
        if (fileUpload) {
          const isVideo = fileUpload.type.startsWith('video/');
          if (!isVideo) {
            setQuillVideoUploadError('File tải lên phải là video (mp4, mkv, flv,...) :<');
            return;
          }
        }
        setQuillVideoUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + fileUpload.name;
        const storageRef = ref(storage, `postVideos/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, fileUpload);
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

            if (quillRef.current) {
              const editor = quillRef.current.getEditor();
              if (editor) {
                const range = editor.getSelection();
                if (range) {
                  if (range.index !== null && range.length !== null) {
                    editor.insertEmbed(range.index, 'video', downloadURL);
                  } else {
                    setQuillImageUploadError('Lỗi khi load video lên trình soạn thảo :(')
                    console.log('Invalid range', range);
                  }
                } else {
                  setQuillImageUploadError('Lỗi khi load video lên trình soạn thảo :(')
                  console.log('No range selected');
                }
              } else {
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
    };
  };

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor) {
        const toolbar = editor.getModule('toolbar');
        toolbar.addHandler('image', imageHandler);
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
      <h1 className='text-center text-3xl my-7 font-semibold font-merriweather'>Chỉnh sửa bài viết</h1>
      <form className='flex flex-col gap-4 mb-5' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1 font-merriweather font-semibold'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
            className='font-merriweather'
          >
            <option value="random">Chuyện lung tung</option>
            <option value="life">Chuyện đời sống</option>
            <option value="love">Chuyện tình yêu</option>
            <option value="friendship">Chuyện tình bạn</option>
            <option value="feelings">Lời tâm sự</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between thumbnail border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setThumbnail(e.target.files[0])}
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
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
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
            value={formData.content}
            placeholder='Viết gì đó đi...' 
            className='min-h-72 mb-12' 
            required 
            onChange={(value) => {
                setFormData({ ...formData, content: value })
            }}
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
        <Button type='submit' gradientDuoTone='purpleToPink' className='font-merriweather font-semibold'>
          Cập nhật bài viết
        </Button>
        {publishError && (
          <Alert className='mt-5 font-lora font-semibold mb-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}