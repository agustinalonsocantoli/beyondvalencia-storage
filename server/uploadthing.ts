import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import clipboard from "clipboardy";
import type { NextApiRequest, NextApiResponse } from "next";

const f = createUploadthing();

const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "fakeId" }); // Función de autenticación simulada

// FileRouter para tu aplicación, puede contener múltiples FileRoutes
export const ourFileRouter = {
  // Define tantas FileRoutes como desees, cada una con un routeSlug único
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Establece permisos y tipos de archivos para esta FileRoute
    .middleware(async ({ req, res }) => {
      // Este código se ejecuta en tu servidor antes de la subida
      const user = await auth(req, res);

      // Si lanzas un error, el usuario no podrá subir
      if (!user) throw new Error("Unauthorized");

      // Cualquier cosa que se devuelva aquí es accesible en onUploadComplete como `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(({ metadata, file }) => {
      // Este código se EJECUTA EN TU SERVIDOR después de la subida
      // console.log("Subida completa para el usuario:", metadata.userId);
      // console.log("URL del archivo:", file.url);
      // var textToCopy = "![](" + file.url + ")";
      // try {
      //   clipboard.write(textToCopy);
      //   console.log("Texto copiado al portapapeles");
      // } catch (error) {
      //   console.error("Error al copiar al portapapeles:", error);
      // }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
