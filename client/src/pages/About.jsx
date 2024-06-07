import FacebookChat from "../components/FacebookChat";
import { useEffect } from "react";

export default function About() {

  useEffect(() => {
    document.title = 'Giới thiệu - Bụt kể chuyện'
  })
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/398732311_3569972549880866_5573575815435589773_n%20-%20Copy.jpg?alt=media&token=cdeb67d6-a12d-4cb6-99de-1b6f4c31087a')] dark:bg-no-repeat dark:bg-cover bg-[url('https://firebasestorage.googleapis.com/v0/b/reactblog-c896c.appspot.com/o/config%20images%2F%E2%98%81%EF%B8%8F%20in%20the%20sky.jfif?alt=media&token=2d3ad86e-abd8-43d0-b601-00f3404d5575')] bg-no-repeat bg-cover">
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-4xl font font-semibold text-center my-7 font-philosopher'>
            About Bụt và Butkechuyen
          </h1>
          <div className='text-md text-black flex flex-col gap-6 mb-8 font-lora dark:text-kechuyentextlight'>
            <p>
              Chào các bạn, mình là Bụt,
              hiện tại mình đang sinh sống và làm việc tại thủ đô Hà Nội.
            </p>

            <p>
              Thực ra mà nói, blogger không phải nghề chính của mình, chỉ là sở thích riêng của mình thôi.
              Khi mình còn nhỏ hơn, mình đã rất hay viết nhật ký, không chỉ về những trải nghiệm thường ngày của mình,
              mà ngay cả những tiếng thở dài, than vãn về đời sống xã hội, từ đó trở đi mình dần trở nên hứng thú với viết lách,
               rất nghiện việc viết lách là đằng khác, mặc dù đôi khi những lời mình viết có thể hơi khó hiểu cho lắm.
               Lý do chân thành nhất mình viết lách là vì nó cho phép mình được sống trong một thế giới hoàn toàn khác so với cái vỏ ngoài nhàm chán của mình.
                Đơn giản chỉ là vậy thôi, không có gì cao siêu hay huyền bí cả.
            </p>

            <p>
              Khoảng giữa đến cuối năm 2022, mình có tạo 1 trang blog cá nhân trên Instagram tên là Butkechuyen (mình hơi bị flop về followers :v), chủ yếu là
              những câu chuyện trong đời sống hoặc là những lời tâm sự của bạn bè mình hay một vài bạn độc giả gửi ẩn danh cho mình.
              Mình cũng không phải là người giỏi lắng nghe, nhưng mình vẫn luôn lắng nghe câu chuyện hay tâm sự của mọi người, và cố gắng hiểu theo cảm nhận của mình.
              Đôi khi một vài lời an ủi, một vài lời khuyên đối với mình nó hơi khó khăn, vì mình hơi hướng nội ít nói :v, nên mình hay dùng lời viết để có thể diễn đạt sự an ủi ấy,
              mỗi bài viết là một câu chuyện của các bạn, cùng với những lời tâm tư mình gửi đến cho các bạn,
              rằng "cuộc sống không thể lúc nào cũng suôn sẻ đâu, đời đôi khi có thể vui một chút,
              rồi lại buồn một chút cũng được mà...". Đây cũng là một nơi để mình ăn vạ, than thở và chia sẻ cuộc đời tối như cái hũ nút của mình, chờ ai đấy đến mở hộ cái nắp ra.
              Thay vì cố gắng trấn an những con quái vật tâm lý đang dậy sóng trong đầu bằng những từ ngữ trần tục, mình thả lồng chúng ra và phân tích dưới nhiều góc độ.
            </p>
            <p>
              Mình hi vọng những câu chuyện của mình cũng có thể phần nào an ủi các bạn
              những lúc bạn cần một ai đó có thể hiểu nỗi lòng của bạn. Chúng ta ai cũng cần một người nào đó đó nói với chúng ta rằng đừng bao giờ từ bỏ hy vọng,
              một người có thể khiến chúng ta vực dậy lại tinh thần.
              Và hãy luôn nhớ rằng,<b className="dark:text-white"> chúng ta đều đến với thế giới này để yêu thương, và để được yêu thương.</b>
            </p>
          </div>
        </div>
      </div>
      <FacebookChat />
    </div>
  );
}