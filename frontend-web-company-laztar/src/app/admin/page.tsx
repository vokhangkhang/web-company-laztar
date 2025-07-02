"admin client"
import { useState } from "react"

export default function AdminPage() {
  // const [homeTitle, setHomeTitle] = useState("Tiêu đề ban đầu")

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   try {
  //     const response = await fetch("/api/update-home", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ homeTitle }),
  //     })

  //     const result = await response.json()
  //     console.log("Đã cập nhật thành công:", result)
  //   } catch (error) {
  //     console.error("Lỗi khi lưu nội dung:", error)
  //   }
  // }

  return (   
    <main>
      {/* <form onSubmit={handleSubmit}> */}
      <form style={{margin:"10% 10%"}}>
      <label htmlFor="title">opening_statement:</label>
      <input
        type="text"
        id="title"
       // value={homeTitle}
       // onChange={(e) => setHomeTitle(e.target.value)}
       style={{width:'50%', lineHeight:'200%', background:'#ffffff', color:'#000000'}}
      />
      <button type="submit">
        Lưu
      </button>
      </form>
    </main>     
  );
}