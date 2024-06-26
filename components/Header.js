import React, { useEffect, useState } from "react";
import $ from "jquery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = () => {
  // Custom arrow components
  // const CustomPrevArrow = (props) => <button {...props}>Previous</button>;

  // const CustomNextArrow = (props) => <button {...props}>Next</button>;

  const settings = {
    dots: false,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [fetchedContent, setFetchedContent] = useState("");
  const [topbarfetch, setTopBarFetch] = useState("");
  useEffect(() => {
    const fetchPHPHeader = async () => {
      try {
        const topBar = "https://www.lpuonline.com/include-pages/top-bar.php";
        const topresponse = await $.ajax({
          url: topBar,
          method: "GET",
        });
        setTopBarFetch(topresponse);

        const phpFilePath =
          "https://www.lpuonline.com/include-pages/header.php";
        const response = await $.ajax({
          url: phpFilePath,
          method: "GET",
        });
        setFetchedContent(response);
      } catch (error) {
        console.error("Error fetching PHP header:", error);
      }
    };

    fetchPHPHeader();

    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 1) {
        $(".header-menu-content").addClass("sticky");
      } else {
        $(".header-menu-content").removeClass("sticky");
      }
    });
  }, []);

  useEffect(() => {
    //on click close the top bar
    $(".topbar-close-wrapper").on("click", function () {
      $(".top_header").hide();
    });

    $(".mfp-hide").css("display", "none");
    $(".logo img").attr(
      "src",
      "https://www.lpuonline.com/images/LPU-Online-Logo.svg"
    );

    $(".down-button").hide();

    $(".popup-modal").on("click", function () {
      $(
        ".off-canvas-menu.custom-scrollbar-styled.category-off-canvas-menu"
      ).removeClass("active");
      $(".body-overlay").removeClass("active");
    });

    $(".popup-modal").on("click", function () {
      $(".mfp-hide").css("display", "block");
      $(".custom-login-form").show().css("z-index", "1000");
      $(".popup-modal-dismiss").show().css("z-index", "1000");
      $(".info-holder img").show().css("display", "none");
      $("body").css("overflow", "hidden");
      var overlay = $('<div class="modal-overlay"></div>').appendTo(
        ".mfp-hide.white-popup-block"
      );
      overlay.css({
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        "background-color": "#0b0b0b",
        "z-index": "999",
        opacity: "0.8",
      });
      $(".mfp-hide.white-popup-block").css("z-index", "1000");
    });

    var element = $("[data-cfsrc]");
    var dataSrc = element.attr("data-cfsrc");
    element
      .attr("src", dataSrc)
      .css({ display: "block", visibility: "visible" });

    // Handle login form submission
    $("#login-submit").on("click", function () {
      // Get the entered username and password
      var username = $("#username").val();
      var password = $("#password").val();

      $.ajax({
        url: `https://lms.lpuonline.com/api/WebAPI/ValidateUserLogin?username=${username}&password=${password}`,
        method: "GET",
        success: function (response) {
          // Parse the JSON response
          var responseData = JSON.parse(response);

          // Extract the URL from the response
          var redirectUrl = responseData.SSO;
          console.log(redirectUrl);
          if (redirectUrl != null)
            // Redirect to the response URL
            window.location.href = redirectUrl;
          // .replace('lms', 'staging').replace('SSOAuth',
          // 'SSOAuth/SsoRedirect');
          else $("#error-message").text(responseData.Message);
        },
        error: function (xhr, status, error) {
          // Handle the error
          var errorMessage = "Error: " + error;
          $("#error-message").text(errorMessage);
        },
      });

      // alert('Login successful!');
      // $('#login-modal').fadeOut();
    });

    $(".popup-modal-dismiss").on("click", function () {
      $(".mfp-hide").css("display", "none");
      $(".custom-login-form").hide();
      $(".popup-modal-dismiss").hide();
      $(".modal-overlay").hide();
      $("body").css("overflow", "scroll");
    });
    $(".custom-login-form").hide();
    $(".popup-modal-dismiss").hide();

    $(".off-canvas-menu-toggle").on("click", function () {
      $(
        ".off-canvas-menu.custom-scrollbar-styled.category-off-canvas-menu"
      ).addClass("active");
      $(".body-overlay").addClass("active");
    });

    $(
      ".off-canvas-menu-close.cat-menu-close.icon-element.icon-element-sm.shadow-sm"
    ).on("click", function () {
      $(
        ".off-canvas-menu.custom-scrollbar-styled.category-off-canvas-menu"
      ).removeClass("active");
      $(".body-overlay").removeClass("active");
    });

    $(".body-overlay").on("click", function () {
      $(
        ".off-canvas-menu.custom-scrollbar-styled.category-off-canvas-menu"
      ).removeClass("active");
      $(".body-overlay").removeClass("active");
    });

    $(".click2").append(
      '<button class="sub-nav-toggler" type="button"><i class="la la-angle-down"></i></button>'
    );

    //topbar code start here

    $(".icon-close").removeAttr("href").prop("onclick", null).off("click");
    $(".icon-close").attr("id", "myIconClose").css("cursor", "pointer");
    $("#myIconClose").on("click", function () {
      $(".closable").hide();
    });

    $(".generic-list-item li a .sub-nav-toggler").on("click", function () {
      var index = $(".sub-nav-toggler").index(this);
      var $submenu = $(".generic-list-item li .sub-menu").eq(index);
      var $icon = $(this).find("i");

      // Check if the submenu is visible
      if ($submenu.is(":visible")) {
        // If visible, slide up with slow animation and remove active class
        $submenu.slideUp("slow");
        $(this).removeClass("active");
        // Change icon to angle-down and set color to default
        $icon
          .removeClass("la-angle-up")
          .addClass("la-angle-down")
          .css("color", "");
      } else {
        // If not visible, slide down with slow animation and add active class
        $submenu.slideDown("slow");
        $(this).addClass("active");
        // Change icon to angle-up and set color to #f58220
        $icon
          .removeClass("la-angle-down")
          .addClass("la-angle-up")
          .css("color", "#f58220");
        // Hide other submenus and remove active classes
        $(".generic-list-item li .sub-menu").not($submenu).slideUp("slow");
        $(".sub-nav-toggler").not(this).removeClass("active");
        // Change icons of other buttons to angle-down and set color to default
        $(".sub-nav-toggler")
          .not(this)
          .find("i")
          .removeClass("la-angle-up")
          .addClass("la-angle-down")
          .css("color", "");
      }
    });
  }, [fetchedContent]);

  return (
    <>
      <header>
        {/* <Slider {...settings} className="bg-[#f58220]">
          <div className="fixedcausol">
            <p className="text-white text-[15px]">
              {" "}
              <a href="https://admission.lpuonline.com/" target="_blank">
                <strong>Admission open</strong> for Jan’24 session.
              </a>{" "}
            </p>
          </div>
          <div className="fixedcausol">
            <p className="text-white text-[15px]">
              <a target="_blank" href="https://admission.lpuonline.com/">
                Get up to 25%* Student Grant. Apply Now!
              </a>
            </p>
          </div>
          <div className="fixedcausol">
            <p className="text-white text-[15px]">
              <a
                class="fs-15"
                href="images/UGC-Notice.jpg"
                data-fancybox="gallery"
                data-caption="LPU"
                tabindex="0"
              >
                Click here to view UGC equivalency notice.
              </a>
            </p>
          </div>
        </Slider> */}

        <div className="topbar-close-wrapper">
          <a style={{ paddingLeft: 50 }} href="#" className="icon-close">
            ✖ 
          </a>
        </div>

        <div>
          <Slider {...settings} className="top_header bg-[#f58220]">
            <div>
              <div className="fixedcausol">
                <p className="text-white text-[15px]">
                  {" "}
                  <a href="https://admission.lpuonline.com/" target="_blank">
                    <strong>Admission open</strong> for Jan’24 session.
                  </a>{" "}
                </p>
              </div>
            </div>
            <div>
              <div className="fixedcausol">
                <p className="text-white text-[15px]">
                  <a target="_blank" href="https://admission.lpuonline.com/">
                    Get up to 25%* Student Grant. Apply Now!
                  </a>
                </p>
              </div>
            </div>
            <div>
              <div className="fixedcausol">
                <p className="text-white text-[15px]">
                  <a
                    className="fs-15"
                    href="images/UGC-Notice.jpg"
                    data-fancybox="gallery"
                    data-caption="LPU"
                    tabIndex="0"
                  >
                    Click here to view UGC equivalency notice.
                  </a>
                </p>
              </div>
            </div>
            {/* <div>
          <h3>FORTH SLIDE</h3>
        </div> */}
          </Slider>
        </div>
        {/* <div id="header_topcontainer">
          {topbarfetch && (
            <div dangerouslySetInnerHTML={{ __html: topbarfetch }} />
          )}
        </div> */}

        <div id="header-container">
          {fetchedContent && (
            <div dangerouslySetInnerHTML={{ __html: fetchedContent }} />
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
