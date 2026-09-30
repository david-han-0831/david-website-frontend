// 홈 히어로 뒤편 작업 화면의 마크업 (코드에 고정된 문자열, 사용자 입력 없음)
// 이름·숫자는 분위기용 가상 데이터다. 공개 가능한 실제 화면이 생기면 교체한다.
export type ScreenKey = 'trade' | 'pos' | 'shot' | 'tele' | 'exam' | 'erp'

export const SCREENS: Record<ScreenKey, { w: number; h: number; html: string }> = {
  trade: { w: 1200, h: 750, html: `
<div class="scr trade">
  <div class="side">
    <div class="logo"><i></i>Tidemark</div>
    <div class="nav"><a class="on"><i></i>Live lots</a><a><i></i>My bids</a><a><i></i>Orders</a><a><i></i>Shipments</a><a><i></i>Escrow</a><a><i></i>Reports</a></div>
  </div>
  <main>
    <h3>Live lots</h3><div class="sub">124 lots from 18 suppliers, FOB Busan</div>
    <div class="filters"><span class="on">All species</span><span>Frozen</span><span>Fresh</span><span>Grade A+</span><span>Ships this week</span></div>
    <table>
      <tr><th>Species</th><th>Origin</th><th>Grade</th><th>Price / kg</th><th>24h</th></tr>
      <tr><td><div class="sp"><i style="background:linear-gradient(135deg,#ff9a76,#f0643c)"></i>Atlantic salmon</div></td><td>Norway</td><td><span class="grade">A+</span></td><td class="num">$12.40</td><td class="up num">+2.1%</td></tr>
      <tr><td><div class="sp"><i style="background:linear-gradient(135deg,#ff7e8a,#c9304a)"></i>Bluefin tuna</div></td><td>Japan</td><td><span class="grade">A</span></td><td class="num">$38.90</td><td class="up num">+0.8%</td></tr>
      <tr><td><div class="sp"><i style="background:linear-gradient(135deg,#ffd6a0,#e3a15c)"></i>King crab</div></td><td>Russia</td><td><span class="grade">A+</span></td><td class="num">$54.20</td><td class="down num">−1.3%</td></tr>
      <tr><td><div class="sp"><i style="background:linear-gradient(135deg,#f6c2d0,#e07f99)"></i>Shrimp 16/20</div></td><td>Vietnam</td><td><span class="grade">B+</span></td><td class="num">$9.80</td><td class="up num">+3.4%</td></tr>
      <tr><td><div class="sp"><i style="background:linear-gradient(135deg,#dfe7f0,#9fb2c8)"></i>Squid tube</div></td><td>Peru</td><td><span class="grade">A</span></td><td class="num">$6.15</td><td class="up num">+1.2%</td></tr>
      <tr><td><div class="sp"><i style="background:linear-gradient(135deg,#e8e0d0,#b9a37e)"></i>Pacific cod</div></td><td>USA</td><td><span class="grade">A</span></td><td class="num">$7.30</td><td class="down num">−0.4%</td></tr>
    </table>
  </main>
  <aside>
    <h4>Salmon price index</h4><div class="big num">$12.40</div><div class="delta">+8.2% this month</div>
    <svg width="278" height="120" viewBox="0 0 278 120"><defs><linearGradient id="ws-tg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1fb5a8" stop-opacity=".25"/><stop offset="1" stop-color="#1fb5a8" stop-opacity="0"/></linearGradient></defs>
      <path d="M0 92 L30 86 L60 90 L90 72 L120 76 L150 58 L180 62 L210 44 L240 40 L278 22 L278 120 L0 120 Z" fill="url(#ws-tg)"/>
      <path d="M0 92 L30 86 L60 90 L90 72 L120 76 L150 58 L180 62 L210 44 L240 40 L278 22" fill="none" stroke="#0e7c86" stroke-width="3" stroke-linejoin="round"/></svg>
    <h4 style="margin-bottom:10px">Your open bids</h4>
    <div class="bid"><span><small>Salmon, 2,000 kg</small>$12.10 / kg</span><b class="num">Leading</b></div>
    <div class="bid"><span><small>Shrimp, 800 kg</small>$9.60 / kg</span><b class="num" style="color:#c77700">Outbid</b></div>
    <div class="cta">Place a bid</div>
  </aside>
</div>` },

  pos: { w: 1200, h: 780, html: `
<div class="scr pos">
  <main>
    <div class="top"><b>Harbor Coffee</b><span>Table 4, 2 guests</span></div>
    <div class="cats"><span class="on">Coffee</span><span>Tea</span><span>Bakery</span><span>Brunch</span><span>Retail</span></div>
    <div class="grid">
      ${[['Espresso','3.20','#f3e7dc','#8a5a3b'],['Flat white','4.50','#f1ece4','#7a5230'],['Latte','4.80','#f5ede3','#9c6a44'],['Cold brew','5.00','#e6ecf5','#3d5a80'],['Matcha latte','5.20','#e8f2e1','#4f7a3a'],['Croissant','3.80','#fbeed7','#b7791f'],['Bagel','4.20','#f7e9df','#a0613c'],['Banana bread','4.00','#fbf0d9','#a57a1c']].map(([n,p,bg,fg])=>`<div class="item"><i style="background:${bg};color:${fg}">${n[0]}</i><div><b>${n}</b><br><span>$${p}</span></div></div>`).join('')}
    </div>
  </main>
  <aside>
    <h4>Order #1042 <small>Dine in</small></h4>
    <div style="margin-top:14px">
      <div class="line"><span>Flat white <em>×2</em></span><span class="num">$9.00</span></div>
      <div class="line"><span>Croissant</span><span class="num">$3.80</span></div>
      <div class="line"><span>Banana bread</span><span class="num">$4.00</span></div>
      <div class="line"><span>Cold brew <em>oat</em></span><span class="num">$5.50</span></div>
    </div>
    <div class="sum"><div><span>Subtotal</span><span class="num">$22.30</span></div><div><span>Tax</span><span class="num">$2.23</span></div><div class="tot"><span>Total</span><span class="num">$24.53</span></div></div>
    <div class="charge">Charge $24.53</div>
  </aside>
</div>` },

  shot: { w: 1200, h: 700, html: `
<div class="scr shot">
  <div class="stage">
    <div class="court"></div><div class="hoop"></div>
    <svg class="pose" viewBox="0 0 818 656">
      <path d="M612 210 Q520 60 330 250" fill="none" stroke="#ffb454" stroke-width="4" stroke-dasharray="12 10"/>
      <g stroke="#7b93ff" stroke-width="7" stroke-linecap="round" fill="none">
        <path d="M330 250 L350 300 L372 356 M350 300 L300 330 L270 290 M372 356 L372 470 M372 470 L340 560 L330 630 M372 470 L405 560 L420 630"/>
      </g>
      <g fill="#fff">${[[330,250],[350,300],[372,356],[300,330],[270,290],[372,470],[340,560],[330,630],[405,560],[420,630]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8"/>`).join('')}</g>
      <circle cx="352" cy="226" r="26" fill="none" stroke="#3ddc97" stroke-width="3"/>
      <rect x="240" y="190" width="220" height="460" rx="8" fill="none" stroke="rgba(61,220,151,.7)" stroke-width="2"/>
    </svg>
    <div class="rec"><i></i>Live, 15 fps</div>
    <div class="tl">${Array.from({length:40},(_,i)=>`<i class="${i<27?'on':''}"></i>`).join('')}</div>
  </div>
  <aside>
    <h4>Shot analysis</h4><div class="ok">Release 52°, arc on target</div>
    <div class="ring">
      <svg width="92" height="92" viewBox="0 0 92 92"><circle cx="46" cy="46" r="38" fill="none" stroke="#1d212b" stroke-width="9"/><circle cx="46" cy="46" r="38" fill="none" stroke="#5b78ff" stroke-width="9" stroke-dasharray="${2*Math.PI*38*0.86} 999" stroke-linecap="round" transform="rotate(-90 46 46)"/></svg>
      <div><b>86</b><small>Form score, up 6 from last week</small></div>
    </div>
    ${[['Elbow alignment',91],['Balance',72],['Release timing',88],['Follow-through',80]].map(([t,v])=>`<div class="m"><div><span>${t}</span><b>${v}</b></div><span><i style="width:${v}%"></i></span></div>`).join('')}
    <div class="tip">Keep the guide hand off the ball a frame earlier. Your release drifts left on tired shots.</div>
  </aside>
