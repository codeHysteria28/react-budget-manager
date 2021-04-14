import React from 'react'
import * as Sentry from "@sentry/react";
import bg from './images/5240.jpg';
import feature1 from './images/feature1.png';
import feature2 from './images/feature2.png';
import Header from './components/Header'
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
                        <MDBCol md="5">
                            <img src={feature1} alt="feature 1" className="img-fluid"/>
                        </MDBCol>
                        <MDBCol md="7">
                            <h3>Simple Statistics</h3>
                            <p>Our lovely, clear and simple statistics will displat all the valuable info about your spendings which matter the most ! They covering lots of
                                categories eg. Total spend, most expensive item, travel, groceries, clothes, electronics, hobby, gifts, app payments, uncategorized. More categories
                                will be added to support the needs of the customer. As we are always want to improve and listen to our customer needs you can give us on some improvements
                                on this statistics whenever you want to. PS. Graphs comming soon.
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <br/>
                    <br/>
                    <br/>
                    <MDBRow>
                        <MDBCol md="5">
                            <img src={feature2} alt="feature 1" className="img-fluid"/>
                        </MDBCol>
                        <MDBCol md="7">
                            <h3>Spending/Income Breakdown</h3>
                            <p>The most important thing is to see where are you spending your funds. Yay! We have you covered with classic table showing data. This will allow you to see 
                                all the important data about spending eg. Item name, Item category, Item Cost and the Date when you paid for the item. You can hide/expand the amount of 
                                data that you want to see up to 100+ items on the screen at one time. Isn't that great ? Anytime if you would like to search for particular item,category,cost or even
                                date you can simply do it with prepared easy to use search box.
                            </p>
                        </MDBCol>
                    </MDBRow>
                </div>
            </MDBContainer>
        </>
    )
}

export default Sentry.withProfiler(LandingPage);
