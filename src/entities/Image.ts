import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("images")
export class Image {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "text", nullable: false })
	name: string;

	@Column({ type: "text" })
	description: string;

	@Column({ type: "text", nullable: false })
	picture: string;

	@Column({ type: "text", nullable: false })
	filename: string;
}
