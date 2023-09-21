import { UploadDropzone } from "../src/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { Flex, useToast, } from "@chakra-ui/react";
import copy from "clipboard-copy";

export default function Home() {
  const toast = useToast();

  const handleClientUploadComplete = (res: any) => {
    const fileUrl = res[0].fileUrl;
    copy(fileUrl);
    
    toast({
      title: "Carga Exitosa",
      description: "Se copio la URL de la Imagen, pegue donde quieras utilizarla",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleUploadError = (error: any) => {
    toast({
      title: "Error",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex
      margin="auto"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Flex
        bg="rgba(255, 255, 255, 0.8)"
        rounded="5px"
        backdropFilter="blur(2px)"
        border="1px solid rgba(255, 255, 255, 0.3)"
        __css={{
          "WebkitBackdropFilter": "blur(3px)"
        }}
        p="7px 15px 15px 15px"
      >
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={handleClientUploadComplete}
          onUploadError={handleUploadError}
        />
      </Flex>
    </Flex>
  );
}
