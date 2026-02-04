import Errors, { HttpCode, Message } from "../libs/Errors";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";

class ViewService {
  private readonly viewModel;

  constructor() {
    this.viewModel = ViewModel;
  }

  public async checkViewExistence(input: ViewInput): Promise<View> {
    const result = await this.viewModel
      .findOne({
        memberId: input.memberId,
        viewRefId: input.viewRefId,
      })
      .exec();

    return result?.toObject() as View;
  }

  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      return (await this.viewModel.create(input)).toObject();
    } catch (err) {
      console.log("ERROR, model:insertMemberView:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ViewService;
