import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator"
export class CreateUserDto {


    @IsString()
    @Length(2,20)
    @IsNotEmpty()
    fullName!:string

    @IsString()
    @Length(2,20)
    @IsEmail()
    @IsNotEmpty()
    email!:string

    @IsString()
    @Length(2,20)
    @IsNotEmpty()
    password!:string

}
