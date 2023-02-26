import {
  Box,
  Button,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  useToast,
  Text,
  Image,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

import React, { useState } from "react";
import Axios from "axios";
const baseApi = process.env.REACT_APP_API_BASE_URL;

export const PaymentProof = ({ id, setDir, minString }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState("");
  const styles = {
    dropContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      height: "175px",
      borderRadius: "10px",
      border: "2px dashed #555",
      color: "#444",
      cursor: "pointer",
    },
  };

  const handleChoose = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (image?.size > 1028576) {
        return toast({
          position: "top",
          title: "File size too large. Maximum 1MB",
          status: "warning",
          isClosable: true,
        });
      }

      if (!image) {
        return toast({
          position: "top",
          title: "Select file",
          status: "warning",
          isClosable: true,
        });
      }

      const data = new FormData();
      data.append("image", image);

      await Axios.post(`${baseApi}/uploadpayment/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "File Uploaded",
        text: `Please Wait For Admin Confirmation`,
        customClass: {
          container: "my-swal",
        },
      });

      setTimeout(() => window.location.reload(), 2500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <Box mb={setDir ? "4" : "0"}>
      <Button onClick={onOpen} bg="#D54B79" w={"100%"}>
        Upload your payment receipt
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay onClick={() => setImage("")} />
        <ModalContent>
          <ModalHeader>Upload your payment receipt</ModalHeader>
          <ModalCloseButton onClick={() => setImage("")} />
          <ModalBody pb={6} textAlign={{ base: "center" }}>
            <form encType="multipart/form-data">
              <label
                htmlFor="image"
                className="drop-container"
                style={styles.dropContainer}
              >
                <input
                  type="file"
                  accept=".png, .jpg, .gif"
                  name="image"
                  id="image"
                  onChange={(e) => handleChoose(e)}
                  hidden={image ? true : false}
                />
                {image ? (
                  <Box hidden={image ? false : true} mt={"2"}>
                    <Image
                      src={URL.createObjectURL(image)}
                      h={"125px"}
                      m={"auto"}
                    />
                    <Text>{image ? minString(image?.name, 33) : ""}</Text>
                  </Box>
                ) : null}
              </label>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUpload}>Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
