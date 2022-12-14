import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
type array = {
	arr: string[];
	currRow: number;
	rowkey: number;
	word: string;
	guessArr: string[];
	win: boolean;
	setWin: Dispatch<SetStateAction<boolean>>;
	results: string[][];
	error: string;
};
const Row = ({
	arr,
	currRow,
	rowkey,
	word,
	win,
	setWin,
	results,
	error,
}: array) => {
	// green hex 6BAA64
	// yellow hex CAB458
	// grey hex 787C7E
	const done = results[rowkey].length === 5;
	return (
		<motion.div
			animate={{
				x: rowkey === currRow && error ? [5, -5, 5, -5, 5, -5, 5, 0] : 0,
			}}
			transition={{
				duration: 0.3,
				ease: "easeInOut",
			}}
			className="flex gap-[.35rem]"
		>
			{arr.map((e, ind) => {
				// console.log(res.every((e) => e === "korek") && currRow === i);

				return (
					<motion.div key={ind} className="relative">
						<motion.div
							initial={{ backgroundColor: "rgb(255,255,255)" }}
							animate={{
								scale: e !== "" ? [1, 1.1, 1] : 1,
								scaleY: results[rowkey] ? (done ? [1, -1] : 1) : 1,
								borderWidth: done ? ["2px", "0px"] : "2px",
								borderColor: done
									? "rgba(0,0,0,0)"
									: e !== ""
									? "rgb(191,191,191)"
									: "rgb(228,228,228)",
								backgroundColor:
									currRow - 1 >= rowkey
										? results[rowkey][ind] === "korek"
											? "rgb(107, 170, 100)"
											: results[rowkey][ind] === "sayop_place"
											? "rgb(202, 180, 88)"
											: "rgb(120, 124, 126)"
										: "rgb(255,255,255)",
							}}
							transition={{
								scale: {
									duration: 0.1,
									delay: 0,
								},
								borderWidth: {
									delay: done ? ind * 0.4 : 0,
									duration: 0.09,
									ease: "linear",
									type: "spring",
									damping: 40,
									stiffness: 20,
								},
								borderColor: {
									delay: done ? ind * 0.4 : 0,
									duration: 0,
								},
								delay: ind * 0.4,
								duration: 0.5,
							}}
							className={`w-[3.5rem] h-[3.5rem]  flex justify-center items-center ${
								!done
									? e !== ""
										? "border-[#bfbfbf] border-[1.5px]"
										: "border-[#e4e4e4] border-[1.5px]"
									: ""
							}    relative `}
						></motion.div>
						<motion.p
							className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[2.3rem]  uppercase font-extrabold`}
							animate={{
								color: done ? "rgb(255,255,255)" : "rgba(0,0,0)",
								scaleY: done ? [1, 0.4, 1] : 1,
								translateX: "-50%",
								translateY: "-50%",
							}}
							transition={{
								scaleY: {
									delay: ind * 0.4,
									duration: 0.5,
									ease: "easeInOut",
								},
								color: {
									delay: ind * 0.4,
									duration: 0.3,
									ease: "easeInOut",
								},
							}}
						>
							{e}
						</motion.p>
					</motion.div>
				);
			})}
		</motion.div>
	);
};

export default Row;
