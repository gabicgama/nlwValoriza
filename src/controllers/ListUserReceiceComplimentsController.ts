import { Request, Response } from "express";
import { ListUserReceiceComplimentsService } from "../services/ListUserReceiveComplimentsService";

class ListUserReceiceComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const listUserReceiceComplimentsService =
      new ListUserReceiceComplimentsService();
    const compliments = await listUserReceiceComplimentsService.execute(
      user_id
    );
    return response.json(compliments);
  }
}

export { ListUserReceiceComplimentsController };
