DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

use bamazon_db;

create table products(
	item_id integer(10) auto_increment not null, 
	product_name varchar(30) not null, 
	department_name varchar(30), 
	price integer(10) not null, 
	stock_quantity integer(10) not null,
	primary key (item_id)
);

use bamazon_db;

insert into products (product_name, department_name, price, stock_quantity)
values ("Chair", "Furniture", 75, 30);
insert into products (product_name, department_name, price, stock_quantity)
values ("Table", "Furniture", 300, 10);
insert into products (product_name, department_name, price, stock_quantity)
values ("Desk", "Furniture", 200, 15);
insert into products (product_name, department_name, price, stock_quantity)
values ("Bed", "Furniture", 550, 10);
insert into products (product_name, department_name, price, stock_quantity)
values ("Lamp", "Furniture", 125, 30);
insert into products (product_name, department_name, price, stock_quantity)
values ("Television", "Electronics", 750, 10);
insert into products (product_name, department_name, price, stock_quantity)
values ("Stereo", "Electronics", 350, 30);
insert into products (product_name, department_name, price, stock_quantity)
values ("Game Console", "Electronics", 300, 20);
insert into products (product_name, department_name, price, stock_quantity)
values ("Turntable", "Electronics", 250, 15);
insert into products (product_name, department_name, price, stock_quantity)
values ("Speakers", "Electronics", 150, 20);

select * from products

