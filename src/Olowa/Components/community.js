import React, { useContext, useEffect, useState } from 'react';
import "../index.css";
import { Link } from "react-router-dom";
// import Img from '../../assets/i1.png';
// import Img1 from '../../assets/i2.png';
// import Img2 from '../../assets/i3.png';
// import Img3 from '../../assets/i4.png';
// import Img4 from '../../assets/i5.png';
import Lg from '../../assets/Group.png';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

const CommunityEngagement = () => {
  const { selectedLanguage } = useContext(LanguageContext);
  const [contents, setContents] = useState();

  // Get contents on component mount
  useEffect(() => {
    const fetchContents = async () => {
      try {
        // const savedContents = localStorage.getItem("contents");
        // if (savedContents) {
        //   setContents(JSON.parse(savedContents));
        // } else {
        // Fetch contents if not in localStorage
        const response = await getAllContents();
        setContents(response.data);
        //   localStorage.setItem("contents", JSON.stringify(response.data));
        // }
      } catch (error) {
        console.error('Failed to fetch contents:', error.message || error);
      }
    };
    fetchContents();
  }, []);

  const contentData = [
    {
      anchor: "section1",
      title: selectedLanguage === 'fr' ? contents?.communoty_page_menu_1_title.content_fr : contents?.communoty_page_menu_1_title.content_en,
      description: selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
        __html: contents?.communoty_page_menu_1_desc.content_fr
      }} />) : (<div dangerouslySetInnerHTML={{
        __html: contents?.communoty_page_menu_1_desc.content_en
      }} />),
      image: selectedLanguage === 'fr' ? contents?.communoty_page_menu_1_img.image : contents?.communoty_page_menu_1_img.image,
      borderRadius: "0 30px 0 0",
      positionClass: "position",
      imageFirst: true,
    },
    {
      anchor: "section2",
      title: selectedLanguage === 'fr' ? contents?.communoty_page_menu_2_title.content_fr : contents?.communoty_page_menu_2_title.content_en,
      description: selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
        __html: contents?.communoty_page_menu_2_desc.content_fr
      }} />) : (<div dangerouslySetInnerHTML={{
        __html: contents?.communoty_page_menu_2_desc.content_en
      }} />),
      image: selectedLanguage === 'fr' ? contents?.communoty_page_menu_2_img.image : contents?.communoty_page_menu_2_img.image,
      borderRadius: "30px 0 0 0",
      positionClass: "position1",
      imageFirst: false,
    },
    {
      anchor: "section3",
      title: selectedLanguage === 'fr' ? contents?.communoty_page_menu_3_title.content_fr : contents?.communoty_page_menu_3_title.content_en,
      description: selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
        __html: contents?.communoty_page_menu_3_desc.content_fr
      }} />) : (<div dangerouslySetInnerHTML={{
        __html: contents?.communoty_page_menu_3_desc.content_en
      }} />),
      image: selectedLanguage === 'fr' ? contents?.communoty_page_menu_3_img.image : contents?.communoty_page_menu_3_img.image,
      borderRadius: "0 30px  0 0",
      positionClass: "position",
      imageFirst: true,
    },
    {
      anchor: "section4",
      title: selectedLanguage === 'fr' ? contents?.communoty_page_menu_4_title.content_fr : contents?.communoty_page_menu_4_title.content_en,
      description: selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
        __html: contents?.communoty_page_menu_4_desc.content_fr
      }} />) : (<div dangerouslySetInnerHTML={{
        __html: contents?.communoty_page_menu_4_desc.content_en
      }} />),
      image: selectedLanguage === 'fr' ? contents?.communoty_page_menu_4_img.image : contents?.communoty_page_menu_4_img.image,
      borderRadius: "30px 0 0 0",
      positionClass: "position1",
      imageFirst: false,
    },
    {
      anchor: "section5",
      title: selectedLanguage === 'fr' ? contents?.communoty_page_menu_5_title.content_fr : contents?.communoty_page_menu_5_title.content_en,
      description: selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
        __html: contents?.communoty_page_menu_5_desc.content_fr
      }} />) : (<div dangerouslySetInnerHTML={{
        __html: contents?.communoty_page_menu_5_desc.content_en
      }} />),
      image: selectedLanguage === 'fr' ? contents?.communoty_page_menu_5_img.image : contents?.communoty_page_menu_5_img.image,
      borderRadius: "0 30px  0 0",
      positionClass: "position",
      imageFirst: true,
    },
  ];

  return (
    <div className="container dir">
      <div className="d-flex justify-content-center">
        <div className='comm'>
          <div className="d-flex align-items-center">
            <h1 className="position-relative tit title-certifications" style={{ textTransform: "uppercase", fontSize: '30px', fontWeight: '700' }}>
              {selectedLanguage === 'fr' ? contents?.communoty_page_title.content_fr : contents?.communoty_page_title.content_en}
            </h1>
          </div>
          {contentData.map((item, index) => (
            <div className="row mt-4" key={index}>
              {index % 2 === 0 ? (
                <>
                  <div
                    data-aos="fade-right" data-aos-duration="500"
                    className="col-lg-6 mx-auto mb-4 p-2 p-lg-4 order-1">
                    <div className="position-relative">
                      <img src={item.image} alt="" className="image-fluid w-100 main-img1" style={{ borderRadius: item.borderRadius, objectFit: 'cover' }} />
                      <div className={item.positionClass}>
                        <img src={Lg} alt="" style={{ width: "80%" }} />
                      </div>
                    </div>
                  </div>
                  <div
                    data-aos="fade-left" data-aos-duration="500"
                    className="col-lg-6 mx-auto mb-4 p-0 p-lg-4 align-self-center order-2">
                    <div className="p-2 p-lg-4">
                      <h2 style={{ color: "#17416F", fontWeight: 700, textTransform: "uppercase", fontSize: '30px' }}>{item.title}</h2>
                      <div className="mt-3" style={{ color: "#17416F", display: "-webkit-box", WebkitLineClamp: 10, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.description}</div>
                      <div className="mt-4">
                        <Link
                          to={`/community#${item.anchor}`}
                          className="btn btn-r text-white px-4"
                          style={{ backgroundColor: "#13AB9C", padding: "10px 45px", fontWeight: "700" }}
                        >
                          {selectedLanguage === 'fr' ? contents?.home_page_welcome_button.content_fr : contents?.home_page_welcome_button.content_en}
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    data-aos="fade-right" data-aos-duration="500"
                    className="col-lg-6 mx-auto mb-4 p-0 p-lg-4 align-self-center order-2 order-lg-1">
                    <div className="p-2 p-lg-4">
                      <h2 style={{ color: "#17416F", fontWeight: 700, textTransform: "uppercase", fontSize: '30px' }}>{item.title}</h2>
                      <div className="mt-3" style={{ color: "#17416F", display: "-webkit-box", WebkitLineClamp: 10, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.description}</div>
                      <div className="mt-4">
                        <Link
                          to={`/community#${item.anchor}`}
                          className="btn btn-r text-white px-4"
                          style={{ backgroundColor: "#13AB9C", padding: "10px 45px", fontWeight: "700" }}
                        >
                          {selectedLanguage === 'fr' ? contents?.home_page_welcome_button.content_fr : contents?.home_page_welcome_button.content_en}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    data-aos="fade-left" data-aos-duration="500"
                    className="col-lg-6 mx-auto mb-4 p-2 p-lg-4 order-1 order-lg-2">
                    <div className="position-relative">
                      <img src={item.image} alt="" className="image-fluid w-100 main-img1" style={{ borderRadius: item.borderRadius, objectFit: 'cover' }} />
                      <div className={item.positionClass}>
                        <img src={Lg} alt="" style={{ width: "80%" }} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          <br /><br />
          <span className="mt-4 d-block" style={{ borderBottom: "1px solid #17416F" }}></span>
          <br /><br />
        </div>
      </div>
    </div>
  );
};

export default CommunityEngagement;
