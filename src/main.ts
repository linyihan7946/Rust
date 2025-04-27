import init, { greet, Point } from 'rust_project';

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

    // 在页面上显示结果
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = `
            <h1>Rust WASM Demo</h1>
            <p>${greeting}</p>
            <p>Point distance: ${distance}</p>
        `;
    }
}

main().catch(console.error); 