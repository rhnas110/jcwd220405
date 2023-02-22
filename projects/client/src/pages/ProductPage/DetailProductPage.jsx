import { Container } from "@chakra-ui/react";

import { NavbarComp } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { ProductDetail } from "../../components/Product/ProductDetail";

export const DetailProductPage = () => {
  return (
    <>
      <NavbarComp />
      <Container maxW={"full"} pt={"8"}>
        <ProductDetail />
      </Container>
      <Footer />
    </>
  );
};
