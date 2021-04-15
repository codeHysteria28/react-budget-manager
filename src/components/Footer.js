import React from 'react';
import * as Sentry from "@sentry/react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './Footer.css';

const Footer = () => {
    return(
        <MDBFooter color="default-color" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                <MDBCol md="6">
                    <h5 className="title">Budgeter Club</h5>
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
                            <a href="" target="blank">Icons Licence</a>
                        </li>
                    </ul>
                </MDBCol>
                </MDBRow>
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