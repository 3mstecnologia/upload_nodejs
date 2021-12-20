export default function Home() {
  return (
    <div>
      <main>
        //make a form to upload a file and send it to the server
        <form
          action="http://localhost:3001/upload"
          method="post"
          enctype="multipart/form-data"
        >
          <input type="file" name="file" />
          <input type="submit" value="Upload" />
        </form>
      </main>
    </div>
  );
}