</div>` },

  tele: { w: 390, h: 820, html: `
<div class="scr tele">
  <div class="hi">Good morning, Minji</div><h3>Your care</h3>
  <div class="doc">
    <div class="row"><span class="av"></span><div><b>Dr. Kim Seoyeon</b><small>Dermatology, video visit</small></div></div>
    <div class="when"><span style="background:none;color:#fff;padding:0;font-weight:500">Today, 10:30</span><span>Join call</span></div>
  </div>
  <div class="tiles">
    <div class="tile"><small>Heart rate</small><b class="num">72 bpm</b><svg width="130" height="34"><path d="M0 20 L20 20 L28 6 L36 30 L44 18 L64 18 L72 10 L80 26 L90 18 L130 18" fill="none" stroke="#e0445a" stroke-width="2.5"/></svg></div>
    <div class="tile"><small>Sleep</small><b class="num">7h 20m</b><svg width="130" height="34">${[14,22,18,28,24,30,20].map((h,i)=>`<rect x="${i*19}" y="${34-h}" width="12" height="${h}" rx="3" fill="#5a3df0" opacity="${0.35+i*0.09}"/>`).join('')}</svg></div>
  </div>
  <div class="list">
    <div><span><i style="background:#eef2ff"></i>Prescriptions</span><em>2 active</em></div>
    <div><span><i style="background:#e9f8f1"></i>Lab results</span><em>New</em></div>
    <div><span><i style="background:#fff5e6"></i>Payments</span><em>$0 due</em></div>
  </div>
