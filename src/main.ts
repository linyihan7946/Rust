import init, { greet, Point, calculate_sum } from '../pkg/rust_project';

// TypeScript 版本的循环计算
function calculateSumTS(): number {
    let sum = 0;
    for (let i = 0; i < 100_000_000; i++) {
        sum += i;
    }
    return sum;
}

// 使用 BigInt 的版本
// function calculateSumTSBigInt(): bigint {
//     let sum = BigInt(0);
//     for (let i = 0; i < 100_000_000; i++) {
//         sum += BigInt(i);
//     }
//     return sum;
// }

async function main() {
    // 初始化 WASM 模块
    await init();

    // 调用 greet 函数
    const greeting = greet("World");
    console.log(greeting);

    // 使用 Point 类
    const point = new Point(3, 4);
    const distance = point.distance();
    console.log(`Distance from origin: ${distance}`);

    // 计算 100 亿次累加 (Rust 版本)
    console.log('开始 Rust 版本计算 100 亿次累加...');
    const rustStartTime = performance.now();
    const rustSum = calculate_sum();
    const rustEndTime = performance.now();
    console.log(`Rust 计算结果: ${rustSum}`);
    console.log(`Rust 计算耗时: ${(rustEndTime - rustStartTime).toFixed(2)}ms`);

    // 计算 100 亿次累加 (TypeScript 版本)
    console.log('开始 TypeScript 版本计算 100 亿次累加...');
    const tsStartTime = performance.now();
    const tsSum = calculateSumTS();
    const tsEndTime = performance.now();
    console.log(`TypeScript 计算结果: ${tsSum}`);
    console.log(`TypeScript 计算耗时: ${(tsEndTime - tsStartTime).toFixed(2)}ms`);

    // 计算 100 亿次累加 (TypeScript BigInt 版本)
    // console.log('开始 TypeScript BigInt 版本计算 100 亿次累加...');
    // const tsBigIntStartTime = performance.now();
    // const tsBigIntSum = calculateSumTSBigInt();
    // const tsBigIntEndTime = performance.now();
    // console.log(`TypeScript BigInt 计算结果: ${tsBigIntSum}`);
    // console.log(`TypeScript BigInt 计算耗时: ${(tsBigIntEndTime - tsBigIntStartTime).toFixed(2)}ms`);

    // 在页面上显示结果
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = `
            <h1>Rust WASM Demo</h1>
            <p>${greeting}</p>
            <p>Point distance: ${distance}</p>
            <h2>性能对比</h2>
            <h3>Rust 版本</h3>
            <p>计算结果: ${rustSum}</p>
            <p>计算耗时: ${(rustEndTime - rustStartTime).toFixed(2)}ms</p>
            <h3>TypeScript 版本</h3>
            <p>计算结果: ${tsSum}</p>
            <p>计算耗时: ${(tsEndTime - tsStartTime).toFixed(2)}ms</p>
            <p>性能提升: ${((tsEndTime - tsStartTime) / (rustEndTime - rustStartTime)).toFixed(2)}x</p>
            <p>JavaScript 安全整数范围: ${Number.MAX_SAFE_INTEGER}</p>
        `;
    }
}

main().catch(console.error); 