import express, { Express } from "express"
import routes from "./infra/route/index"
import cors from "cors"

class App {
  private app: Express

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors({
      origin: "http://localhost:5173"
    }))
    this.app.use("/api", routes)
    this.start()
  }

  private start() {
    const port = process.env.APP_PORT || 3000
    this.app.listen(port, () => {
      console.log(`App running on port ${port} 🚀`)
    })
  }
}

export default new App()

