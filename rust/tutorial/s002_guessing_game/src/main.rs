extern crate rand;

use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main(){
	let secret_number = rand::thread_rng().gen_range(1, 101);
	println!("猜数字");
	loop {
		println!("请输入你猜的数字.");
		let mut guess = String::new();

		io::stdin().read_line(&mut guess)
			.expect("读取行失败");

		let guess: u32 = guess.trim().parse()
			.expect("Please type a number!");

		println!("你猜的是: {}", guess);
		match guess.cmp(&secret_number) {
			Ordering::Less => println!("太小!"),
			Ordering::Greater => println!("太大!"),
			Ordering::Equal => {
				println!("猜对了!");
				break;
			}
		}
	}
}