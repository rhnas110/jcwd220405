// image
import icon from "../assets/mokomdo-icon2.png";

// chakra
import {
  Box,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Image,
} from "@chakra-ui/react";

// react icon
import { CgChevronRight } from "react-icons/cg";
import { useLocation } from "react-router-dom";

export const BreadCrumbsComp = () => {
  const location = useLocation();
  const url = new URL(window.location.href).pathname;
  const arr = url.split("/");
  let homeURL = "";
  arr.shift();

  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<CgChevronRight color={"white"} />}>
        <BreadcrumbItem>
          <Image h={"1rem"} src={icon} />
        </BreadcrumbItem>
        <BreadcrumbItem>
          {arr.length > 1 ? (homeURL = "/") : (homeURL = "/")}
          <BreadcrumbLink href={homeURL} color={"white"}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {arr.length > 1
          ? arr.map((path, index) => {
              if (location.pathname.includes("/product")) {
                return 0;
              }
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink href={`/${path}`} color={"white"}>
                    {path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })
          : void 0}
      </Breadcrumb>
    </Box>
  );
};
