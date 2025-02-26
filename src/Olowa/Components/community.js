import React, { useContext, useEffect, useState } from 'react';
import "../index";
import { Link } from "react-router-dom";
import Img from '../../assets/i1.png';
import Img1 from '../../assets/i2.png';
import Img2 from '../../assets/i3.png';
import Img3 from '../../assets/i4.png';
import Img4 from '../../assets/i5.png';
import Lg from '../../assets/Group.png';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';


const CommunityEngagement = () => {
  const {selectedLanguage} = useContext(LanguageContext);
  const [contents, setContents] = useState();

  // Get contents on component mount
  useEffect(() => {
      const fetchContents = async () => {
          try {
              const savedContents = localStorage.getItem("contents");
              if (savedContents) {
                  setContents(JSON.parse(savedContents));
              } else {
                  // Fetch contents if not in localStorage
                  const response = await getAllContents();
                  setContents(response.data);
                  localStorage.setItem("contents", JSON.stringify(response.data));
              }
          } catch (error) {
              console.error('Failed to fetch contents:', error.message || error);
          }
      };
      fetchContents();
  }, []);


  return (
    <div className="container">
        <div className="d-flex justify-content-center">
            <div style={{ padding: "0 6rem" }}>
                <div className="d-flex align-items-center">
                    <h1 className="position-relative title-certifications" style={{ textTransform: "uppercase",fontSize:'30px',fontWeight:'700' }}>
                      {selectedLanguage === 'fr' ? contents?.communoty_page_title.content_fr : contents?.communoty_page_title.content_en}
                    </h1>
                </div>
                <div className="row mt-4">
                {contentData.map((item, index) => (
                    <React.Fragment key={index}>
                    {item.imageFirst && (
                        <div className="col-lg-6 mx-auto mb-4 p-4">
                          <div className="position-relative">
                              <img src={item.image} alt="" className="image-fluid w-100" style={{ borderRadius: item.borderRadius, maxHeight:'70vh', objectFit:'cover'}} />
                              <div className={item.positionClass}>
                              <img src={Lg} alt="" style={{ width: "80%" }} />
                              </div>
                          </div>
                        </div>
                    )}
                    <div className="col-lg-6 mx-auto mb-4 p-4 align-self-center">
                        <div className="p-4">
                          <h2 style={{ color: "#17416F", fontWeight: 700, textTransform: "uppercase",fontSize:'30px' }}>{item.title}</h2>
                          <p className="mt-3" style={{ color: "#17416F" }}>{item.description}</p>
                          <div className="mt-4">
                              <Link 
                              to="/community"
                              className="btn btn-r text-white px-4"
                              style={{ backgroundColor: "#13AB9C", padding: "8px 0" }}
                              >
                              Learn More
                              </Link >
                          </div>
                        </div>
                    </div>
                    {!item.imageFirst && (
                        <div className="col-lg-6 mx-auto mb-4 p-4">
                        <div className="position-relative">
                            <img src={item.image} alt="" className="image-fluid w-100" style={{ borderRadius: item.borderRadius }} />
                            <div className={item.positionClass}>
                            <img src={Lg} alt="" style={{ width: "80%" }} />
                            </div>
                        </div>
                        </div>
                    )}
                    </React.Fragment>
                ))}
                </div>
                <br /><br />
                <span className="mt-4 d-block" style={{ borderBottom: "1px solid #17416F" }}></span>
                <br /><br />
            </div>
        </div>
    </div>
  );
};

const contentData = [
  {
    title: "Wellness programs",
    description:
      "Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo.Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat. Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligula. Phasellus consequat risus sit amet mi dapibus vehicula.",
    image: Img,
    borderRadius: "0 30px 0 0",
    positionClass: "position",
    imageFirst: true,
  },
  {
    title: "Awareness campaigns",
    description:
      "Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo.Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat. Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligula. Phasellus consequat risus sit amet mi dapibus vehicula.",
    image: Img1,
    borderRadius: "30px 0 0 0",
    positionClass: "position1",
    imageFirst: false,
  },
  {
    title: "Patient stories",
    description:
      "Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo.Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat. Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligula. Phasellus consequat risus sit amet mi dapibus vehicula.",
    image: Img2,
    borderRadius: "0 30px  0 0",
    positionClass: "position",
    imageFirst: true,
  },
  {
    title: "Blood donation",
    description:
      "Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo.Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat. Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligula. Phasellus consequat risus sit amet mi dapibus vehicula.",
    image: Img3,
    borderRadius: "30px 0 0 0",
    positionClass: "position1",
    imageFirst: false,
  },
  {
    title: "Charity",
    description:
      "Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo.Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat. Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligula. Phasellus consequat risus sit amet mi dapibus vehicula.",
    image: Img4,
    borderRadius: "0 30px  0 0",
    positionClass: "position",
    imageFirst: true,
  },
];

export default CommunityEngagement;
