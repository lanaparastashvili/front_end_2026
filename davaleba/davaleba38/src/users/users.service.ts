import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel:Model<User>){}

   async create(createUserDto: CreateUserDto) {
    const exsistingUser = await this.userModel.findOne({email:createUserDto.email})
    if(exsistingUser) throw new BadRequestException()
      const createrUser = await this.userModel.create(createUserDto)
    return createrUser
  }

  findAll() {
    return this.userModel.find()
  }

  async  findOne(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException()
      const findUser = await this.userModel.findById(id)
    if(!findUser) throw new BadRequestException()

    return findUser
  }

  async  update(id: string, updateUserDto: UpdateUserDto) {
    if(!isValidObjectId(id)) throw new BadRequestException()
      const updateUser = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
    if(!updateUser) throw new BadRequestException()
    return updateUser
  }

  async  remove(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException()
      const deletedUser = await this.userModel.findByIdAndDelete(id)
    if(!deletedUser) throw new BadRequestException()
    return deletedUser
  }
}
