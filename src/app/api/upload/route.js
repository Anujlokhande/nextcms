import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) return new Response("No file", { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadFromBuffer = (buffer) =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "my_uploads" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

  try {
    const uploaded = await uploadFromBuffer(buffer);
    return new Response(JSON.stringify({ url: uploaded.secure_url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
