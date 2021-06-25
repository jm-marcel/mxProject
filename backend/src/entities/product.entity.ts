import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    category: string;

    // MySQL Relations Don't Support Arrays :/

    // @ManyToOne(type => Order, order => order.productsList)
    // order: Order;
}