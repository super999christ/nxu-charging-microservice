import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { User } from "./user.entity";
import bcrypt from "bcryptjs";
import Environment from "../../config/env";

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  public async saveUser(userDetails: DeepPartial<User>) {
    const hashedPassword = await bcrypt.hash(
      userDetails.password!,
      Environment.HASH_SALT
    );
    userDetails.password = hashedPassword;
    return this.userRepository.save(userDetails);
  }

  public async getUser(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }

  public async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      return null;
    }
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  public async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user || null;
  }

  public async getUserByPhone(phoneNumber: string) {
    const user = await this.userRepository.findOneBy({ phoneNumber });
    return user || null;
  }

  public async resetPassword(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password!, Environment.HASH_SALT);
    const user = await this.userRepository.update(
      { email },
      { password: hashedPassword }
    );
    return user;
  }

  public async updateUserById(userId: string, userDetails: DeepPartial<User>) {
    const userInfo = { ...userDetails };
    if (userInfo.password) {
      userInfo.password = await bcrypt.hash(userInfo.password, Environment.HASH_SALT);
    }
    const user = await this.userRepository.update(
      { id: userId },
      userInfo
    );
    return user;
  }
}
