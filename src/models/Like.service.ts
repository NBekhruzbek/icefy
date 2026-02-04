import LikeModel from "../schema/Like.model";

class LikeService {
  private readonly likeModel;

  constructor() {
    this.likeModel = new LikeModel();
  }
}

export default LikeService;
