import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    // MySQL Relations Don't Support Arrays :/

    // @OneToMany(type => Product, product => product.order)
    // productsList: Product[];

    @Column()
    productsList: string;

    @Column()
    totalPrice: number;
}