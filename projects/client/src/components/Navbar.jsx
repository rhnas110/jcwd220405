// main
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// logo
import icon from "../assets/mokomdo-icon2.png";
import mokomdo from "../assets/mokomdo2.png";
import mokomdo2 from "../assets/mokomdo-simplified2.png";

// chakra
import {
  Box,
  Flex,
  Link,
  IconButton,
  Image,
  Input,
  Grid,
  GridItem,
  Center,
  Container,
  useMediaQuery,
  useToast,
  Tooltip,
} from "@chakra-ui/react";

// icons
import { BiSearchAlt } from "react-icons/bi";
import { CgHeart } from "react-icons/cg";

// comp
import { DrawerCompUser } from "./DrawerUser";
import { RegisterModal } from "../components/Authentications/RegisterModal";
import { LoginModal } from "../components/Authentications/LoginModal";
import { CartButton } from "./Button/CartButton";

//redux
import { useSelector } from "react-redux";
import { ChecKVerify } from "./ChecKVerify";

import moment from "moment";

export const NavbarComp = ({
  setPage,
  searchquery,
  setSearchParams,
  setPmax,
  setPmin,
}) => {
  const { name, is_verified } = useSelector((state) => state.userSlice.value);

  const [isMobile] = useMediaQuery("(max-width: 1007px)");
  const navigate = useNavigate();
  const toast = useToast();
  const [valuesearch, setValueSearch] = useState("");
  const [enter, setEnter] = useState(0);
  const [escape, setEspace] = useState(false);
  const location = useLocation();

  function handleSearch() {
    if (location.pathname === "/product") {
      setPage(1);
      setPmax(null);
      setPmin(null);
      setSearchParams(`search_query=${valuesearch}`);
    }
  }

  function soon() {
    return toast({
      position: "top",
      title: `Coming soon...`,
      status: "info",
      duration: 1500,
      isClosable: true,
    });
  }

  function checkEscape() {
    const expireDate = moment().add(15, "minutes").toDate();
    document.cookie = `escape=true; expires=${expireDate}; path=/; SameSite=None; Secure`;
    getCookie("escape");
  }

  const getCookie = useCallback(
    (cname) => {
      if (!name) {
        return 0;
      }
      if (document.cookie.length !== 0) {
        var array = document.cookie.split("=");
        setEspace(array[1]);
      } else {
        document.cookie =
          cname +
          "=; expires = Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";
      }
    },
    [name]
  );

  useEffect(() => {
    getCookie("escape");
  }, [getCookie]);

  return (
    <>
      {is_verified || (is_verified === 0 && name) ? (
        <Box
          color={"white"}
          borderBottom={"1px"}
          hidden={is_verified ? true : !is_verified && escape ? true : false}
        >
          <ChecKVerify checkEscape={checkEscape} navigate={navigate} />
        </Box>
      ) : null}
      <Box px={{ base: 4, md: "28" }} py={{ base: 1, md: 4 }}>
        <Container>
          <Center>
            <Grid
              h={{ base: "45px" }}
              alignItems={"center"}
              templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }}
              gap={{ base: 3, md: 3, lg: 5 }}
            >
              <GridItem colSpan={{ base: 1 }} w={{ base: "50px", md: "200px" }}>
                <Center onClick={() => navigate("/")} cursor={"pointer"}>
                  <Link
                    as={Image}
                    href={"/"}
                    src={icon}
                    w={"auto"}
                    h={8}
                    display={{ md: "none" }}
                    onClick={() => navigate("/")}
                  />
                  <Image
                    to={"/"}
                    src={mokomdo2}
                    w={"auto"}
                    h={9}
                    display={{ base: "none", md: "block", lg: "none" }}
                    onClick={() => navigate("/")}
                  />
                  <Image
                    to={"/"}
                    src={mokomdo}
                    w={"auto"}
                    h={10}
                    display={{ base: "none", md: "none", lg: "block" }}
                    onClick={() => navigate("/")}
                  />
                </Center>
              </GridItem>
              <GridItem colSpan={{ base: 1 }}>
                <Flex>
                  <Box
                    border={"1px solid white"}
                    transform={"skew(-20deg)"}
                    p={{ base: "3px" }}
                  >
                    <Input
                      h={{ md: "30px" }}
                      w={{ base: "200px", md: "300px", lg: "80vh" }}
                      borderRadius={0}
                      style={{ border: "none", outline: "none" }}
                      transform={"skew(20deg)"}
                      color={"white"}
                      placeholder="Search"
                      _placeholder={{
                        color: "grey",
                        fontSize: { base: "14px", md: "20px" },
                      }}
                      _focusVisible={{
                        outline: "none",
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (!valuesearch) {
                            if (enter === 2) {
                              return setTimeout(
                                () => window.location.reload(),
                                500
                              );
                            }
                            toast({
                              position: "top",
                              title: `Find Something?`,
                              variant: "subtle",
                              duration: 1500,
                              isClosable: true,
                            });
                            return setEnter(enter + 1);
                          }
                          navigate(`/product?search_query=${e.target.value}`);
                          if (location.pathname === "/product") {
                            setPage(1);
                            setPmax(null);
                            setPmin(null);
                            setSearchParams(`search_query=${e.target.value}`);
                          }
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        setValueSearch(e.target.value);
                      }}
                      defaultValue={searchquery}
                    />
                  </Box>
                  <Box
                    border={"1px solid white"}
                    paddingTop={{ base: "1px", md: "4px" }}
                    transform={"skew(-20deg)"}
                    bg={"#D54B79"}
                    transition={"0.5s"}
                    _hover={{ bg: "#C146ED" }}
                  >
                    <Tooltip label="Search" hasArrow>
                      <IconButton
                        icon={<BiSearchAlt />}
                        h={{ base: "10px", md: "40x" }}
                        minW={{ base: "30px", md: "40px" }}
                        fontSize={{ md: "2xl" }}
                        borderRadius={0}
                        transform={"skew(20deg)"}
                        bg="none"
                        color={"black"}
                        _hover={{
                          bg: "none",
                        }}
                        _active={{
                          bg: "none",
                          color: "white",
                        }}
                        onClick={() => {
                          navigate(`/product?search_query=${valuesearch}`);
                          handleSearch();
                        }}
                        disabled={valuesearch ? false : true}
                      />
                    </Tooltip>
                  </Box>
                </Flex>
              </GridItem>
              <GridItem
                display={{ base: "none", md: "block" }}
                w={{ base: "50px", md: "150px" }}
              >
                <Flex>
                  <CartButton />
                  <IconButton
                    icon={<CgHeart />}
                    fontSize={"35px"}
                    href={"#"}
                    bg={"none"}
                    borderRadius={0}
                    borderRight={"1px solid white"}
                    color={"#D54B79"}
                    width={70}
                    height={30}
                    _hover={{
                      bg: "none",
                      color: "#C146ED",
                    }}
                    _active={{ color: "white" }}
                    onClick={() => soon()}
                  />
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 1 }} w={{ base: "50px", lg: "200px" }}>
                <Center>
                  {name || isMobile ? (
                    <DrawerCompUser />
                  ) : (
                    <Flex gap={4} display={{ base: "none", lg: "inline-flex" }}>
                      <LoginModal />
                      <RegisterModal />
                    </Flex>
                  )}
                </Center>
              </GridItem>
            </Grid>
          </Center>
        </Container>
      </Box>
    </>
  );
};
