import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  /** SPA */

  /** BSSR */
  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        memberType: MemberType.ADMIN,
      })
      .exec();
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      console.log(err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default MemberService;
