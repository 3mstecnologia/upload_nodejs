export default function Home() {
  return (
    <div>
      <main>
        <form
          action="http://localhost:3001/upload"
          method="post"
          encType="multipart/form-data"
        >
          <input type="file" name="file" />
          <input type="submit" value="Upload" />
        </form>
      </main>
    </div>
  );
}
