// 温馨提示文案
const messages = [
    '要相信自己奥', '学会爱自己', '保持微笑呀', '珍惜每一刻', '天冷了，多穿衣服',
    '别熬夜', '好好爱自己', '我想你了', '记得好好吃饭', '记得好好护肤',
    '早点休息', '今天过得开心嘛', '你超棒的', '金榜题名', '每天都要开心',
    '梦想成真', '保持做笑呀', '多喝水', '期待下一次见面', '你起情的',
    '所有烦恼都消失', '记得吃水果', '学会爱自己', '要相信自己奥', '好心情',
    '我想你了', '好好爱自己', '我超你了', '今天过得开心嘛', '记得好好吃饭',
    '天冷了，多穿大服', '要相信自己奥', '记得好好护肤', '早点休息', '保持微笑呀',
    '别熬夜', '学会爱自己', '珍惜每一刻', '你超棒的', '所有烦恼都消失',
    '期待下一次见面', '多喝水', '记得吃水果', '金榜题名', '梦想成真',
    '每天都要开心', '好好爱自己', '我想你了', '天冷了，多穿衣服', '今天过得开心嘛'
];

// 生成心形卡片
function generateHeartCards() {
    const container = document.getElementById('cardsContainer');
    
    // 心形参数方程
    function getHeartPosition(t, scale = 1) {
        const x = scale * 16 * Math.pow(Math.sin(t), 3);
        const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        return { x, y };
    }
    
    // 先生成中心的特殊卡片
    const centerCard = document.createElement('div');
    centerCard.className = 'card center-card';
    centerCard.style.setProperty('--x', '0px');
    centerCard.style.setProperty('--y', '-20px');
    centerCard.style.setProperty('--rotate', '0deg');
    centerCard.style.setProperty('--delay', '0.5s');
    centerCard.innerHTML = `
        <div class="card-header">
            <div class="card-icon">💝</div>
            <div class="card-title">提示</div>
        </div>
        <div class="card-content">每天都要元气满满</div>
    `;
    container.appendChild(centerCard);
    
    // 生成大量密集的心形卡片
    const layers = 15; // 大幅增加层数
    const baseCardsPerLayer = 8; // 每层基础卡片数
    
    for (let layer = 0; layer < layers; layer++) {
        const scale = 3.5 + layer * 1.5; // 调整缩放，让心形更大更完整
        const cardsInLayer = baseCardsPerLayer + layer * 1; // 每层逐渐增加
        
        for (let i = 0; i < cardsInLayer; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            
            const t = (i / cardsInLayer) * Math.PI * 2;
            const pos = getHeartPosition(t, scale);
            
            // 添加较小的随机偏移
            const offsetX = (Math.random() - 0.5) * 25;
            const offsetY = (Math.random() - 0.5) * 25;
            
            card.style.setProperty('--x', `${pos.x + offsetX}px`);
            card.style.setProperty('--y', `${pos.y + offsetY}px`);
            card.style.setProperty('--rotate', `${Math.random() * 15 - 7.5}deg`);
            card.style.setProperty('--delay', `${Math.random() * 3}s`);
            
            const message = messages[Math.floor(Math.random() * messages.length)];
            
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icon">💝</div>
                    <div class="card-title">提示</div>
                </div>
                <div class="card-content">${message}</div>
            `;
            
            container.appendChild(card);
        }
    }
    
    console.log(`已生成 ${container.children.length} 张卡片`);
}

// 打开礼物
function openGift() {
    const dialog = document.getElementById('giftDialog');
    const cardsContainer = document.getElementById('cardsContainer');
    const linkButton = document.querySelector('.link-button');
    
    // 生成卡片
    generateHeartCards();
    
    // 隐藏弹窗
    dialog.classList.add('hidden');
    
    // 播放背景音乐
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.play().catch(e => console.log('音乐播放失败:', e));
    }
    
    // 显示卡片（心形）- 延迟500ms开始
    setTimeout(() => {
        cardsContainer.classList.add('show');
    }, 500);
    
    // 显示链接按钮
    setTimeout(() => {
        linkButton.classList.add('show');
    }, 3000);
    
    // 40秒后散开卡片（给心形展示充足时间）
    setTimeout(() => {
        spreadCards();
    }, 40000);
    
    // 卡片散开后10秒显示3D立方体（总共50秒）
    setTimeout(() => {
        showCubeSection();
    }, 50000);
}

// 切换到3D立方体展示
function showCubeSection() {
    const cardsSection = document.getElementById('cardsSection');
    const cubeSection = document.getElementById('cubeSection');
    
    // 隐藏卡片部分
    cardsSection.classList.remove('active');
    
    // 显示立方体部分
    setTimeout(() => {
        cubeSection.classList.add('active');
    }, 1500); // 等待卡片部分淡出
}

// 注释：已改为卡片散开后10秒显示3D，不再依赖音乐播放时长
// document.addEventListener('DOMContentLoaded', function() {
//     const bgMusic = document.getElementById('bgMusic');
//     if (bgMusic) {
//         bgMusic.addEventListener('ended', function() {
//             // 音乐结束后切换到立方体展示
//             showCubeSection();
//         });
//     }
// });

// 散开卡片到屏幕各处
function spreadCards() {
    const container = document.getElementById('cardsContainer');
    const cards = container.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // 生成随机位置（在视口范围内铺满）
        // 使用更合理的范围，确保卡片在可见区域
        const randomX = (Math.random() - 0.5) * (window.innerWidth - 300);
        const randomY = (Math.random() - 0.5) * (window.innerHeight - 200);
        const randomRotate = Math.random() * 60 - 30; // 减小旋转角度
        
        // 设置散开位置
        card.style.setProperty('--spread-x', `${randomX}px`);
        card.style.setProperty('--spread-y', `${randomY}px`);
        card.style.setProperty('--spread-rotate', `${randomRotate}deg`);
        card.style.setProperty('--spread-delay', `${Math.random() * 2}s`);
    });
    
    // 添加散开类
    container.classList.add('spread');
}

// 添加一些飘雪效果（可选）
function createSnowflakes() {
    const snowflakeCount = 50;
    const body = document.body;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.cssText = `
            position: fixed;
            color: white;
            font-size: ${Math.random() * 10 + 10}px;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            opacity: ${Math.random() * 0.6 + 0.4};
            animation: snowfall ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
            z-index: -1;
        `;
        body.appendChild(snowflake);
    }
    
    // 添加雪花飘落动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes snowfall {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// 页面加载完成后添加飘雪效果
window.addEventListener('load', () => {
    createSnowflakes();
});

// 链接按钮点击事件（可以自定义）
document.querySelector('.link-button').addEventListener('click', () => {
    console.log('链接按钮被点击！');
    // 这里可以添加分享链接或其他功能
});

