import React, {useState} from 'react';
import * as Sentry from "@sentry/react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBtn } from "mdbreact";
import './Footer.css';
import support from '../images/call-center-agent.png';
import easy from '../images/easy-to-use.png';
import free from '../images/free.png';
import bg from '../images/5240.jpg';
import app from '../images/app-ico.png';
import cashier from '../images/cashier.png';
import card from '../images/debit-card.png';
import dest from '../images/destination.png';
import device from '../images/device.png';
import fashion from '../images/fashion.png';
import gift from '../images/gift-box.png';
import groceries from '../images/groceries.png';
import investment from '../images/investment.png';
import mh from '../images/mental-health.png';
import money from '../images/money.png';
import rocket from '../images/rocket.png';

const Footer = () => {
    const [modal,setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    return(
        <MDBFooter color="default-color" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">Budgeter Club</h5>
                        <small>Alpha v1.0</small>
                        <p>Created with ❤️ by <a href="https://twitter.com/Chewbacca_w0w" target="blank">@Chewbacca_w0w</a></p>
                    </MDBCol>
                    <MDBCol md="6">
                        <h5 className="title">Links</h5>
                        <ul>
                            <li className="list-unstyled">
                                <a href="https://www.buymeacoffee.com/branislavbuna" target="blank">Buy me a coffee</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="https://twitter.com/Chewbacca_w0w" target="blank">Twitter</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="https://github.com/codeHysteria28" target="blank">GitHub</a>
                            </li>
                            <li className="list-unstyled">
                                <button onClick={toggle} className="licence_btn">
                                    Icons Licence
                                </button>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
                <MDBModal isOpen={modal} toggle={toggle}>
                    <MDBModalHeader className="grey-text" toggle={toggle}>Icons Licences</MDBModalHeader>
                    <MDBModalBody className="grey-text modal_Body">
                        <MDBRow>
                            <MDBCol>
                                <img src={bg} className="imgs_lic mr-3"/>
                                <a href="http://www.freepik.com" target="_blank" className="grey-text text-center">Designed by pch.vector / Freepik</a>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={support} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a href="https://www.freepik.com" target="_blank" title="Freepik" className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={easy} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a target="_blank" href="https://www.freepik.com" title="Freepik" className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <img src={free} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a target="_blank" href="https://www.freepik.com" title="Freepik" className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={app} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a target="_blank" href="https://www.freepik.com" title="Freepik" className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={cashier} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a target="_blank" href="" title="surang" className="grey-text">surang</a> from <a className="grey-text" target="_blank" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={card} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a href="https://www.freepik.com" target="_blank" title="Freepik" className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={dest} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a href="https://www.freepik.com" target="_blank" title="Freepik" className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={device} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a href="https://www.freepik.com" target="_blank" title="Freepik" className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={fashion} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a target="_blank" href="https://www.freepik.com" title="Freepik" className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={gift} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a target="_blank" href="https://www.freepik.com" title="Freepik" className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={groceries} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a target="_blank" href="https://www.freepik.com" title="Freepik"  className="grey-text">Freepik</a> from <a target="_blank"href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={investment} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                Icons made by <a target="_blank" href="" title="iconixar" className="grey-text">iconixar</a> from <a href="https://www.flaticon.com/" target="_blank" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={mh} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a target="_blank" href="https://www.freepik.com" title="Freepik"  className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={money} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a target="_blank" href="https://www.freepik.com" title="Freepik"  className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol>
                                <img src={rocket} className="imgs_lic mr-3"/>
                                <span className="text-center">
                                    Icons made by <a target="_blank" href="https://www.freepik.com" title="Freepik"  className="grey-text">Freepik</a> from <a target="_blank" href="https://www.flaticon.com/" className="grey-text" title="Flaticon">www.flaticon.com</a>
                                </span>
                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" className="login_btn" onClick={toggle}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: <a href="https://www.budgeter.club"> Budgeter Club </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default Sentry.withProfiler(Footer);