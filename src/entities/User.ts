import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", nullable: false })
	name: string;

	@Column({ type: "text", nullable: false, unique: true})
	email: string;

	@Column({ type: "text", nullable: false })
	password: string; // max length = 72
}