</div>` },

  exam: { w: 390, h: 820, html: `
<div class="scr exam">
  <div class="bar"><i></i></div>
  <div class="meta"><span>Question 12 of 40</span><b>18:42 left</b></div>
  <h3>Which structure gives O(1) average lookup by key?</h3>
  <code>cache.get("user:42")<br>// returns in constant time</code>
  <div class="opt"><i></i>Linked list</div>
  <div class="opt on"><i></i>Hash map</div>
  <div class="opt"><i></i>Binary search tree</div>
  <div class="opt"><i></i>Stack</div>
  <div class="next">Next question</div>
</div>` },

  erp: { w: 1200, h: 700, html: `
<div class="scr erp">
  <div class="top"><b>Payroll, October</b><span>Run payroll</span></div>
  <div class="kpis">
    <div class="kpi"><small>Employees</small><b class="num">142</b></div>
    <div class="kpi"><small>Gross pay</small><b class="num">$486,200</b></div>
    <div class="kpi"><small>Processing time</small><b class="num">3 h</b></div>
    <div class="kpi"><small>Issues</small><b class="num">2</b></div>
  </div>
  <table>
    <tr><th>Name</th><th>Team</th><th>Hours</th><th>Net pay</th><th>Status</th></tr>
    ${[['Park Jiwoo','Design','168','$4,210'],['Lee Hana','Engineering','172','$5,080'],['Choi Min','Sales','160','$3,960'],['Kang Yuna','Operations','176','$3,720'],['Jung Hoon','Engineering','168','$5,340'],['Yoon Sera','Finance','164','$4,480']].map((r,i)=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td class="num">${r[2]}</td><td class="num">${r[3]}</td><td><span class="st ${i==3?'w':''}">${i==3?'Review':'Ready'}</span></td></tr>`).join('')}
  </table>
</div>` },
}

