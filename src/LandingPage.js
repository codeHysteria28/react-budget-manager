import React from 'react'
import * as Sentry from "@sentry/react";
import bg from './images/5240.jpg';
import feature1 from './images/feature1.png';
import feature2 from './images/feature2.png';
import support from './images/call-center-agent.png';
import easy from './images/easy-to-use.png';
import free from './images/free.png';
import Header from './components/Header'
import Footer from './components/Footer'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import './Landingpage.css'

const LandingPage = () => {
    const signUp = () => {
        window.location = '/signup';
    }


    return (
        <>
            <Header loc="landing_page"/>
            <MDBContainer>
                <MDBRow className="landing_page_row">
                    <MDBCol md="3" className="heading_col">
                        <h1 className="landing_heading">Your Simple <span className="heading_part2">Budget Manager</span></h1>
                        <MDBBtn color="success" type="button" className="get_started_btn" onClick={() => signUp()}>Get Started</MDBBtn>
                    </MDBCol>
                    <MDBCol md="9" className="img_col">
                        <img src={bg} alt="budget building background" className="bg-landing"/>   
                    </MDBCol>
                </MDBRow>
                <div className="our_features">
                    <h2 className="features_heading text-center">Our Features</h2>
                    <MDBRow>
                        <MDBCol md="6" className="statistics">
                            <h3 className="text-center mt-4 mb-3 feature_heading_detail">Simple Statistics</h3>
                            <img src={feature1} alt="feature 1" className="img-fluid"/>
                            <p className="feature_para_detail mt-3 text-center">Our lovely, clear and simple statistics will displat all the valuable info about your spendings which matter the most ! They covering lots of
                                categories eg. Total spend, most expensive item, travel, groceries, clothes, electronics, hobby, gifts, app payments, uncategorized. More categories
                                will be added to support the needs of the customer. As we are always want to improve and listen to our customer needs you can give us on some improvements
                                on this statistics whenever you want to. PS. Graphs comming soon.
                            </p>
                        </MDBCol>
                        <MDBCol md="6" className="breakdown">
                            <h3 className="text-center mt-4 mb-3 feature_heading_detail">Spending/Income Breakdown</h3>
                            <img src={feature2} alt="feature 1" className="img-fluid"/>
                            <p className="feature_para_detail mt-3 text-center">The most important thing is to see where are you spending your funds. Yay! We have you covered with classic table showing data. This will allow you to see 
                                all the important data about spending eg. Item name, Item category, Item Cost and the Date when you paid for the item. You can hide/expand the amount of 
                                data that you want to see up to 100+ items on the screen at one time. Isn't that great ? Anytime if you would like to search for particular item,category,cost or even
                                date you can simply do it with prepared easy to use search box.
                            </p>
                        </MDBCol>
                    </MDBRow>
                </div>
                <br/><br/><br/>
                <div className="whyUs">
                    <h2 className="features_heading text-center">Why us ?</h2>
                    <MDBRow>
                        <MDBCol md="4" className="text-center">
                            <h3 className="text-center mt-4 mb-3 feature_heading_detail">Free Usage</h3>
                            <img src={free} alt="free usage" className="why_us_img"/>       
                        </MDBCol>
                        <MDBCol md="4" className="text-center middle_us">
                            <h3 className="text-center mt-4 mb-3 feature_heading_detail">Easy to Use</h3>
                            <img src={easy} alt="easy to use" className="why_us_img"/>
                        </MDBCol>
                        <MDBCol md="4" className="text-center">
                            <h3 className="mt-4 mb-3 feature_heading_detail">Product Care</h3>
                            <img src={support} alt="product care" className="why_us_img"/>
                        </MDBCol>
                    </MDBRow>
                </div>
                <br/><br/><br/><br/><br/>
            </MDBContainer>
            <Footer/>
        </>
    )
}

export default Sentry.withProfiler(LandingPage);
