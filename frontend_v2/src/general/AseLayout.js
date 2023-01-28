import React from "react";
import { Container } from "react-bootstrap";
import AseNavbar from "./Navbar";


const AseLayout = ({ children }) => {
    return (
    <React.Fragment>
        <AseNavbar />
        <Container>
            {children}
        </Container>
    </React.Fragment>
    );
};
export default AseLayout;