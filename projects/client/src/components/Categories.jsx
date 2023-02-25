import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { Box, Center, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const baseApi = process.env.REACT_APP_API_BASE_URL;

export const Categories = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const getCategory = useCallback(async () => {
    try {
      const response = await (await axios.get(`${baseApi}/category`)).data;
      setCategory(response.result);
    } catch (error) {}
  }, []);

  function toDetail(item) {
    navigate(`product?search_query=${item.category}`);
  }

  useEffect(() => {
    getCategory();
  }, [getCategory]);
  return (
    <Box maxW={"full"}>
      {category?.length ? (
        <Box maxW={"90%"} m={"auto"}>
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {category?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Box
                    onClick={() => toDetail(item)}
                    w="222px"
                    h="222px"
                    m={"8px auto 8px"}
                    borderRadius={"md"}
                    boxShadow={"0 0 4px 1px rgba(255,255,255,.59)"}
                    cursor={"pointer"}
                    _hover={{ color: "rgb(213, 75, 121)" }}
                    position={"relative"}
                  >
                    <Box
                      // h="185px"
                      w="full"
                      borderRadius="md"
                      overflow="hidden"
                    >
                      <Image
                        src={`${process.env.REACT_APP_SERVER}${
                          item?.image
                            ? item?.image
                            : `/public/category/default-category.png`
                        }`}
                        alt={item?.category}
                        width="full"
                        height="222px"
                        bgGradient={
                          (index + 1) % 2 === 0
                            ? "linear(to-r, rgba(44, 22, 88, 0.69) 15%, #262A6E 100%)"
                            : "linear(to-l, rgba(44, 22, 88, 0.69) 15%, #262A6E 100%)"
                        }
                      />
                    </Box>
                    <Center>
                      <Box
                        px="4px"
                        position={"absolute"}
                        textAlign={"center"}
                        bottom={"0"}
                      >
                        <Box p={2} overflow={"hidden"}>
                          <Text fontWeight={"semibold"}>{item?.category}</Text>
                        </Box>
                      </Box>
                    </Center>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      ) : (
        <Stack w={"85vw"}>
          <Skeleton height="150px" />
        </Stack>
      )}
    </Box>
  );
};
