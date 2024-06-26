import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery';
const Footer = () => {
  const [fetchedContent, setFetchedContent] = useState('');
  useEffect(() => {
    const fetchPHPFooter = async () => {
      try {
        const phpFilePath = 'https://www.lpuonline.com/include-pages/footer.php';
        const response = await $.ajax({
          url: phpFilePath,
          method: 'GET',
        });

        setFetchedContent(response);
      } catch (error) {
        console.error('Error fetching PHP footer:', error);
      }
    };

    fetchPHPFooter();

  }, []);

  useEffect(() => {
    //$("#form-npf").hide();
    
    $("#change-url-pro").on('click', function() {
     
      $("#form-npf").addClass("show");
     
    });
    $(".footer__logo").attr("src", "https://www.lpuonline.com/images/footer-logo.svg");
    $(".img-fluid").attr("src", "https://www.lpuonline.com/images/appstore.png");
    $(".mobile-app img:eq(1)").attr("src", "https://www.lpuonline.com/images/googleplay.png");
    $(".bot").attr("src", "https://www.lpuonline.com/images/whatsapp-icon.png");

    $("#scroll-top").hide();
    $(".sticky-bar.hide-on-mobile").hide();
    $(".bot").hide();

    // var currentYear = new Date().getFullYear();
    // $("p.copy-desc.text-footer-gray").text(`Copyright © ${currentYear} Lovely Professional University`);

  }, [fetchedContent]);


  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  React.useEffect(() => {
    window.scroll({
      top: position.top,
      left: position.left,
      behavior: 'smooth'
    })
  })


  const scrollTop = useRef(null);
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      window.scrollY > 300
        ? scrollTop.current.style.display = 'flex'
        : scrollTop.current.style.display = 'none'
    })
  })




  return (
      <footer>
        {fetchedContent && <div id="footer-container" className='mt-32' dangerouslySetInnerHTML={{ __html: fetchedContent }} />}

        <span
          onClick={() => setPosition({ ...position, position: { top: 0, left: 0 } })} className="circle fixed right-[6rem] bottom-12 bg-white text-gray-700 hover:bg-orange-500 hover:text-white text-lg z-50 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-300  " ref={scrollTop}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-[20px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
          </svg>
        </span>
      </footer>
  )
}

export default Footer;