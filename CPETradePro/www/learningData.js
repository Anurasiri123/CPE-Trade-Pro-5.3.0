/** Learning Class curriculum — EN + SI. Other langs fall back to EN. */
window.CPE_LEARN = {
  en: {
    intro: 'Practice with Paper / DEMO first. Study candles, charts, BB/RSI/Fib, money, psychology — then Signals (what BUY/SELL/HOLD means + what to do) and Forex signals. Live needs the correct platform API key (Withdrawals OFF).',
    candles: [
      { shape: 'doji', name: 'Doji', color: '#94a3b8', bias: 'Neutral / wait', tip: 'Open ≈ close — cross or thin body. Market indecision after a move.', also: 'Also teaches: do not FOMO. Wait next candle. Near BB extreme + Doji = squeeze of opinions; check RSI slope before guessing direction.' },
      { shape: 'hammer', name: 'Hammer', color: '#22c55e', bias: 'BUY bias', tip: 'Small body on top, long lower wick (≈2× body) after a drop — buyers rejected lower prices.', also: 'Also: place practice SL under the wick low. Best with lower BB + RSI rising from oversold. Psychology: patience for the wick to finish — don’t buy mid-wick.' },
      { shape: 'invhammer', name: 'Inverted Hammer', color: '#22c55e', bias: 'BUY (weak)', tip: 'Long upper wick at a bottom. Buyers probed high but closed near open — needs next green confirm.', also: 'Also: weaker than Hammer alone. Use as alert, not entry. Fib 61.8 bounce + Inverted Hammer = study zone only until confirm candle.' },
      { shape: 'shooting', name: 'Shooting Star', color: '#ef4444', bias: 'SELL bias', tip: 'Small body bottom, long upper wick after a rise — sellers rejected highs.', also: 'Also: SL above wick high. Stronger near upper BB / Fib extension / RSI overbought. Teaches: moon candles can fail — don’t chase the last green.' },
      { shape: 'hanging', name: 'Hanging Man', color: '#f59e0b', bias: 'SELL caution', tip: 'Looks like Hammer but appears after a rise — possible top exhaustion.', also: 'Also: context is everything (same shape ≠ same trade). Journal location: top vs bottom. Psychology: don’t reverse just because shape matched — confirm with next candle + RSI.' },
      { shape: 'engulf_bull', name: 'Bullish Engulfing', color: '#22c55e', bias: 'BUY', tip: 'Green body fully covers prior red body — buyers took control in one bar.', also: 'Also: stronger at support / lower BB / Fib 50–61.8. Size from engulfing low as SL. Money tip: wide engulfing body → wider SL → smaller size.' },
      { shape: 'engulf_bear', name: 'Bearish Engulfing', color: '#ef4444', bias: 'SELL', tip: 'Red body fully covers prior green — sellers dominated.', also: 'Also: caution on open longs. Near upper BB + RSI>70 = high study quality. Teaches risk: if already long, partial TP / trail instead of hope.' },
      { shape: 'morning', name: 'Morning Star', color: '#22c55e', bias: 'BUY', tip: '3 candles: big red → small star → big green. Bottom reversal story.', also: 'Also: multi-candle patience. Enter after 3rd closes; SL under star low. Combines well with BB lower + bullish RSI divergence.' },
      { shape: 'evening', name: 'Evening Star', color: '#ef4444', bias: 'SELL', tip: '3 candles: big green → small star → big red. Top reversal story.', also: 'Also: don’t short the middle star alone. Wait 3rd close. Upper BB / Fib extension confluence. Psychology: ignore FOMO of the first green run.' },
      { shape: 'maru_bull', name: 'Bull Marubozu', color: '#22c55e', bias: 'Strong BUY pressure', tip: 'Long green body, almost no wicks — buyers controlled open→close.', also: 'Also: trend continuation clue, not always a bottom buy. Walk-the-band possible. Risk: chasing late Marubozu without pullback to BB mid / Fib.' },
      { shape: 'maru_bear', name: 'Bear Marubozu', color: '#ef4444', bias: 'Strong SELL pressure', tip: 'Long red body, almost no wicks — sellers in control.', also: 'Also: don’t catch falling knives. Wait BB/Fib bounce + Hammer later. Teaches: strong pressure = smaller size or stand aside.' },
      { shape: 'spin', name: 'Spinning Top', color: '#94a3b8', bias: 'Indecision', tip: 'Small body, upper + lower wicks — both sides fought, nobody won clearly.', also: 'Also: inside BB squeeze often. Pause trading; wait break + direction candle. Psychology lesson: market can “do nothing” — flat is a valid choice.' },
      { shape: 'pierce', name: 'Piercing Line', color: '#22c55e', bias: 'BUY', tip: 'Red then green that opens lower but closes above midpoint of prior red.', also: 'Also: softer than Engulfing. Confirm with RSI turn. Good Paper drill for partial strength reading — not all greens are equal.' },
      { shape: 'darkcloud', name: 'Dark Cloud Cover', color: '#ef4444', bias: 'SELL', tip: 'Green then red that opens higher but closes below midpoint of prior green.', also: 'Also: early warning before full Bear Engulfing. Trail longs / take TP1. Teaches scaling out before a full reversal print.' },
      { shape: 'soldiers', name: 'Three White Soldiers', color: '#22c55e', bias: 'BUY trend', tip: 'Three rising greens with higher closes — steady buying.', also: 'Also: strong uptrend cue; pullbacks to Fib 38–50 or BB mid are practice adds. Overconfidence risk after 3 greens — keep risk % fixed.' },
      { shape: 'crows', name: 'Three Black Crows', color: '#ef4444', bias: 'SELL trend', tip: 'Three falling reds with lower closes — steady selling.', also: 'Also: don’t average down. Wait structure. RSI oversold can stay oversold — money rule: loss limit > hope.' },
      { shape: 'harami_bull', name: 'Bullish Harami', color: '#22c55e', bias: 'BUY (soft)', tip: 'Big red, then small green inside prior body — selling pressure shrinking.', also: 'Also: early pause signal. Needs confirm. Pairs with RSI bullish divergence study. Teaches reading “strength fading” not only reversals.' },
      { shape: 'harami_bear', name: 'Bearish Harami', color: '#ef4444', bias: 'SELL (soft)', tip: 'Big green, then small red inside — buying pressure shrinking.', also: 'Also: take partials on longs. Not automatic short. Psychology: greed after big green often ignores Harami warning.' },
      { shape: 'tweezer_bot', name: 'Tweezer Bottom', color: '#22c55e', bias: 'BUY', tip: 'Two candles with matching lows — double test of support.', also: 'Also: mark that low as structure. SL just under. Fib/BB alignment helps. Chart pattern cousin of Double Bottom — same support lesson.' },
      { shape: 'tweezer_top', name: 'Tweezer Top', color: '#ef4444', bias: 'SELL', tip: 'Two candles with matching highs — double test of resistance.', also: 'Also: mark resistance. Cousin of Double Top. RSI failure at highs = confluence. Teaches: same price twice rejected = respect the level.' },
      { shape: 'longlegged', name: 'Long-Legged Doji', color: '#94a3b8', bias: 'Indecision', tip: 'Very long upper AND lower wicks with a tiny body — a violent two-way fight that ended where it started.', also: 'Also: a big move often follows, but the direction is unknown — wait for the break candle. Teaches: high volatility is not high certainty.' },
      { shape: 'dragonfly', name: 'Dragonfly Doji', color: '#22c55e', bias: 'BUY bias', tip: 'Open = close = high, with a long lower wick — sellers pushed down and buyers slammed it straight back up.', also: 'Also: strongest at support / lower BB after a drop. SL under the wick tail. Teaches: rejection is a story, not a guarantee — confirm the next candle.' },
      { shape: 'gravestone', name: 'Gravestone Doji', color: '#ef4444', bias: 'SELL bias', tip: 'Open = close = low, with a long upper wick — buyers pushed up and sellers dragged it back to the low.', also: 'Also: strongest at resistance / upper BB / RSI overbought. Mirror of the Dragonfly. Teaches: a spike high that closes at the low is a failed breakout.' },
      { shape: 'inside_bar', name: 'Inside Bar', color: '#94a3b8', bias: 'Coiling / wait', tip: 'The second candle sits completely inside the first — the range compresses and the market holds its breath.', also: 'Also: the break of the mother bar is the trigger — trade in the break direction. Pairs with a BB squeeze. Teaches: contraction comes before expansion.' },
      { shape: 'outside_bar', name: 'Outside Bar', color: '#22c55e', bias: 'Breakout / reversal', tip: 'The second candle engulfs the first from high to low — a violent take-over inside one bar.', also: 'Also: direction = where the outside bar closes. A big bar means a big SL, so size smaller. Teaches: one bar can erase the last three.' },
      { shape: 'belt_bull', name: 'Bullish Belt Hold', color: '#22c55e', bias: 'BUY', tip: 'Opens at the low with no lower wick and runs green — buyers took control from the very first tick.', also: 'Also: strongest after a gap down or straight into support. SL under the open. Teaches: an opening drive shows real intent.' },
      { shape: 'belt_bear', name: 'Bearish Belt Hold', color: '#ef4444', bias: 'SELL', tip: 'Opens at the high with no upper wick and runs red — sellers controlled it from the open.', also: 'Also: strongest after a gap up or at resistance. Trail longs. Teaches: the first move can set the whole day.' },
      { shape: 'kick_bull', name: 'Bullish Kicker', color: '#22c55e', bias: 'Strong BUY', tip: 'A red candle, then a gap up into a green candle — the mood flipped between closes with no overlap.', also: 'Also: rare and powerful; the gap is required, no overlap allowed. Teaches: sentiment can flip while the market sleeps.' },
      { shape: 'kick_bear', name: 'Bearish Kicker', color: '#ef4444', bias: 'Strong SELL', tip: 'A green candle, then a gap down into a red candle — buyers vanished between the closes.', also: 'Also: exit longs fast — kickers do not wait for you. Teaches: a gap is the market repricing when you are away.' },
      { shape: 'abandoned', name: 'Bullish Abandoned Baby', color: '#22c55e', bias: 'Strong BUY', tip: 'A red candle, a gapped-down doji, then a gapped-up green candle — a lonely island of indecision.', also: 'Also: the doji must gap away on BOTH sides. Rare but high quality at bottoms. Teaches: reversals begin where everyone gives up.' },
      { shape: 'three_inside_up', name: 'Three Inside Up', color: '#22c55e', bias: 'BUY', tip: 'Bullish Harami plus a third green candle that closes above the first — the inside bar finally broke up.', also: 'Also: a confirmed Harami is far stronger than a bare one. SL under the harami low. Teaches: confirmation beats prediction.' },
      { shape: 'three_inside_down', name: 'Three Inside Down', color: '#ef4444', bias: 'SELL', tip: 'Bearish Harami plus a third red candle closing below the first — the inside bar broke down.', also: 'Also: cut longs as soon as the third closes. Teaches: a failed pause can simply resume the old trend.' },
      { shape: 'three_methods_bull', name: 'Rising Three Methods', color: '#22c55e', bias: 'BUY trend', tip: 'A long green candle, three small reds inside it, then another long green — a rest inside a rise.', also: 'Also: the pause never leaves the first candle range, so the trend is calm. Trade the break of the last candle. Teaches: trends rest without breaking.' },
      { shape: 'three_methods_bear', name: 'Falling Three Methods', color: '#ef4444', bias: 'SELL trend', tip: 'A long red candle, three small greens inside it, then another long red — a rest inside a fall.', also: 'Also: mirror of Rising Three Methods. Do not buy the small greens — they are noise. Teaches: pullbacks inside a range are not reversals.' },
      { shape: 'tower_bot', name: 'Tower Bottom', color: '#22c55e', bias: 'BUY reversal', tip: 'A long red candle, a cluster of tiny candles, then a long green — the mood shifts across a flat base.', also: 'Also: the flat middle is the battle and the last candle declares the winner. Teaches: bases take time.' },
      { shape: 'tower_top', name: 'Tower Top', color: '#ef4444', bias: 'SELL reversal', tip: 'A long green candle, a cluster of tiny candles, then a long red — buyers exhaust and sellers take over.', also: 'Also: mirror of Tower Bottom. Take partials while the base forms. Teaches: tops are a process, not a moment.' }
    ],
    chartPatterns: [
      { shape: 'double_bot', name: 'Double Bottom (W)', color: '#22c55e', bias: 'BUY bias', tip: 'Two lows near same price, then break of middle peak — W shape.', also: 'Also: neckline break = practice trigger. Measure height for TP idea. Links to Tweezer Bottom + Fib from peak→low. Risk: false break — wait close beyond neckline.' },
      { shape: 'double_top', name: 'Double Top (M)', color: '#ef4444', bias: 'SELL bias', tip: 'Two highs near same price, then break of middle trough — M shape.', also: 'Also: same as Tweezer Top on bigger scale. Trail longs before neckline break. Psychology: second top FOMO is expensive — plan was already there.' },
      { shape: 'hs_top', name: 'Head & Shoulders', color: '#ef4444', bias: 'SELL bias', tip: 'Left shoulder, higher head, right shoulder; break neckline down.', also: 'Also: classic distribution. Target ≈ head height below neckline. RSI often diverges at head. Teaches multi-swing patience — not one-candle trading.' },
      { shape: 'ihs', name: 'Inverse H&S', color: '#22c55e', bias: 'BUY bias', tip: 'Upside-down H&S at bottoms — neckline break up.', also: 'Also: accumulation story. Confirm with volume/momentum if available. Pair with Morning Star in the right shoulder zone for confluence study.' },
      { shape: 'triangle', name: 'Triangle (squeeze)', color: '#f0b429', bias: 'Breakout wait', tip: 'Lower highs + higher lows compressing — energy build.', also: 'Also: same lesson as BB squeeze. Don’t guess direction inside. Trade break + candle close. Money: size after direction known.' },
      { shape: 'flag', name: 'Bull Flag', color: '#22c55e', bias: 'BUY cont.', tip: 'Sharp rise (pole) then small downward / sideways channel — then continuation.', also: 'Also: Fib flag depth often shallow (38%). Marubozu pole + flag = trend practice. Don’t buy late after full extension without pullback.' },
      { shape: 'channel', name: 'Trend Channel', color: '#38bdf8', bias: 'With trend', tip: 'Price between rising (or falling) parallel lines — swing trade tools.', also: 'Also: buy lower channel + Hammer in uptrend; sell upper + Shooting Star. BB mid often tracks channel. Teaches “where” not only “what candle”.' },
      { shape: 'support_res', name: 'Support & Resistance', color: '#a78bfa', bias: 'Context first', tip: 'Horizontal zones where price repeatedly reacts — the map under every candle.', also: 'Also: every pattern is stronger at S/R. Draw zones on Chart Lab before BB/RSI. Psychology: levels > tips; write them before entry.' },
      { shape: 'triple_top', name: 'Triple Top', color: '#ef4444', bias: 'SELL bias', tip: 'Three highs at nearly the same price — buyers fail three times at one wall.', also: 'Also: stronger than a Double Top (three rejects = stubborn supply). Neckline break is the trigger; target ≈ pattern height. Teaches: the level, not the candle, is the boss.' },
      { shape: 'triple_bot', name: 'Triple Bottom', color: '#22c55e', bias: 'BUY bias', tip: 'Three lows at nearly the same price — sellers fail three times at one floor.', also: 'Also: mirror of Triple Top. Each touch can be a Hammer / Tweezer study. Wait for neckline break + close. Teaches patience across many swings.' },
      { shape: 'cup_handle', name: 'Cup & Handle', color: '#22c55e', bias: 'BUY cont.', tip: 'A rounded “U” (cup) then a small pullback (handle) — continuation after a rest.', also: 'Also: popular with breakout traders. Handle should be shallow and short — a deep handle means weak hands. Enter on handle-break with candle confirm.' },
      { shape: 'rounding_bot', name: 'Rounding Bottom', color: '#22c55e', bias: 'BUY reversal', tip: 'A slow, smooth “saucer” low — selling fades gradually, then buyers take over.', also: 'Also: a slow-motion Double Bottom. The message is that the sellers ran out of energy, not a single spike — full patience required.' },
      { shape: 'rounding_top', name: 'Rounding Top', color: '#ef4444', bias: 'SELL reversal', tip: 'A smooth “dome” high — buying fades gradually before price rolls over.', also: 'Also: mirror of Rounding Bottom. Take partials early while momentum dies. Teaches: tops are a process, not a single candle.' },
      { shape: 'rising_wedge', name: 'Rising Wedge', color: '#ef4444', bias: 'SELL bias', tip: 'Both rails rise, but they converge upward — buyers tire as the range pinches.', also: 'Also: misleading because price still rises; the narrowing is the real clue. Often breaks DOWN. Don’t chase the last push.' },
      { shape: 'falling_wedge', name: 'Falling Wedge', color: '#22c55e', bias: 'BUY bias', tip: 'Both rails fall, but they converge downward — sellers tire as the range pinches.', also: 'Also: mirror of Rising Wedge. Often breaks UP. A Hammer in the wedge tail is a classic study. Wait for the break + close.' },
      { shape: 'asc_triangle', name: 'Ascending Triangle', color: '#f0b429', bias: 'BUY bias', tip: 'A flat ceiling + rising floor — buyers keep stepping up into a fixed resistance.', also: 'Also: pressure builds against one price; breakout up is common. Enter on close above the ceiling. Teaches: buyers getting impatient.' },
      { shape: 'desc_triangle', name: 'Descending Triangle', color: '#f0b429', bias: 'SELL bias', tip: 'A flat floor + falling ceiling — sellers keep pushing into a fixed support.', also: 'Also: mirror of Ascending Triangle. Breakout down is common. Enter on close below the floor. Teaches: sellers gaining control.' },
      { shape: 'pennant', name: 'Pennant', color: '#22c55e', bias: 'Continuation', tip: 'A sharp pole then a tiny, tight triangle — a very short rest before the trend resumes.', also: 'Also: like a Flag but shorter and triangular. Measure the pole for a target idea. Never guess inside the tiny coil.' },
      { shape: 'flag_bear', name: 'Bear Flag', color: '#ef4444', bias: 'SELL cont.', tip: 'A sharp drop (pole) then a small upward / sideways channel — then continuation down.', also: 'Also: mirror of Bull Flag. The little bounce is a pause, not a reversal. Chase the flag and you buy the worst price — wait for the break.' },
      { shape: 'rectangle', name: 'Rectangle (Range)', color: '#f0b429', bias: 'Range trade', tip: 'Price bounces between a flat ceiling and floor — a sideways box.', also: 'Also: fade the edges inside, trade the break outside. BB squeeze usually sits inside a rectangle. Teaches: level-to-level discipline.' },
      { shape: 'broadening', name: 'Broadening Formation', color: '#f0b429', bias: 'Caution', tip: 'Higher highs AND lower lows — the range fans out instead of pinching.', also: 'Also: a chaotic, emotional market. Stops get hit both ways. Smaller size or stand aside; it often ends in a violent one-way move.' },
      { shape: 'diamond', name: 'Diamond', color: '#f0b429', bias: 'Reversal', tip: 'Wide at the middle, narrow at both ends — a classic topping / bottoming formation.', also: 'Also: a Triangle that morphs then un-morphs. Breakout direction decides. Rare and slow, so most rows feel like noise — be patient.' },
      { shape: 'island_rev', name: 'Island Reversal', color: '#ef4444', bias: 'Reversal', tip: 'Price gaps away, trades in a lonely cluster, then gaps back — an “island”.', also: 'Also: needs real gaps (more common in stocks/FX). The island is trapped buyers or sellers. Treat the gaps as the signal, not the island candles.' },
      { shape: 'breakaway_gap', name: 'Breakaway Gap', color: '#22c55e', bias: 'Trend start', tip: 'A gap out of a range or base — the move begins with force, not a squeeze.', also: 'Also: unlike an exhaustion gap it appears early in a move. Gaps often act as support/resistance later. Teaches: momentum vs. value gaps.' },
      { shape: 'v_reversal', name: 'V-Reversal', color: '#22c55e', bias: 'Reversal', tip: 'A sharp free-fall that turns up instantly with no base — a “V”.', also: 'Also: fast and scary; often news-driven. Hard to catch, easy to chase. Wait for a small pullback + candle instead of buying the spike.' },
      { shape: 'harmonic', name: 'Harmonic Pattern', color: '#f0b429', bias: 'Reversal zones', tip: 'A measured zig-zag (X-A-B-C-D) where each leg has a Fibonacci ratio — a “Gartley/Bat” style map.', also: 'Also: advanced. The D point is the entry zone, defined by ratios, not feelings. Master plain Fib first; this is Fib taken one level deeper.' }
    ],
    modules: [
      {
        id: 'bb',
        title: '1 · Bollinger Bands (BB)',
        summary: 'Volatility bands around a moving average. Learn squeeze, walk-the-band, lower/upper touch + candle confirm — the core CPE practice setup.',
        lessons: [
          { h: 'What BB is', t: 'Bollinger Bands = middle SMA (often 20) + upper/lower bands at N standard deviations (often 2). Bands widen when volatility rises and squeeze when the market is quiet.' },
          { h: 'Middle band', t: 'The middle line is the mean. Price above middle often shows bullish pressure; below shows bearish pressure. Use it as a dynamic bias line, not a magic buy/sell.' },
          { h: 'Lower band (BUY practice)', t: 'Price tagging the lower band after a drop can mean “stretched down.” Do NOT buy every touch. Wait for a bullish candle (Hammer, Engulfing) and ideally RSI turning up.' },
          { h: 'Upper band (SELL / caution)', t: 'Price tagging the upper band can mean “stretched up.” In an uptrend, price can ride the upper band (walk-the-band). Prefer SELL ideas only with bearish candle + higher-TF weakness.' },
          { h: 'Squeeze', t: 'Narrow bands = low volatility → a breakout often follows. Do not guess direction inside a tight squeeze; mark breakout and confirm with candle + volume if available.' },
          { h: 'Walk the band', t: 'In a strong trend, price hugs the upper (or lower) band for many candles. Fighting that with mean-reversion fades is a common beginner mistake.' },
          { h: 'BB + Chart Lab', t: 'In CPE Chart Lab / desks, study BB with candles on DEMO. Practice: lower band + Hammer → Paper Trade with SL below wick, TP1 near middle band.' },
          { h: 'BB + RSI combo', t: 'Stronger practice filter: lower BB + RSI oversold (or rising from oversold) + bullish candle. Upper BB + RSI overbought + bearish candle for short practice.' },
          { h: 'Stop placement', t: 'Long practice: SL under the swing low / below lower band wick. Short practice: SL above swing high. Never enter BB trade without a written SL.' },
          { h: 'Targets', t: 'Common path: TP1 at middle band, TP2 toward opposite band or trail. Scale out — don’t need the whole move.' },
          { h: 'Timeframes', t: 'Decide bias on higher TF (4H/1D). Enter on 15m/30m BB + candle. Mixing random TFs causes conflicting signals.' },
          { h: 'Mistakes to avoid', t: 'Buying every lower-band touch in a crashing market; selling every upper touch in a moon-run; no SL; ignoring news spikes that widen bands violently.' },
          { h: 'Practice checklist', t: '① Higher TF bias ② BB touch or squeeze break ③ Candle confirm ④ RSI agree ⑤ Risk % set ⑥ Paper first ⑦ Journal result.' }
        ]
      },
      {
        id: 'rsi',
        title: '2 · RSI (Relative Strength Index)',
        summary: 'Momentum oscillator 0–100. Default 14 period. Use with BB and candles — never RSI alone as a full system.',
        lessons: [
          { h: 'What RSI measures', t: 'RSI compares average gains vs losses over N bars. High RSI = recent bullish momentum; low RSI = recent bearish momentum. It is not “overbought = must sell” every time.' },
          { h: 'Classic zones', t: 'Often: above 70 = overbought zone, below 30 = oversold zone. In strong trends, RSI can stay overbought/oversold for a long time — that is normal.' },
          { h: 'Midline 50', t: 'RSI crossing above 50 can support bullish bias; below 50 bearish bias. Many traders use 50 as a trend-filter with BB middle band.' },
          { h: 'Divergence — bullish', t: 'Price makes lower low, RSI makes higher low → momentum weakening on downside. Still wait for candle + structure break before Paper entry.' },
          { h: 'Divergence — bearish', t: 'Price higher high, RSI lower high → upside momentum fading. Confirm with Shooting Star / Engulfing near resistance or upper BB.' },
          { h: 'Failure swings', t: 'RSI fails to retest prior extreme then crosses back through 50 — early momentum shift clue. Combine with Chart Lab structure.' },
          { h: 'RSI + BB (CPE style)', t: 'Practice long: price near lower BB, RSI ≤ 35 (or rising from ≤ 30), bullish candle. Practice short: upper BB, RSI ≥ 65–70, bearish candle.' },
          { h: 'Hidden divergence', t: 'Trend continuation clue (e.g. price higher low, RSI lower low in uptrend). Advanced — master classic divergence first on DEMO.' },
          { h: 'Settings', t: 'RSI(14) is the common default. Shorter RSI = more noise. Don’t keep changing settings to force a signal.' },
          { h: 'Exits with RSI', t: 'If you bought oversold, taking partial profit when RSI reaches mid/upper zone is reasonable. Trail the rest with structure or BB middle.' },
          { h: 'News & RSI', t: 'Big news can spike RSI instantly. Prefer waiting for the first violent candle to finish before acting on RSI extremes.' },
          { h: 'Mistakes', t: 'Shorting every RSI>70 in a bull market; longing every RSI<30 in a bear crash; no confluence; revenge re-entry when RSI “looks better.”' },
          { h: 'Practice checklist', t: '① Note RSI value + slope ② Check BB location ③ Candle confirm ④ Higher TF ⑤ Paper + journal ⑥ One idea at a time.' }
        ]
      },
      {
        id: 'fib',
        title: '3 · Fibonacci (Retracement & Extension)',
        summary: 'Measure pullbacks and targets from a clear swing high → swing low (or reverse). Focus on 38.2 · 50 · 61.8 with BB/RSI confluence.',
        lessons: [
          { h: 'Why Fib is used', t: 'Many traders watch the same ratios, so liquidity often reacts near them. Fib is a map of possible zones — not a guarantee.' },
          { h: 'Swing points', t: 'Always draw from a clear swing low to swing high (up move) or high to low (down move). Bad swings = useless levels. Practice picking swings on Chart Lab DEMO.' },
          { h: 'Key retracements', t: 'Common: 23.6% (shallow), 38.2%, 50% (not pure Fib but widely used), 61.8% (golden), 78.6% (deep). Deep retraces can signal trend weakness.' },
          { h: 'Pullback buys (uptrend)', t: 'After impulse up, wait for pullback into 38.2–61.8 zone + bullish candle + preferably BB mid/lower support or RSI holding >40–45.' },
          { h: 'Pullback sells (downtrend)', t: 'After impulse down, rally into 38.2–61.8 + bearish candle + RSI failing under 55–60.' },
          { h: 'Extensions / targets', t: 'Common extensions: 127.2%, 161.8% beyond the swing for TP2 ideas. Use with trail — don’t force exact ticks.' },
          { h: 'Confluence = power', t: 'Best practice zones: Fib 50/61.8 + BB middle/lower + prior structure + RSI turn. One Fib line alone is weak.' },
          { h: 'Fib + BB', t: 'If 61.8% sits near lower BB in an uptrend, that overlap is a high-quality Paper study zone. Enter only with candle confirm.' },
          { h: 'Multiple Fibs', t: 'Beginners should use ONE clean swing. Stacking 5 Fibs creates chart noise and FOMO entries.' },
          { h: 'Invalidation', t: 'If price closes clearly beyond 78.6% against your bias, the pullback thesis often fails — exit or stand aside.' },
          { h: 'Forex vs crypto', t: 'Same ratios. Forex majors often respect levels more cleanly in liquid sessions; crypto can wick through then reverse — size smaller.' },
          { h: 'Mistakes', t: 'Drawing Fib on tiny noise swings; entering mid-air with no candle; moving SL farther when Fib “almost” held; ignoring higher TF.' },
          { h: 'Practice checklist', t: '① Mark swing ② Note 38.2/50/61.8 ③ Wait for price to arrive ④ Candle + RSI/BB ⑤ Risk set ⑥ Paper → journal.' }
        ]
      },
      {
        id: 'money',
        title: '4 · Money Management',
        summary: 'How the method is actually used: risk a fixed percent, size from the stop, bank part of the profit, and stop for the day after a loss limit. CPE can apply this on manual and auto trades.',
        lessons: [
          { h: 'Goal of money management', t: 'Stay in the game. One bad trade should never wipe the account. Consistency beats lottery sizing.' },
          { h: 'How traders actually use it', t: 'The common practice is fixed-fractional risk. You do not pick a coin amount first. You write the stop first, decide that this idea may lose about 1% of the account, then the size falls out of that. A wide stop gets a smaller position. A tight stop gets a larger position, and the dollar risk stays about the same. This is the method CPE uses when the money-management tick is on.' },
          { h: 'Worked example ($1000 practice account)', t: 'Account $1000. Risk 1% = $10. Entry 100, stop 98. Distance = 2%. Size = 10 ÷ 0.02 = $500 notional. If the stop is hit, the loss is about $10, not $500. If price reaches 103 (1.5 times the risk), the gain is about $15. Same idea on every pair: the dollars at risk stay near 1%, the coin quantity changes.' },
          { h: 'What CPE does with the tick', t: 'Trade Now → Auto: tick “Use money management”. Save Auto Config. Each new auto trade then uses about 1% of a $1000 practice account plus closed results, sized from that signal’s entry and SL. Spot and futures minimums are respected: if the exchange minimum would risk more than 1%, that trade is skipped. After about −2% on the calendar day, new autos stop until the next day. At most about 3% is at risk across open trades. Manual Trade has the same tick. Signal History still shows the equal $10 test, and under it the 1% plan size for a $1000 account, so you can see both.' },
          { h: 'Partial profit and the trail', t: 'Practice is to take part off at the first target (often about half) and let the rest trail. When the stop moves up, the target can move too, so a winner can pay more than the first target. The risk on the original idea does not increase. A Strong signal is not a reason to risk 5%. The same 1% is used. The trail is what lets a Strong winner grow.' },
          { h: 'Daily stop and open heat', t: 'A used rule: if the day is down about 2% of the account, stop opening trades. Three open ideas at 1% each is about 3% heat. Five correlated coins are one bet, not five. Count them together.' },
          { h: 'What this method refuses', t: 'Martingale (doubling after a loss) is not used. Moving the stop farther to “give it room” after entry is not used. All-in on a “sure” signal is not used. If there is no valid stop, there is no size, so there is no trade.' },
          { h: 'Risk per trade', t: 'Common rule: risk only ~0.5–1% of account equity on a single idea. On DEMO, practice the same percentage habit as LIVE.' },
          { h: 'Position size formula', t: 'Size ≈ (Account × Risk%) ÷ (Entry − Stop distance). Wider SL → smaller size. Never pick size first and SL second.' },
          { h: 'Risk : Reward', t: 'Prefer ideas where potential reward ≥ risk (e.g. 1:1.5 or better) when learning. Scale out at TP1 so runners are “free risk.”' },
          { h: 'Partial take-profit', t: 'CPE style: TP1 lock some profit, TP2 / trail for the rest. Banking partials reduces emotional panic.' },
          { h: 'Trailing TP + SL', t: 'BUY: trail levels up as price rises. SELL: trail down. Trailing locks open profit without needing a perfect exit call.' },
          { h: 'Daily / weekly loss limit', t: 'Example rule: stop trading for the day after −2% account. Revenge sessions after a loss limit are account killers.' },
          { h: 'Spot sizing', t: 'Spot min notionals matter (e.g. exchange mins). Still apply risk%: if min size risks too much vs your SL, skip the trade.' },
          { h: 'Futures / leverage', t: 'Leverage multiplies both profit and loss. High leverage + wide SL = blown account. Prefer low leverage while learning; Isolated can cap loss per position.' },
          { h: 'Correlation', t: 'Opening 5 correlated BTC alts = one big bet, not five. Count risk as a group.' },
          { h: 'Fees & slippage', t: 'Tight scalps look good on chart but fees eat R:R. Prefer cleaner swings on DEMO until you know costs.' },
          { h: 'DEMO → LIVE bridge', t: 'CPE DEMO practice (~3 months mindset): same journal rules, same %. When LIVE, start half DEMO size for the first weeks.' },
          { h: 'API money safety', t: 'Withdrawals OFF on every key. Live only after Test Account OK on the matching platform. Wrong platform secret = failed or dangerous ops.' },
          { h: 'Mistakes', t: 'Martingale (double after loss); moving SL farther; all-in on “sure” setups; ignoring min size vs risk%; trading without daily stop.' },
          { h: 'Practice checklist', t: '① Risk % written ② Size from SL distance ③ TP1/TP2/trail planned ④ Max daily loss known ⑤ Paper first ⑥ Journal PnL honestly.' }
        ]
      },
      {
        id: 'psych',
        title: '5 · Psychology for Trading',
        summary: 'Mindset decides if BB/RSI/Fib skills survive real screens. FOMO, revenge, overconfidence, fear — train these on DEMO like indicators.',
        lessons: [
          { h: 'Why psychology matters', t: 'A perfect BB+RSI plan fails if you enter early, skip SL, or revenge trade. Skill = system × discipline.' },
          { h: 'Process over prediction', t: 'You don’t need to predict the future. You need to execute rules: setup → risk → manage → journal. Outcomes vary; process is controllable.' },
          { h: 'FOMO', t: 'Fear of missing out = chasing green candles already far from BB/Fib zone. Rule: if you missed the entry, wait for the next setup. Chart Lab always has another candle.' },
          { h: 'Revenge trading', t: 'After a loss, the urge to “win it back now” destroys accounts. Mandatory cool-down: walk away, journal the loss, next trade only if checklist is clean.' },
          { h: 'Overconfidence after wins', t: '3 wins in a row ≠ increase size 5×. Keep risk % fixed. Winning streaks are when most people break money rules.' },
          { h: 'Fear after losses', t: 'Skipping every valid setup after a red day is also bias. Trust the written plan; reduce size temporarily if needed, don’t abandon process.' },
          { h: 'Analysis paralysis', t: '10 indicators disagree → freeze. Stick to CPE core: candles + BB + RSI (+ Fib zone). Quality over quantity of tools.' },
          { h: 'Tilt & news', t: 'Big red candles on news spike adrenaline. Prefer flat during major unknowns until structure reforms — ego wants action; plan wants patience.' },
          { h: 'Journal = therapy + data', t: 'Write emotion tags (FOMO, rush, calm) in CPE Journal. Patterns in feelings reveal leaks faster than PnL alone.' },
          { h: 'Written rules', t: 'If it isn’t written, it isn’t a rule. Example: “Only BB+candle+RSI; risk 1%; no trade after −2% day; DEMO until checklist 20 papers.”' },
          { h: 'Environment', t: 'Sleep, hunger, and phone distraction change decisions. Don’t size up when exhausted. Trading is athletic — protect the brain.' },
          { h: 'Social noise', t: 'Telegram “signals” and hype break your plan. CPE Learning Class + your journal > random tips. Filter News & Tricks as context, not orders.' },
          { h: 'Identity shift', t: 'Think “I follow my checklist” not “I must be right.” Being wrong with small risk is normal; being stubborn with large risk is optional.' },
          { h: 'DEMO as gym', t: 'Use DEMO/Paper to rehearse emotions safely. If you can’t follow rules on DEMO, LIVE will not magically fix discipline.' },
          { h: 'Practice checklist', t: '① Am I calm? ② Checklist complete? ③ Risk % unchanged? ④ Not revenge? ⑤ Will I journal honestly? If any NO → no trade.' }
        ]
      },
      {
        id: 'signals',
        title: '6 · CPE Signals — meaning & what to do',
        summary: 'Spot / Futures / Forex desks show BUY · SELL · HOLD + score. Same engine idea on every platform — but you trade only on the platform whose API key you saved. Here is what each signal means and the exact steps after it appears.',
        lessons: [
          { h: 'Where signals come from', t: 'CPE scores BB, RSI, Fibonacci, candle stick, EMA cross, SMA50, MACD and momentum. Score ≥ +3 → BUY. Score ≤ −3 → SELL. In between → HOLD. This is a helper rating — not a promise of profit.' },
          { h: 'BUY signal — meaning', t: 'Bullish confluence is stronger right now (examples: lower BB bounce, RSI oversold turn, bullish candle, golden cross, Fib support). Suggested TP1 / TP2 / SL appear on the row / Chart Lab / Trade Now.' },
          { h: 'SELL signal — meaning', t: 'Bearish confluence is stronger (upper BB / overbought RSI / bearish candle / death cross / Fib resistance). On Spot, SELL usually means exit/reduce long or short only if your market allows shorts (Futures/Forex).' },
          { h: 'HOLD signal — meaning', t: 'Mixed or weak score. Do NOT force a trade. Flat is correct. Watchlist ★ and wait for clearer BUY/SELL or a BB Lower candidate.' },
          { h: 'Score number', t: 'Higher |score| = more agreement among tools. A BUY +5 is stronger than BUY +3 — still confirm on Chart Lab candles before size.' },
          { h: 'BB Lower board', t: 'Separate list of pairs tagging Bollinger lower band — practice long candidates. Still need candle + RSI confirm; not every lower touch is an entry.' },
          { h: 'Platform vs signal (important)', t: 'Signal math is the same idea on Binance, Bybit, OKX, KuCoin, Bitget, Gate, MEXC, Kraken, Coinbase, OANDA, FXCM, MT5, Forex Demo. What changes is WHERE you send the order: only the platform selected in API Keys / Trade Now. A Binance BUY does not open on Bybit.' },
          { h: 'Crypto Spot platforms', t: 'Binance Spot, Coinbase, etc.: BUY = buy the coin with quote (e.g. USDT). SELL = sell holdings / take profit. Min size (e.g. ~$11) matters. No leverage.' },
          { h: 'Crypto Futures platforms', t: 'Binance Futures, Bybit, OKX, Bitget…: BUY = long; SELL = short. Pick Cross/Isolated + leverage carefully. Trail: BUY trails TP+SL up; SELL trails down.' },
          { h: 'Forex platforms', t: 'OANDA / FXCM / MT5 / Forex Demo: same BUY/SELL/HOLD labels on FX pairs (EURUSD…). BUY = buy base currency; SELL = sell base. Lots (e.g. 0.01) instead of coin qty. Sessions & news matter more.' },
          { h: 'When a BUY appears — do this', t: '① Open the row → read Why / candle / RSI. ② Chart Lab confirm (15m–1H). ③ DEMO first: Trade Now → set TP1/TP2/SL/trail → Start Demo/Paper. ④ Only after API Test OK on that platform → small LIVE. ⑤ Journal result.' },
          { h: 'When a SELL appears — do this', t: '① If you are long Spot: consider TP / partial close / trail — do not ignore. ② If Futures/Forex and plan allows short: confirm Chart Lab then Paper/Live short with SL. ③ If HOLD was better yesterday, do not revenge flip size.' },
          { h: 'When HOLD appears — do this', t: 'No new Manual entry. Keep scanning. Add ★ watchlist. Study Learning Class / Chart Lab. Protect open positions with trail only if already in a trade.' },
          { h: 'Auto Trade + signal', t: 'Auto BUY can open when BB Lower + strong score rules match your saved Auto config. Still DEMO-test Auto first. LIVE Auto = real risk — Withdrawals OFF, small size.' },
          { h: 'Notifications', t: 'BUY Signal toasts follow your language. Treat them as alerts to open the desk — not as market orders by themselves.' },
          { h: 'What NOT to do', t: 'Don’t buy every BUY without chart. Don’t use Binance key on Bybit. Don’t skip SL. Don’t raise size after one green signal. Don’t trade HOLD as “almost BUY”.' },
          { h: 'Quick action card', t: 'Signal → Chart Lab → Risk % → TP1/TP2/SL → DEMO Paper → Journal → (later) LIVE on matching platform key.' }
        ]
      },
      {
        id: 'forex_sig',
        title: '7 · Forex signals — meaning & what to do',
        summary: 'Forex Desk uses the same BUY / SELL / HOLD rating on FX pairs. Learn how forex signals differ from crypto, and the exact steps from signal → Paper → live broker.',
        lessons: [
          { h: 'Forex Desk signals', t: 'EURUSD, GBPUSD, USDJPY… get BUY / SELL / HOLD + score like crypto. Click a row for chart, psychology text, and suggested levels.' },
          { h: 'BUY on Forex — meaning', t: 'Buy the base currency (e.g. BUY EURUSD = buy EUR vs USD). Expect price up. Use Chart Lab Forex interval you practice (15m/30m/1H).' },
          { h: 'SELL on Forex — meaning', t: 'Sell the base (short the pair). Expect price down. Always set SL above structure / upper band idea.' },
          { h: 'HOLD on Forex', t: 'No clear edge — skip. Especially before big news (NFP, CPI, central bank) prefer HOLD / flat.' },
          { h: 'Forex Demo Rates platform', t: 'No API key. Practice charts + Paper only. Perfect for Learning Class drills before OANDA/FXCM/MT5 live.' },
          { h: 'OANDA signal → action', t: '① Forex Desk BUY/SELL. ② Chart Lab confirm. ③ API Keys → OANDA token + Account ID → Test. ④ DEMO Paper in CPE first. ⑤ Small live lots (0.01 mindset) with TP/SL/trail.' },
          { h: 'FXCM / MT5', t: 'Same signal reading. Connect that broker’s credentials under API Keys. Signal does not auto-login MT5 for you until keys/bridge are set — practice Paper until Test OK.' },
          { h: 'Sessions', t: 'London–NY overlap often moves majors more. Asia may be quieter — HOLD is common and healthy.' },
          { h: 'Spread & news', t: 'Around news, spreads widen — a good technical BUY can still be a bad fill. Check News & Tricks; wait for candle close after spike.' },
          { h: 'Lots vs crypto qty', t: 'Forex size = lots, not USDT notional the same way. Risk % still rules: wider SL → smaller lots.' },
          { h: 'BB Lower on Forex', t: 'Same idea: pair near lower band + Hammer + RSI rising = practice long study. Confirm higher TF bias (4H/Daily).' },
          { h: 'When Forex BUY fires — steps', t: '① Read Why. ② Higher TF bias OK? ③ Mark SL beyond wick/structure. ④ Paper trade. ⑤ If live broker ready → tiny size + trail. ⑥ Journal session (London/NY) + emotion.' },
          { h: 'When Forex SELL fires — steps', t: '① Confirm not mid-news spike. ② Chart Lab bearish candle. ③ Paper short or close long. ④ Trail down if short. ⑤ Do not double lot after a miss.' },
          { h: 'Forex vs crypto difference', t: 'Crypto 24/7; Forex has sessions. Crypto min $ often; Forex lots + pip value. Crypto many alts correlated; Forex majors cleaner for learning.' },
          { h: 'Practice checklist (FX)', t: '① Pair major? ② Session OK? ③ News clear? ④ Signal BUY/SELL not HOLD? ⑤ Chart confirm? ⑥ Risk %? ⑦ Paper → journal → live broker key only when ready.' }
        ]
      },
      {
        id: 'fomo',
        title: '8 · FOMO & Emotional Discipline',
        summary: 'FOMO, revenge, greed and fear are the real account killers — not indicators. Learn the triggers, the body signs, and the exact rules that keep impulse trades out of your account.',
        lessons: [
          { h: 'What FOMO really is', t: 'FOMO = the fear of missing a move that is already far from your zone. It makes you enter late with a worse price and no proper SL. The candle you “missed” is information, not a loss.' },
          { h: 'The three FOMO triggers', t: '① A big green or red candle on the chart. ② A friend or Telegram post showing profit. ③ A news headline. Notice the trigger before you notice the entry.' },
          { h: 'Body signs', t: 'Fast heartbeat, leaning into the screen, an urge to click market-buy-now, skipping your checklist. If you feel these, close the tab and wait one candle.' },
          { h: 'The “already ran” rule', t: 'If price has moved more than about 1 ATR past your planned entry, the trade is gone. Wait for a pullback to BB mid / Fib or skip it. There is always another setup.' },
          { h: 'The green candle trap', t: 'A Marubozu you did not plan for is a chase, not an entry. Late entries have the worst reward:risk because the stop ends up far away.' },
          { h: 'Revenge trading', t: 'After a loss the brain wants to win it back now. Rule: no new entry for 15–30 minutes after a loss, and only if the checklist is clean. The market owes you nothing.' },
          { h: 'Fear of pulling the trigger', t: 'The opposite problem: a perfect setup appears and you freeze. Use a tiny DEMO size to prove the process, and decide your size BEFORE the candle appears so the decision is already made.' },
          { h: 'Greed after wins', t: 'Two green trades make you feel invincible, then you double size. Keep risk % fixed for at least 20 trades; winning streaks mean-revert.' },
          { h: 'Boredom trading', t: 'Flat is a position. If no A+ setup exists, do not make something happen. Boredom trades are FOMO in disguise.' },
          { h: 'Screen-time discipline', t: 'Set two or three scan windows a day instead of staring at charts. Fewer decisions means fewer impulse decisions.' },
          { h: 'Emotional journal', t: 'Tag each trade calm / rushed / FOMO / revenge. After 20 trades the pattern of your leaks becomes obvious.' },
          { h: 'Reset ritual', t: 'After a loss or a FOMO slip: stand up, take 10 slow breaths, write one sentence about what happened, then stop for the hour or continue at half the normal risk.' },
          { h: 'Practice checklist', t: '① Calm body? ② Trigger noticed? ③ Setup in my zone? ④ SL written first? ⑤ Risk % unchanged? ⑥ Not revenge? Any NO → no trade.' }
        ]
      },
      {
        id: 'risk_deep',
        title: '9 · Risk & Money Management — deep',
        summary: 'The maths that keeps an account alive: fixed-fractional sizing, R-multiples, drawdown maths, correlation heat, and the daily stop. Turn trading into a business run by numbers.',
        lessons: [
          { h: 'Fixed-fractional risk', t: 'Risk a fixed % (0.5–1%) of equity per idea. Size is the RESULT of the stop distance, never chosen first. Wide SL → small size; tight SL → larger size; the dollar risk stays the same.' },
          { h: 'The sizing formula', t: 'Size = (Equity × Risk%) ÷ |Entry − Stop|. Example: $1000 × 1% = $10 risk. Entry 100, stop 98 → distance 2% → size 10 ÷ 0.02 = $500 notional.' },
          { h: 'Think in R-multiples', t: 'Risk 1R per trade. A 2R winner pays for two losses. Track your average R over 20 trades — that is your real edge, not the win rate.' },
          { h: 'Reward : risk', t: 'Aim for at least 1.5R of potential before entry. Below that, skip it unless your win rate is very high.' },
          { h: 'Drawdown maths', t: 'A −50% drawdown needs +100% to recover. Losing streaks are normal: even a 60% win-rate system has runs of 5+ losses. Small risk keeps the streak survivable.' },
          { h: 'The daily stop', t: 'Hard rule: stop opening trades after −2% of equity in a day (or 2–3 losses in a row). Revenge sessions after the limit are account killers.' },
          { h: 'Weekly and monthly limits', t: 'Also cap the week (for example −5%) and the month. When hit, drop to DEMO, review the journal, then size back up only after a clean run.' },
          { h: 'Open heat', t: 'Total risk across all open trades should stay around 3% or less. Five correlated alts are one bet, not five — count correlated exposure together.' },
          { h: 'Spot sizing', t: 'Spot has a minimum notional. If the exchange minimum would risk more than your 1%, skip the trade — never round the risk up.' },
          { h: 'Futures sizing', t: 'Leverage changes margin, not risk. Risk is still Entry − Stop × size. Use low leverage while learning and prefer Isolated margin.' },
          { h: 'Forex sizing', t: 'Risk = lots × pip-value × stop-pips. Solve for lots. Rough guide: 0.01 lot ≈ $0.10 per pip; a 20-pip stop risking 1% of $1000 ($10) → 10 ÷ 0.10 ÷ 20 = 0.05 lots.' },
          { h: 'Scaling out', t: 'Take about 50% off at TP1 to make the rest free risk, then trail. This turns a good trade into a low-stress runner.' },
          { h: 'Compounding vs fixed', t: 'Risk a fixed % of CURRENT equity (compounding). Do not fix your risk at the all-time-high account size.' },
          { h: 'Fees and slippage in R', t: 'Subtract fees from R. A 0.2% fee against a 0.5% scalp can wipe the edge — prefer cleaner swings.' },
          { h: 'The “no stop, no trade” law', t: 'If you cannot define a logical stop, you do not know your risk, so there is no size, so there is no trade.' },
          { h: 'Anti-martingale', t: 'Never double after a loss. Only increase size after several profitable, disciplined weeks of a proven process — and even then slowly.' },
          { h: 'Practice checklist', t: '① Equity known ② Risk % written ③ Stop defined ④ Size from the stop ⑤ Reward ≥ 1.5R ⑥ Daily stop known ⑦ Correlated heat counted.' }
        ]
      },
      {
        id: 'sl_tp',
        title: '10 · Stop Loss & Take Profit mastery',
        summary: 'Place the SL where the market proves you wrong, take profit in steps, and trail the stop so a winner can run — exactly what CPE does with multi-TP and a trailing SL.',
        lessons: [
          { h: 'SL is a decision, not a number', t: 'Put the stop where the idea is invalidated (below the swing low, wick, or structure), not at a random dollar distance. You are buying information: if price goes here, my reason is wrong.' },
          { h: 'Structure stops', t: 'Long: SL just below the swing low or lower-band wick. Short: just above the swing high. Give a small buffer for spread and wick noise, about 0.1–0.3%.' },
          { h: 'Volatility stops', t: 'Wider markets need wider stops. Use ATR or the wick length to size the stop, then shrink the position so the dollar risk stays the same.' },
          { h: 'Why a fixed-dollar SL fails', t: 'A $10 stop on BTC and a $10 stop on EURUSD are completely different risk. Distance must be measured in %, not dollars.' },
          { h: 'Anti stop-hunt buffer', t: 'CPE ignores a single wick touch: it needs two consecutive breaches plus a small buffer (0.15%) before closing. That stops noise from hunting your stop.' },
          { h: 'Take profit in steps', t: 'Never close 100% at one price. Scale out: TP1 books part, then TP2 / trail rides the rest so a big move can pay for many losers.' },
          { h: 'Multi-TP levels', t: 'CPE lets you add as many TP levels as you need, each with its own close %. Example: TP1 40%, TP2 30%, TP3 30% — or take TP1 and trail the rest.' },
          { h: 'Trailing the stop', t: 'After TP1 move the stop to breakeven; after TP2 move it to TP1. Let the stop follow price so open profit is protected while the runner continues.' },
          { h: 'Choosing the trail %', t: 'A tight trail locks profit fast but exits early; a wide trail breathes but gives some back. Start around 1–2% for crypto and tune it in the Positions edit modal.' },
          { h: 'Runners', t: 'When price walks the band in a strong trend, widen the target and trail instead of taking everything at TP2. That is how one trade pays for a whole week.' },
          { h: 'Partial-close buttons', t: 'Use the 50% / 100% close buttons in Positions for manual control, or let Auto Close manage TP / SL by the plan.' },
          { h: 'The breakeven trap', t: 'Do not move the SL to breakeven too early, before TP1 — normal pullbacks will knock you out of good trades.' },
          { h: 'Never widen a losing stop', t: 'Moving the SL farther away to give it room is how small losses become account killers. The stop you set before entry is the stop.' },
          { h: 'Time stop', t: 'If a trade does nothing for many candles while a clearly better setup forms, closing flat and redeploying the risk is a valid exit.' },
          { h: 'Practice checklist', t: '① SL at invalidation, not random ② Buffer for wicks ③ TP1 partial planned ④ Trail after TP1 ⑤ Never widen the SL ⑥ Let a winner run.' }
        ]
      },
      {
        id: 'plan_journal',
        title: '11 · Trade Plan & Journaling',
        summary: 'A written plan turns trading from gambling into a process. Learn the one-page plan, the pre-trade checklist, and how to journal so your leaks become visible.',
        lessons: [
          { h: 'Why write a plan', t: 'If it is not written it is not a rule. A plan removes live decision-making under stress and makes your results measurable.' },
          { h: 'The one-page plan', t: 'Pair, market, setup (BB + RSI + candle + Fib zone), direction, entry, SL, TP1 / TP2, size (from the SL) and max daily loss. If any line is blank → no trade.' },
          { h: 'Pre-trade checklist', t: 'Higher-TF bias? · Setup in my zone? · Candle confirm? · RSI agree? · SL written? · Risk %? · Reward ≥ 1.5R? · Calm? All yes → trade.' },
          { h: 'Pre-session routine', t: 'Check the higher timeframe, key levels and news. Write today’s two or three watch pairs before the session — not after the candle explodes.' },
          { h: 'What to journal', t: 'Symbol, side, entry, exit, size, R, reason, timeframe, session and an emotion tag. CPE Journal saves P/L and reasons automatically; add your own notes.' },
          { h: 'Journal the WHY', t: 'Record what you saw (setup) and what you felt (calm / FOMO / rushed). An outcome without context teaches nothing.' },
          { h: 'Track R, not wins', t: 'Two traders with the same win rate can have opposite results. Average R and maximum drawdown matter more than the win %.' },
          { h: 'Screenshot habit', t: 'Save the chart before and after each trade. Reviewing 20 screenshots shows your edge and your leaks faster than any indicator.' },
          { h: 'Weekly review', t: 'Once a week count your trades, average R, best and worst setup, and rule breaks. Pick ONE leak to fix next week.' },
          { h: 'Tag the leaks', t: 'Common tags: late entry, no SL, oversized, moved SL, revenge, boredom. When a tag repeats, turn it into a hard rule.' },
          { h: 'What not to log', t: 'Do not log only winners. Losses are the data. A journal of only wins is a brochure, not a journal.' },
          { h: 'Plan the DEMO → LIVE step', t: 'Prove the plan on DEMO for a set number of trades with a positive average R before risking real money — then start at half size.' },
          { h: 'Practice checklist', t: '① Plan written before entry ② Checklist passed ③ Journal entry + emotion ④ Weekly review ⑤ One leak fixed.' }
        ]
      },
      {
        id: 'leverage',
        title: '12 · Leverage, Margin & Liquidation',
        summary: 'Leverage multiplies loss as fast as profit. Learn margin, liquidation, isolated vs cross margin, and the safety rules that stop one trade from wiping the account.',
        lessons: [
          { h: 'What leverage is', t: 'Leverage lets you control a larger position with less margin. It increases both profit and loss — it does not increase your edge.' },
          { h: 'Margin vs risk', t: 'Margin is the deposit the exchange locks. Risk is Entry − Stop × size. Leverage changes margin, never your dollar risk.' },
          { h: 'Liquidation', t: 'If losses eat your margin, the exchange force-closes the position (liquidation), often at the worst time. Keep your stop far away from the liquidation price.' },
          { h: 'Isolated vs Cross', t: 'Isolated caps the loss to that one position’s margin. Cross uses the whole wallet balance — more dangerous for beginners. Prefer Isolated while learning.' },
          { h: 'Safer leverage', t: 'Low leverage (2–5x) plus a proper stop is far safer than 50x with no stop. The stop, not the leverage number, is your protection.' },
          { h: 'The liquidation-distance rule', t: 'Check that your SL sits well inside the liquidation price. If they are close, reduce size until there is comfortable space.' },
          { h: 'Leverage does not fix a bad entry', t: 'High leverage on a bad entry just loses faster. Fix the setup first, then size it.' },
          { h: 'Funding and fees', t: 'Perpetual futures charge funding over time. Long holds on leveraged perps bleed funding — another reason to size and time carefully.' },
          { h: 'Spot vs Futures', t: 'Spot cannot be liquidated (you own the coin). Futures can, and can go to zero. Use Futures only with a written plan and Isolated margin.' },
          { h: 'Sizing under leverage', t: 'Compute size from the stop distance, then check that the resulting margin is affordable. Never pick leverage first.' },
          { h: 'The “one trade” test', t: 'Before entering ask: if this hits the stop, is it a shrug or a disaster? If it is not a shrug, the size is too big.' },
          { h: 'Practice checklist', t: '① Isolated set ② Low leverage ③ SL inside the liquidation price ④ Size from the stop ⑤ Can I survive a full loss here? yes → trade.' }
        ]
      },
      {
        id: 'practice',
        title: '13 · Practice Routine & Backtesting',
        summary: 'Skill is built on DEMO before LIVE. Learn a repeatable practice loop, how to “backtest” by scrolling charts, and how to graduate to real money safely.',
        lessons: [
          { h: 'DEMO is the gym', t: 'Paper / DEMO exists to rehearse the process and your emotions with zero risk. If you cannot follow the rules on DEMO, LIVE will not magically fix it.' },
          { h: 'The practice loop', t: 'Choose one setup (for example BB lower + Hammer + RSI turn). Mark 20 historical examples on the chart. Define entry / SL / TP. Record the result. Repeat.' },
          { h: 'Manual backtesting', t: 'Scroll back in Chart Lab, hide the future, and mark each signal by hand. It trains pattern recognition and stops you fooling yourself.' },
          { h: 'Sample size', t: 'Ten trades mean nothing. Aim for 30–50 recorded trades of one setup before judging it.' },
          { h: 'Forward test on DEMO', t: 'After hand-marking, run the same setup live on DEMO with the software’s signals for two to four weeks. Compare real fills and emotions to the backtest.' },
          { h: 'One setup at a time', t: 'Do not test five systems at once. Master one edge, then add a second.' },
          { h: 'Keep the routine small', t: 'A 20-minute daily routine (scan, mark, journal, review) beats six hours of random chart-staring.' },
          { h: 'Graduating to LIVE', t: 'Criteria: positive average R over 30+ DEMO trades, rules followed, no revenge episodes. Then start LIVE at half size and scale slowly.' },
          { h: 'Scale-up rule', t: 'Increase size only after a set number of profitable, disciplined weeks — never after one big win.' },
          { h: 'When to step back', t: 'Hit the daily or weekly loss limit, or notice repeated rule breaks → return to DEMO and rebuild discipline before continuing.' },
          { h: 'Track process metrics', t: 'Log checklist pass-rate, rule-breaks per week and average R. These predict growth better than a single P/L number.' },
          { h: 'CPE practice path', t: 'Learning Class → Chart Lab (mark setups) → Paper Trade → Journal review → Signal desks on DEMO → small LIVE on the matching platform key.' },
          { h: 'Practice checklist', t: '① One setup chosen ② 30 examples marked ③ DEMO forward test ④ Journal + review ⑤ Positive R → half-size LIVE.' }
        ]
      },
      {
        id: 'volatility',
        title: '14 · Volatility & Martingale',
        summary: 'How to read market volatility (why price is changing), how it is added to every signal as a reason line, and how the optional Martingale ladder works — plus why it is the fastest way to lose an account when used carelessly.',
        lessons: [
          { h: 'What volatility means', t: 'Volatility is how much price is moving — not which way. High volatility = wide candles and fast swings. Low volatility = a quiet, narrow range. The same setup has very different reliability in each.' },
          { h: 'The CPE volatility reading', t: 'Each signal now measures the average candle range and the Bollinger band width, then compares them to that pair’s own recent normal. You get LOW / NORMAL / HIGH / EXTREME plus a plain-language reason line — the “why” for the market change, shown with the signal.' },
          { h: 'EXTREME volatility = downgrade', t: 'When the tape is EXTREME, a fresh STRONG signal is downgraded to CAUTION (the reason is shown). In a whipsaw market the same pattern fails far more often — fake breaks and stop-hunt wicks are the norm.' },
          { h: 'What to do in HIGH / EXTREME', t: 'Smaller size. Wider stop. Fewer trades. Wait for a completed candle instead of a mid-candle spike. If the reading says EXTREME, treat the setup as a study zone, not an entry.' },
          { h: 'What Martingale is', t: 'Martingale adds to a losing position to lower the average entry: after each adverse move you add another order, usually bigger (1x, 2x, 4x …). It wins often, then loses everything in one bad run.' },
          { h: 'The CPE Martingale rule', t: 'CPE adds an extra order only when BOTH are true: (1) price has moved against the trade by at least step × rung %, and (2) a fresh same-side signal still stands for that pair. It never adds just because price dropped.' },
          { h: 'The four numbers', t: 'Step % = adverse move needed before each add. Multiplier = each add’s size versus the base (1 = flat, 2 = double). Max adds = hard limit on extra orders. Ladder risk cap % = the whole ladder’s risk as a % of equity. All four are yours to choose.' },
          { h: 'The hard cap protects you', t: 'Even with a large multiplier and many adds, CPE refuses the order once the ladder’s total risk would pass your cap % of equity. It also respects the exchange minimum size and the daily −2% stop.' },
          { h: 'Where it runs', t: 'Tick it on Manual to manage that one trade, or on an Auto session to manage its auto trades. Both DEMO and LIVE. On Manual the pair must be in the scan list so a fresh same-side signal can be read.' },
          { h: 'Why the cap matters (example)', t: 'Step 1%, multiplier 2, three adds on a 1%-risk base: risk goes 1% → 2% → 4% → 8%. One full stop-out on the last rung erases many winners. That is why the cap exists and why the default numbers are small.' },
          { h: 'Anti-martingale alternative', t: 'Many pros do the opposite: add only to winners and cut losers fast. It feels worse (more small losses) but it cannot blow up the account in a single trend against you.' },
          { h: 'Risk is not removed', t: 'Averaging down does not remove risk — it moves risk from “many small losses” into “one large loss”. Never add with money you cannot lose, and never switch the cap off to “recover” a losing trade.' },
          { h: 'Practice path', t: 'Learn the volatility reading on DEMO first. Try Martingale with max adds 1–2 and a small multiplier on DEMO for 30+ trades. Journal every ladder, then decide — most traders find the flat / anti-martingale method safer.' },
          { h: 'Volatility + Martingale checklist', t: '① Read the volatility level first ② Skip or shrink in EXTREME ③ Martingale only with a fresh same-side signal ④ Step × rung reached ⑤ Under the risk cap → add. Any “no” → no add.' }
        ]
      },
      {
        id: 'lab_indicators',
        title: '15 · Chart Lab Indicators (Stoch · ADX · Ichimoku · VWAP)',
        summary: 'Chart Lab now has a full indicator bar — every button is an on/off tick that redraws the chart instantly. Besides BB / RSI / MACD / EMA / SMA50 / Volume you now get Stochastic, ADX/DMI, Ichimoku and VWAP, and the signal engine reads them too — not just the chart.',
        lessons: [
          { h: 'Where the bar is', t: 'Chart Lab → the “Indicators” row of buttons under the chart. One click turns an indicator on, the next click turns it off; the chart redraws immediately. The ticks are visual AND they feed the signal engine.' },
          { h: 'Stochastic (14,3,3)', t: '%K / %D oscillator drawn under the candles, scale 0–100. Above ~80 = overbought zone, below ~20 = oversold zone. %K crossing up through %D in the oversold zone is a bullish study; a cross down at the top is bearish. In a strong trend it can stay pinned at one end for a long time — always combine with BB and the candle.' },
          { h: 'ADX / DMI (14)', t: 'ADX measures trend STRENGTH, not direction. Above ~25 = a real trend is running; below ~20 = a choppy range. +DI above −DI = buyers in charge; −DI above +DI = sellers in charge. Use ADX to decide whether to trend-trade at all or stay flat.' },
          { h: 'Ichimoku Cloud (9,26,52)', t: 'Tenkan (fast line), Kijun (slow line) and the Senkou cloud. Price above a rising cloud = bullish background; below a falling cloud = bearish. A Tenkan/Kijun cross inside the cloud is weak; a cross with price leaving the cloud is stronger. The cloud edge itself often acts as support / resistance.' },
          { h: 'VWAP', t: 'Volume-Weighted Average Price — the average price weighted by volume, reset each session. Big institutions benchmark their fills to it. Price above a rising VWAP = buyers in control; a clean rejection at VWAP during a downtrend is a short study. On 24/7 crypto it resets differently than on FX — treat it as a guide line, not a law.' },
          { h: 'How the engine uses them', t: 'Each new indicator adds a small confirmation to the score on the same side it points (Stochastic, Ichimoku, VWAP, ADX when it agrees with the direction, and Elliott). They are confirmations, not triggers — if they disagree with BB / RSI / the candle, the score simply grows more mixed and you get more HOLD.' },
          { h: 'Why CAUTION got stricter', t: 'Because there are now more checks in the pool, the CAUTION bar was tightened: it needs score ≥ 4 AND at least 3 agreeing checks. That keeps the app from flooding you with weaker signals just because more tools are on.' },
          { h: 'A reading order that works', t: '① Higher-TF direction (Ichimoku cloud + ADX). ② Where price is (BB / Fib / VWAP). ③ Momentum (RSI + Stochastic). ④ Candle confirmation. ⑤ Risk % and levels written → Paper first.' },
          { h: 'Mistakes to avoid', t: 'Turning every indicator on and staring at a rainbow; using ADX as a direction (it is only strength); shorting only because Stochastic is >80 inside a bull run; ignoring that VWAP means different things on crypto vs FX.' },
          { h: 'Practice checklist', t: '① Bias from the cloud + ADX ② Location from BB / Fib / VWAP ③ Momentum from RSI + Stoch ④ Candle confirm ⑤ SL / TP written ⑥ Paper, then journal.' }
        ]
      },
      {
        id: 'elliott',
        title: '16 · Elliott Wave (light count)',
        summary: 'CPE includes a lightweight Elliott Wave counter. Tick “Elliott” in the Chart Lab indicator bar and it labels the last 0-1-2-3-4-5 impulse on the candles and projects a wave-5 Fibonacci target. It is a study tool — not a crystal ball.',
        lessons: [
          { h: 'The idea in one line', t: 'Markets move in waves: impulses (5 legs in the trend direction) and corrections (3 legs against it). CPE counts only the impulse, which is the part that carries the trend.' },
          { h: 'How CPE counts it', t: 'It finds the last swing pivots (3-bar fractals), alternates high / low, and tests the last 5–6 swings against the Elliott rules. If the shape fits, it draws the 0→5 labels (the still-running wave in yellow) and a W5 target line built from the wave-1 length × 1.618 measured off wave 4.' },
          { h: 'The rules it checks', t: 'Wave 2 does not pass the start of wave 1; wave 4 does not overlap wave 1’s territory; wave 3 is not the shortest of 1 / 3 / 5. When a rule fails it shows nothing — no forced count.' },
          { h: 'Bullish vs bearish', t: 'A rising 0-1-2-3-4-5 is a bullish impulse; the mirror image on the way down is bearish. The engine adds a small confirmation to the score on the wave’s side.' },
          { h: 'Live vs complete', t: 'A LIVE wave 5 (still running) reads as trend continuation. A COMPLETE impulse (0–5 finished) warns that the trend may be tiring — a correction often follows.' },
          { h: 'The W5 target line', t: 'A Fibonacci extension of wave 1 from the wave-4 low / high. It is a target idea, not a magnet — price can stop short of it or overshoot it.' },
          { h: 'How to use it', t: 'Treat the count as confluence: at a clear BB / Fib zone with a candle and RSI, an impulsive count adds conviction. On its own it is only a sketch.' },
          { h: 'Mistakes to avoid', t: 'Re-counting the waves until they fit your position (the classic Elliott sin); counting tiny wiggles; ignoring the higher-timeframe count; forgetting the count changes every time a new bar prints.' },
          { h: 'Practice checklist', t: '① Clear swings picked ② Rules pass ③ Zig-zag agrees with BB / Fib ④ Candle confirm ⑤ SL beyond the wave-4 invalidation point.' }
        ]
      },
      {
        id: 'forecast',
        title: '17 · 3-Month Forecast (the Forecast 3M tick)',
        summary: 'The long-horizon projector: how this chart is likely to form over the next ~3 months, built from the signal’s own trend, targets and volatility. Switch it on or off with the “Forecast 3M” tick in Chart Lab.',
        lessons: [
          { h: 'What it draws', t: 'A dashed centre path running from the analysed entry toward the best target the engine already knows (Elliott target → tp2 → tp1), wrapped in a widening “cone” that shows the spread of plausible prices. Month markers M+1 / M+2 / M+3 divide the horizon.' },
          { h: 'Why a cone and not a line', t: 'Nobody can know one exact future price. The cone widens with the square root of time and the pair’s own volatility, so a quiet FX pair gets a narrow cone and a wild altcoin a very wide one. That width IS the message: the further out you look, the less certain the price.' },
          { h: 'Where the numbers come from', t: 'The drift comes from the current signal target; the daily volatility comes from the signal’s ATR% scaled to one day so the cone means the same on a 5m or a 1d chart; EXTREME / HIGH volatility widens it further.' },
          { h: 'How to read it', t: 'Look at the SLOPE (which way the path leans) and the WIDTH (how much doubt). A rising path with a narrow cone = a steadier trend idea; a flat path with a huge cone = “no edge here, expect noise”.' },
          { h: 'Turning it on and off', t: 'The “Forecast 3M” button sits next to “Future space”. It needs Future space ON (the blank area on the right that the projection is drawn in). If the signal is HOLD there is no direction, so nothing is drawn.' },
          { h: 'It is the trend, not the trade', t: 'The forecast is a big-picture map. The actual trade levels — entry, TP1 / TP2, SL and the short-term projection — are still what you trade.' },
          { h: 'Honest limits', t: 'News, listings, delistings and macro shifts are not in the model; the path is a smooth drift, so real prices will wiggle far more; a 3-month cone is a study aid, never a promise.' },
          { h: 'Re-analyse often', t: 'As new candles print, the target, the volatility and therefore the whole cone update. A forecast is a snapshot, not a contract.' },
          { h: 'Practice checklist', t: '① Read the path direction ② Check the cone width ③ Compare with higher-TF structure ④ Size the position from the real SL, never from the cone.' }
        ]
      }
    ],
    platforms: {
      BINANCE: {
        title: 'Binance Trading A → Z',
        steps: [
          'Create account → enable 2FA.',
          'API Management → Create Key → Spot &/or Futures trade ON, Withdrawals OFF.',
          'Paste Key + Secret in CPE → API Keys → Binance → Save → Test Account.',
          'Use Spot Desk / Futures Desk scan (public charts work even before keys).',
          'Practice: Manual Trade → Start Paper Trade (no live money).',
          'Live: set TP1/TP2/SL + Trailing → Start Live Trade (needs API).',
          'Manage in Positions: edit levels, partial close, cancel auto.',
          'License: Trial 7d → 3-Month or Lifetime (owner prices in app).'
        ]
      },
      BYBIT: {
        title: 'Bybit Trading A → Z',
        steps: [
          'Account + 2FA.',
          'API Management → trade only, Withdrawals OFF.',
          'CPE → API Keys → Bybit → Save.',
          'Futures Desk for perps mindset; Chart Lab to study candles.',
          'Paper Trade first; Live after keys work.',
          'Trail TP+SL: BUY↑ / SELL↓.'
        ]
      },
      OKX: {
        title: 'OKX Trading A → Z',
        steps: [
          'API Key + Secret + Passphrase required.',
          'Withdrawals OFF always.',
          'Save all three fields in CPE Keys.',
          'Paper practice → small live size.',
          'Passphrase typos are the #1 fail — copy carefully.'
        ]
      },
      KUCOIN: {
        title: 'KuCoin Trading A → Z',
        steps: [
          'Key + Secret + Passphrase.',
          'Trade permission only.',
          'Paper in CPE → then live small.',
          'Use Spot/Futures desks for signals.'
        ]
      },
      BITGET: {
        title: 'Bitget Trading A → Z',
        steps: [
          'API with trade only.',
          'Paper then live.',
          'Futures: pick Cross or Isolated in Manual Trade.',
          'Trail TP+SL to lock profits.'
        ]
      },
      GATE: {
        title: 'Gate.io Trading A → Z',
        steps: [
          'Create API v4 keys (trade).',
          'Withdrawals OFF.',
          'Save in CPE → practice Paper.',
          'Scan + Chart Lab for entries before live.'
        ]
      },
      MEXC: {
        title: 'MEXC Trading A → Z',
        steps: [
          'Start Spot mindset.',
          'Keys in CPE API Keys.',
          'Paper → live.',
          'Use trail to lock open profit.'
        ]
      },
      KRAKEN: {
        title: 'Kraken Trading A → Z',
        steps: [
          'Generate key with trade permission only.',
          'No withdraw/funds rights.',
          'Paper practice in CPE.',
          'Verify every live order on Kraken too.'
        ]
      },
      COINBASE: {
        title: 'Coinbase Advanced A → Z',
        steps: [
          'Advanced Trade API keys.',
          'Spot-focused desk in CPE.',
          'Paper then live.',
          'Keep Withdrawals OFF.'
        ]
      },
      FOREX_OANDA: {
        title: 'Forex (OANDA) A → Z',
        steps: [
          'Open OANDA demo → risk ~1%.',
          'Personal access token + Account ID in CPE Keys.',
          'Forex Desk scan + Chart Lab (EURUSD…).',
          'Manual Trade → Paper with Forex platform.',
          'Live only after demo confidence.'
        ]
      },
      FOREX_FXCM: {
        title: 'FXCM Forex A → Z',
        steps: [
          'Broker API credentials.',
          'Paper in CPE first.',
          'Watch London/NY sessions & news spikes.',
          'Live after practice journal looks clean.'
        ]
      },
      FOREX_MT5: {
        title: 'MetaTrader 5 A → Z',
        steps: [
          'Login + server + password in CPE Keys.',
          'Prefer investor (read) password where possible.',
          'Practice lots 0.01.',
          'Paper in CPE; live via broker when ready.'
        ]
      },
      FOREX_DEMO: {
        title: 'Forex Demo Rates A → Z',
        steps: [
          'No API key required.',
          'Forex Desk + Chart Lab for free charts.',
          'Paper trades only (practice).',
          'When ready for a real broker, add OANDA / FXCM / MT5 keys for live.'
        ]
      }
    },
    forexAz: {
      title: 'Forex Trading A → Z (full class)',
      lessons: [
        { h: 'A — Account & risk', t: 'Demo first. Risk ~0.5–1% per idea. Never revenge trade.' },
        { h: 'B — Pairs', t: 'Majors (EURUSD, GBPUSD, USDJPY) before exotics.' },
        { h: 'C — Candles', t: 'Learn Doji, Hammer, Engulfing on Chart Lab Forex.' },
        { h: 'D — Daily bias', t: 'Check higher timeframe before 15m/30m entries.' },
        { h: 'E — Entries', t: 'BB lower bounce + candle confirm is a common practice setup.' },
        { h: 'F — Fib', t: '50% / 61.8% pullbacks often used as practice zones.' },
        { h: 'G — Goals (TP)', t: 'TP1 scale out, TP2 runner, trail SL.' },
        { h: 'H — Hours', t: 'London–NY overlap = more movement.' },
        { h: 'I — Indicators', t: 'RSI + MACD + BB together; avoid indicator overload.' },
        { h: 'J — Journal', t: 'Log every paper/live trade in CPE Journal.' },
        { h: 'K — Keys', t: 'Live forex broker needs API/token; demo rates need none.' },
        { h: 'L — Lots', t: 'Start 0.01 lots in practice mindset.' },
        { h: 'M — Mindset', t: 'Process over prediction. Skip bad days.' },
        { h: 'N — News', t: 'Check News & Tricks before big events.' },
        { h: 'O — Orders', t: 'Always set SL. Trailing protects open profit.' },
        { h: 'P — Practice', t: 'Paper Trade button = practice without live API.' },
        { h: 'Q — Quality', t: 'Fewer high-quality setups beat overtrading.' },
        { h: 'R — Risk:reward', t: 'Aim setups where reward ≥ risk when possible.' },
        { h: 'S — Sessions', t: 'Asia quieter; London/NY more active.' },
        { h: 'T — Trends', t: 'Trade with higher-TF trend when learning.' },
        { h: 'U — Updates', t: 'Watch CPE update banner + Live Help.' },
        { h: 'V — Volatility', t: 'Widen patience when ATR spikes.' },
        { h: 'W — Withdraw API', t: 'Never enable withdraw on any API key.' },
        { h: 'X — eXits', t: 'Partial TP + trail beats hoping.' },
        { h: 'Y — Your plan', t: 'Write rules; follow them in Manual/Auto.' },
        { h: 'Z — Zero rush', t: 'No FOMO. Practice → then live API.' }
      ]
    }
  },
  si: {
    intro: 'මුලින් Paper/DEMO. Candles, charts, BB/RSI/Fib, money, psychology — ඊට පසු Signals (BUY/SELL/HOLD කියන්නේ මොකද්ද + මොකද කරන්නේ) සහ Forex signals. Live ට නිවැරදි platform API key ඕන (Withdrawals OFF).',
    candles: [
      { shape: 'doji', name: 'Doji', color: '#94a3b8', bias: 'Neutral / wait', tip: 'Open ≈ close — තුනී body. Move එකකට පස්සේ indecision.', also: 'තව: FOMO එපා. ඊළඟ candle බලන්න. BB extreme + Doji = opinions squeeze; direction guess කලින් RSI slope බලන්න.' },
      { shape: 'hammer', name: 'Hammer', color: '#22c55e', bias: 'BUY bias', tip: 'ඉහළට කුඩා body, දිගු පහළ wick — drop එකකට පස්සේ buyers reject.', also: 'තව: SL wick low යට. Lower BB + RSI oversold ඉන් ඉහළට = හොඳ. Psychology: wick අවසන් වෙනකම් — mid-wick buy එපා.' },
      { shape: 'invhammer', name: 'Inverted Hammer', color: '#22c55e', bias: 'BUY (weak)', tip: 'පහළට දිගු ඉහළ wick. Confirm ඊළඟ green ඕන.', also: 'තව: Hammer තරම් ශක්තිමත් නැහැ — alert. Fib 61.8 + Inverted Hammer = study; entry confirm ඊට පස්සේ.' },
      { shape: 'shooting', name: 'Shooting Star', color: '#ef4444', bias: 'SELL bias', tip: 'පහළට body, දිගු ඉහළ wick — highs reject.', also: 'තව: SL wick high උඩ. Upper BB / Fib / RSI overbought එක්ක ශක්තිමත්. Last green chase එපා.' },
      { shape: 'hanging', name: 'Hanging Man', color: '#f59e0b', bias: 'SELL caution', tip: 'Hammer වගේ shape නමුත් rise එකකට පස්සේ — top exhaustion chance.', also: 'තව: context = හැමදේම. Top vs bottom journal කරන්න. Shape match වුණා කියලා reverse එපා — next candle + RSI.' },
      { shape: 'engulf_bull', name: 'Bullish Engulfing', color: '#22c55e', bias: 'BUY', tip: 'කොළ body පෙර රතු body මුළුමනින් cover.', also: 'තව: support / lower BB / Fib 50–61.8 එක්ක ශක්තිමත්. SL engulfing low. Body පුළුල් = SL පුළුල් = size කුඩා.' },
      { shape: 'engulf_bear', name: 'Bearish Engulfing', color: '#ef4444', bias: 'SELL', tip: 'රතු body පෙර කොළ cover.', also: 'තව: open longs ට caution. Upper BB + RSI>70. Long නම් hope නෙවෙයි — partial TP / trail.' },
      { shape: 'morning', name: 'Morning Star', color: '#22c55e', bias: 'BUY', tip: 'ලොකු රතු → කුඩා star → ලොකු කොළ. Bottom reversal.', also: 'තව: 3rd close ඊට පස්සේ entry. SL star low යට. BB lower + bullish RSI divergence එක්ක.' },
      { shape: 'evening', name: 'Evening Star', color: '#ef4444', bias: 'SELL', tip: 'ලොකු කොළ → star → ලොකු රතු. Top reversal.', also: 'තව: මැද star එකටම short එපා. 3rd close බලන්න. Upper BB / Fib. පළමු green FOMO ignore.' },
      { shape: 'maru_bull', name: 'Bull Marubozu', color: '#22c55e', bias: 'Strong BUY pressure', tip: 'දිගු කොළ body, wicks අඩු — buyers control.', also: 'තව: continuation clue; හැමවිටම bottom buy නෙවෙයි. Late Marubozu chase එපා — BB mid / Fib pullback බලන්න.' },
      { shape: 'maru_bear', name: 'Bear Marubozu', color: '#ef4444', bias: 'Strong SELL pressure', tip: 'දිගු රතු body — sellers control.', also: 'තව: falling knife catch එපා. පස්සේ BB/Fib + Hammer. ශක්තිමත් pressure = size අඩු හෝ aside.' },
      { shape: 'spin', name: 'Spinning Top', color: '#94a3b8', bias: 'Indecision', tip: 'කුඩා body + උඩ/යට wicks — දෙපැත්තම fight.', also: 'තව: BB squeeze ඇතුළේ බහුල. Flat valid. Break + direction candle බලන්න.' },
      { shape: 'pierce', name: 'Piercing Line', color: '#22c55e', bias: 'BUY', tip: 'රතු ඊට පස්සේ කොළ — prior red midpoint උඩ close.', also: 'තව: Engulfing තරම් ශක්තිමත් නැහැ. RSI turn එක්ක. හැම green එකක්ම සමාන නැහැ කියලා ඉගෙනගන්න.' },
      { shape: 'darkcloud', name: 'Dark Cloud Cover', color: '#ef4444', bias: 'SELL', tip: 'කොළ ඊට පස්සේ රතු — prior green midpoint යට close.', also: 'තව: Bear Engulfing ට කලින් warning. Longs partial / TP1. Full reversal ට කලින් scale out.' },
      { shape: 'soldiers', name: 'Three White Soldiers', color: '#22c55e', bias: 'BUY trend', tip: 'ඉහළට යන කොළ 3ක් — steady buying.', also: 'තව: Fib 38–50 / BB mid pullback practice. Greens 3කට පස්සේ overconfidence — risk % fixed.' },
      { shape: 'crows', name: 'Three Black Crows', color: '#ef4444', bias: 'SELL trend', tip: 'පහළට යන රතු 3ක් — steady selling.', also: 'තව: average down එපා. RSI oversold දිගටම ඉන්න පුළුවන්. Loss limit > hope.' },
      { shape: 'harami_bull', name: 'Bullish Harami', color: '#22c55e', bias: 'BUY (soft)', tip: 'ලොකු රතු ඇතුළේ කුඩා කොළ — selling shrink.', also: 'තව: early pause; confirm ඕන. RSI bullish divergence study. “Strength fading” කියවන්න ඉගෙනගන්න.' },
      { shape: 'harami_bear', name: 'Bearish Harami', color: '#ef4444', bias: 'SELL (soft)', tip: 'ලොකු කොළ ඇතුළේ කුඩා රතු — buying shrink.', also: 'තව: longs partial. Auto short නෙවෙයි. ලොකු green ඊට පස්සේ greed Harami ignore කරයි.' },
      { shape: 'tweezer_bot', name: 'Tweezer Bottom', color: '#22c55e', bias: 'BUY', tip: 'Lows ගැලපෙන candles 2ක් — support double test.', also: 'තව: ඒ low structure mark කරන්න. SL යට. Double Bottom එක්ක ඥාති. Same price twice reject = level respect.' },
      { shape: 'tweezer_top', name: 'Tweezer Top', color: '#ef4444', bias: 'SELL', tip: 'Highs ගැලපෙන 2ක් — resistance double test.', also: 'තව: Double Top cousin. RSI failure at highs. Level ලියලා ඉන්න — tip එකකට වඩා.' },
      { shape: 'longlegged', name: 'Long-Legged Doji', color: '#94a3b8', bias: 'Indecision', tip: 'ඉහළ/පහළ දිගු wicks දෙකක්, කුඩා body — දෙපැත්තම දැඩි නමුත් ජයක් නැහැ.', also: 'තව: Doji වර්ගවලින් වඩාත්ම “fight” එක පෙන්නන එක. Trend එකක මැද ආවොත් pause; extreme එකක ආවොත් reversal පිළිබඳ අනතුරු ඇඟවීමක්.' },
      { shape: 'dragonfly', name: 'Dragonfly Doji', color: '#22c55e', bias: 'BUY bias', tip: 'Open ≈ close (උඩම), දිගු පහළ wick — ගැඹුරට වැටුණු price එක ඉහළට ආපසු ගත්තා.', also: 'තව: පහළට reject වීම = buyers බලවත්. Lower BB / support එක්ක විශිෂ්ට. Confirm candle එකක් ඕන.' },
      { shape: 'gravestone', name: 'Gravestone Doji', color: '#ef4444', bias: 'SELL bias', tip: 'Open ≈ close (පහළම), දිගු ඉහළ wick — ඉහළට ගිය price එක ආපසු බිමට.', also: 'තව: ඉහළට reject වීම = sellers බලවත්. Upper BB / resistance එක්ක. Shooting Star පවුලේ සහෝදරයා.' },
      { shape: 'inside_bar', name: 'Inside Bar', color: '#94a3b8', bias: 'Squeeze / wait', tip: 'පෙර candle එකේ range එක ඇතුළේම range එකක් — energy එක compress වෙනවා.', also: 'තව: BB squeeze වගේ. Direction guess එපා — break + close බලන්න. Mother bar එකේ high/low = සීමා.' },
      { shape: 'outside_bar', name: 'Outside Bar', color: '#f0b429', bias: 'Breakout', tip: 'පෙර candle එකේ high+low දෙකම පසු කරන ලොකු candle — දැඩි expansion.', also: 'තව: දෙපැත්තම engulf. Breakout හෝ trap විය හැක — පසුව close එක කොහේද කියා බලන්න. Size අඩුවෙන් පටන් ගන්න.' },
      { shape: 'belt_bull', name: 'Bullish Belt Hold', color: '#22c55e', bias: 'BUY', tip: 'Support එකේදී wick අඩුවෙන් ඉහළට විවෘත වන දිගු කොළ candle — buyers කෙලින්ම control.', also: 'තව: පහළ wick නැති තරම් = buyers කිසිදා පරාජය වූයේ නැහැ. Downtrend එකකට පස්සේ ශක්තිමත්.' },
      { shape: 'belt_bear', name: 'Bearish Belt Hold', color: '#ef4444', bias: 'SELL', tip: 'Resistance එකේදී wick අඩුවෙන් පහළට විවෘත වන දිගු රතු candle — sellers කෙලින්ම control.', also: 'තව: Bullish Belt Hold මිරිවැටුම. Uptrend එකකට පස්සේ outcome බලන්න.' },
      { shape: 'kick_bull', name: 'Bullish Kicking', color: '#22c55e', bias: 'Strong BUY', tip: 'රතු Marubozu එකකට ඉහළින් gap එකක් සහිත කොළ Marubozu — මනෝභාවය එකවර පෙරළියක්.', also: 'තව: දුර්ලභ නමුත් ඉතා ශක්තිමත් (විශේෂයෙන් gap markets වල). දෙකම Marubozu = දෙපැත්තම තීරණාත්මක.' },
      { shape: 'kick_bear', name: 'Bearish Kicking', color: '#ef4444', bias: 'Strong SELL', tip: 'කොළ Marubozu එකකට පහළින් gap එකක් සහිත රතු Marubozu — විකුණුම් පෙරළියක්.', also: 'තව: Bullish Kicking මිරිවැටුම. Gap එකම signal එක — candle එකට වඩා.' },
      { shape: 'abandoned', name: 'Abandoned Baby', color: '#22c55e', bias: 'BUY reversal', tip: 'රතු → gap එකෙන් aloof තනි Doji → කොළ — star එක හුදෙකලාව ඉන්නවා.', also: 'තව: Morning Star එකේ දුර්ලභ, ශක්තිමත් කුලය. Gap එකම වැදගත් — crypto වල දුර්ලභ, forex/stocks වල බහුල.' },
      { shape: 'three_inside_up', name: 'Three Inside Up', color: '#22c55e', bias: 'BUY', tip: 'Bull Harami (රතු + කුඩා කොළ) ඊට පස්සේ කොළ confirm candle — buying shift නිශ්චිත.', also: 'තව: Harami එකට වඩා ශක්තිමත් (“confirm” candle එක ඇතුළත්). 3rd close බලන්න.' },
      { shape: 'three_inside_down', name: 'Three Inside Down', color: '#ef4444', bias: 'SELL', tip: 'Bear Harami (කොළ + කුඩා රතු) ඊට පස්සේ රතු confirm candle — selling shift නිශ්චිත.', also: 'තව: Bear Harami එකේ confirmed version. Longs partial / TP. Full reversal ට confirm ඕන.' },
      { shape: 'three_methods_bull', name: 'Rising Three Methods', color: '#22c55e', bias: 'BUY cont.', tip: 'ලොකු කොළ → කුඩා පහත් candles කිහිපයක් (1st body ඇතුළේ) → ලොකු කොළ.', also: 'තව: trend continuation. මැද කුඩා candles = rest එකක්; 5th candle තීරණය. Pullback buy practice.' },
      { shape: 'three_methods_bear', name: 'Falling Three Methods', color: '#ef4444', bias: 'SELL cont.', tip: 'ලොකු රතු → කුඩා ඉහළ candles කිහිපයක් (1st body ඇතුළේ) → ලොකු රතු.', also: 'තව: Bear continuation. මැද bounce = pause; break එක විශ්වාස කරන්න. පොඩි rally එකට නොරැවටෙන්න.' },
      { shape: 'tower_bot', name: 'Tower Bottom', color: '#22c55e', bias: 'BUY reversal', tip: 'දිගු රතු → කුඩා candles ගොඩක් → දිගු කොළ — flat base එකේදී මනෝභාවය පෙරළෙනවා.', also: 'තව: මැද flat කොටස = සටන; අවසන් candle = ජයග්‍රාහකයා. Teaches: bases වලට කාලය ගත වෙනවා.' },
      { shape: 'tower_top', name: 'Tower Top', color: '#ef4444', bias: 'SELL reversal', tip: 'දිගු කොළ → කුඩා candles ගොඩක් → දිගු රතු — buyers වෙහෙසට පත් වී sellers ගන්නවා.', also: 'තව: Tower Bottom මිරිවැටුම. base හැදෙන අතරතුර partial ගන්න. Teaches: tops කියන්නේ මොහොතක් නොව ක්‍රියාවලියක්.' }
    ],
    chartPatterns: [
      { shape: 'double_bot', name: 'Double Bottom (W)', color: '#22c55e', bias: 'BUY bias', tip: 'එකම අසල lows දෙකක්, මැද peak break — W.', also: 'තව: neckline break = trigger. Height එකෙන් TP idea. Tweezer + Fib. False break — close උඩ බලන්න.' },
      { shape: 'double_top', name: 'Double Top (M)', color: '#ef4444', bias: 'SELL bias', tip: 'Highs දෙකක්, මැද trough break — M.', also: 'තව: Tweezer Top විශාල scale. Neckline ට කලින් trail. 2nd top FOMO මිල අධිකයි.' },
      { shape: 'hs_top', name: 'Head & Shoulders', color: '#ef4444', bias: 'SELL bias', tip: 'Left shoulder, head, right shoulder; neckline පහළට break.', also: 'තව: distribution. Target ≈ head height. RSI divergence at head. Multi-swing patience.' },
      { shape: 'ihs', name: 'Inverse H&S', color: '#22c55e', bias: 'BUY bias', tip: 'පහළට upside-down H&S — neckline ඉහළට.', also: 'තව: accumulation. Right shoulder zone එකේ Morning Star confluence study.' },
      { shape: 'triangle', name: 'Triangle (squeeze)', color: '#f0b429', bias: 'Breakout wait', tip: 'Lower highs + higher lows — energy build.', also: 'තව: BB squeeze වගේ. ඇතුළේ direction guess එපා. Break + close. Direction දැනගත්තාම size.' },
      { shape: 'flag', name: 'Bull Flag', color: '#22c55e', bias: 'BUY cont.', tip: 'Sharp rise (pole) ඊට පස්සේ කුඩා channel — continuation.', also: 'තව: flag depth බොහෝ විට shallow Fib. Marubozu pole. Full extension ඊට පස්සේ late buy එපා.' },
      { shape: 'channel', name: 'Trend Channel', color: '#38bdf8', bias: 'With trend', tip: 'Parallel lines අතර price — swing tool.', also: 'තව: uptrend එකේ lower channel + Hammer; upper + Shooting Star. “Where” + “what candle”.' },
      { shape: 'support_res', name: 'Support & Resistance', color: '#a78bfa', bias: 'Context first', tip: 'නැවත නැවත react වන horizontal zones — හැම candle එකකටම යට map එක.', also: 'තව: S/R එකේ patterns ශක්තිමත්. Chart Lab එකේ zones කලින් draw කරන්න. Levels > random tips.' },
      { shape: 'triple_top', name: 'Triple Top', color: '#ef4444', bias: 'SELL bias', tip: 'එකම මිලකට ආසන්න highs 3ක් — buyers එකම බිත්තියකින් 3 වතාවක් පරාජය.', also: 'තව: Double Top එකට වඩා ශක්තිමත් (rejects 3ක් = stubborn supply). Neckline break = trigger; target ≈ pattern height. Teaches: level එකම බොස්.' },
      { shape: 'triple_bot', name: 'Triple Bottom', color: '#22c55e', bias: 'BUY bias', tip: 'එකම මිලකට ආසන්න lows 3ක් — sellers එකම තට්ටුවෙන් 3 වතාවක් පරාජය.', also: 'තව: Triple Top මිරිවැටුම. හැම touch එකක්ම Hammer / Tweezer study. Neckline break + close බලන්න.' },
      { shape: 'cup_handle', name: 'Cup & Handle', color: '#22c55e', bias: 'BUY cont.', tip: 'වටකුරු “U” (cup) ඊට පස්සේ කුඩා pullback (handle) — rest එකකින් පස්සේ continuation.', also: 'තව: breakout traders අතර ජනප්‍රිය. Handle එක shallow + කෙටි විය යුතුයි — ගැඹුරු handle = දුර්වල අත්. Handle break + confirm.' },
      { shape: 'rounding_bot', name: 'Rounding Bottom', color: '#22c55e', bias: 'BUY reversal', tip: 'සෙමින් හැඩගැසෙන “saucer” low — selling ක්‍රමයෙන් නැතිවී buyers ගන්නවා.', also: 'තව: slow-motion Double Bottom. කරුණ = sellers බලය අවසන්, single spike නොවේ — ඉවසීම අවශ්‍ය.' },
      { shape: 'rounding_top', name: 'Rounding Top', color: '#ef4444', bias: 'SELL reversal', tip: 'සෙමින් හැඩගැසෙන “dome” high — buying පහව ගිය පසු price පෙරළෙනවා.', also: 'තව: Rounding Bottom මිරිවැටුම. momentum නැතිවෙන අතර partial ගන්න. Teaches: tops මොහොතක් නොව ක්‍රියාවලියක්.' },
      { shape: 'rising_wedge', name: 'Rising Wedge', color: '#ef4444', bias: 'SELL bias', tip: 'rails දෙකම ඉහළට නමුත් එකට හැකිලෙනවා — buyers වෙහෙසට පත් වෙනවා.', also: 'තව: price තවම ඉහළට නිසා නරවටයි; හැකිලීමම සැබෑ clue. බොහෝ විට පහළට break. අන්තිම push එක chase එපා.' },
      { shape: 'falling_wedge', name: 'Falling Wedge', color: '#22c55e', bias: 'BUY bias', tip: 'rails දෙකම පහළට නමුත් එකට හැකිලෙනවා — sellers වෙහෙසට පත් වෙනවා.', also: 'තව: Rising Wedge මිරිවැටුම. බොහෝ විට ඉහළට break. Wedge tail එකේ Hammer = classic study. break + close බලන්න.' },
      { shape: 'asc_triangle', name: 'Ascending Triangle', color: '#f0b429', bias: 'BUY bias', tip: 'Flat ceiling + ඉහළ යන floor — buyers නිතරම fixed resistance එකට තල්ලු වෙනවා.', also: 'තව: එක් මිලකට pressure එකතු වෙනවා; ඉහළ break සාමාන්‍යයි. ceiling උඩ close එකේ entry. Teaches: buyers ඉවසීම නැති වෙනවා.' },
      { shape: 'desc_triangle', name: 'Descending Triangle', color: '#f0b429', bias: 'SELL bias', tip: 'Flat floor + පහළ යන ceiling — sellers නිතරම fixed support එකට තල්ලු වෙනවා.', also: 'තව: Ascending Triangle මිරිවැටුම. පහළ break සාමාන්‍යයි. floor යට close එකේ entry. Teaches: sellers බලය වැඩිවෙනවා.' },
      { shape: 'pennant', name: 'Pennant', color: '#22c55e', bias: 'Continuation', tip: 'දිගු pole ඊට පස්සේ කුඩා, තද triangle — trend එක නැවත යන්න කලින් කෙටි rest එකක්.', also: 'තව: Flag වගේ නමුත් කෙටි හා ත්‍රිකෝණාකාර. Target idea එකට pole එක මනින්න. කුඩා coil ඇතුළේ guess එපා.' },
      { shape: 'flag_bear', name: 'Bear Flag', color: '#ef4444', bias: 'SELL cont.', tip: 'දිගු drop (pole) ඊට පස්සේ කුඩා ඉහළ/පැත්තට channel — පසුව පහළට continuation.', also: 'තව: Bull Flag මිරිවැටුම. පොඩි bounce = pause, reversal නොවේ. Flag chase කරොත් නරකම මිලට buy — break බලන්න.' },
      { shape: 'rectangle', name: 'Rectangle (Range)', color: '#f0b429', bias: 'Range trade', tip: 'Flat ceiling සහ floor අතර price bounce වෙනවා — sideways box එකක්.', also: 'තව: ඇතුළේ edges fade කරන්න, පිටතට break එක trade කරන්න. BB squeeze බොහෝ විට rectangle ඇතුළේ. Teaches: level-to-level discipline.' },
      { shape: 'broadening', name: 'Broadening Formation', color: '#f0b429', bias: 'Caution', tip: 'Higher highs සහ lower lows — range එක හැකිලෙනවා වෙනුවට විහිදෙනවා.', also: 'තව: අවුල් සහගත, හැඟීම්බර වෙළඳපොළ. Stops දෙපැත්තෙන්ම වදිනවා. Size කුඩා හෝ aside; අවසානයේ දැඩි එක්-දිශා move එකක්.' },
      { shape: 'diamond', name: 'Diamond', color: '#f0b429', bias: 'Reversal', tip: 'මැද පළල, දෙකෙළවර පටු — classic topping / bottoming formation.', also: 'තව: Template වෙනස් වන Triangle එකක්. break direction තීරණය කරයි. දුර්ලභ හා සෙමි — ඉවසන්න.' },
      { shape: 'island_rev', name: 'Island Reversal', color: '#ef4444', bias: 'Reversal', tip: 'Price එක gap එකකින් ගිහින් තනි cluster එකක් trade කර ආපසු gap වෙනවා — “island” එකක්.', also: 'තව: සැබෑ gaps අවශ්‍ය (stocks/FX වල බහුල). Island එකේ හිරවුණු buyers/sellers. Signal එක = gaps, island candles නොවේ.' },
      { shape: 'breakaway_gap', name: 'Breakaway Gap', color: '#22c55e', bias: 'Trend start', tip: 'range/base එකකින් gap එකක් — squeeze එකක් නොව, බලයෙන් move එක පටන් ගන්නවා.', also: 'තව: exhaustion gap එකට වෙනස්ව move එකේ මුල ආරම්භයේ එනවා. පසුව gaps බොහෝ විට S/R ලෙස ක්‍රියා කරයි.' },
      { shape: 'v_reversal', name: 'V-Reversal', color: '#22c55e', bias: 'Reversal', tip: 'base එකක් නැතිව එකවර ඉහළට හැරෙන දැඩි free-fall එකක් — “V” එකක්.', also: 'තව: වේගවත් හා බියජනක; බොහෝ විට news මත. අල්ලන්න අමාරු, chase කරන්න ලේසි. spike එක buy නොකර කුඩා pullback + candle බලන්න.' },
      { shape: 'harmonic', name: 'Harmonic Pattern', color: '#f0b429', bias: 'Reversal zones', tip: 'හැම leg එකකටම Fibonacci ratio එකක් ඇති මනින ලද zig-zag (X-A-B-C-D) — “Gartley/Bat” වගේ map එකක්.', also: 'තව: advanced. D point = entry zone; එය ratios වලින් තීරණය වේ, හැඟීම් වලින් නොවේ. මුලින් plain Fib ප්‍රගුණ කරන්න; මෙය Fib එකේ ඊළඟ පියවර.' }
    ],
    modules: [
      {
        id: 'bb',
        title: '1 · Bollinger Bands (BB)',
        summary: 'Moving average එක වටේ volatility bands. Squeeze, walk-the-band, lower/upper touch + candle confirm — CPE practice හි ප්‍රධාන setup එක.',
        lessons: [
          { h: 'BB කියන්නේ මොකද්ද', t: 'Middle SMA (බොහෝ විට 20) + upper/lower bands (බොහෝ විට 2 std). Volatility ඉහළ යනකොට bands පුළුල් වෙයි; market නිශ්ශබ්ද නම් squeeze වෙයි.' },
          { h: 'Middle band', t: 'මැද රේඛාව = mean. ඊට ඉහළ = bullish pressure hint; පහළ = bearish. Magic buy/sell නෙවෙයි — dynamic bias line එකක්.' },
          { h: 'Lower band (BUY practice)', t: 'පහළට වැටුණාට පස්සේ lower band touch = “stretched down” වෙන්න පුළුවන්. හැම touch එකකටම buy එපා. Bullish candle (Hammer/Engulfing) + RSI ඉහළට හැරෙනකම් බලන්න.' },
          { h: 'Upper band (SELL / caution)', t: 'Upper band touch = “stretched up” වෙන්න පුළුවන්. Uptrend එකක price upper band එක්ක walk කරන්න පුළුවන්. SELL = bearish candle + ඉහළ TF weakness එක්ක විතරක්.' },
          { h: 'Squeeze', t: 'Bands තද = low volatility → ඊළඟට breakout එන්න පුළුවන්. Squeeze ඇතුළේ direction guess එපා; breakout + candle confirm බලන්න.' },
          { h: 'Walk the band', t: 'ශක්තිමත් trend එකක price බොහෝ candles upper (හෝ lower) band එක්ක යයි. ඒකට විරුද්ධව mean-reversion කරන එක beginner mistake එකක්.' },
          { h: 'BB + Chart Lab', t: 'CPE Chart Lab / desks DEMO එකෙන් BB + candles අධ්‍යයනය කරන්න. Practice: lower BB + Hammer → Paper Trade, SL wick යට, TP1 middle band වෙත.' },
          { h: 'BB + RSI combo', t: 'හොඳ filter: lower BB + RSI oversold (හෝ oversold ඉන් ඉහළට) + bullish candle. Short: upper BB + RSI overbought + bearish candle.' },
          { h: 'Stop placement', t: 'Long: SL swing low / lower wick යට. Short: SL swing high උඩ. BB trade එකක SL නැතුව entry එපා.' },
          { h: 'Targets', t: 'TP1 middle band, TP2 අනෙක් පැත්ත / trail. Scale out — මුළු move එක අවශ්‍ය නැහැ.' },
          { h: 'Timeframes', t: 'Bias ඉහළ TF (4H/1D). Entry 15m/30m BB + candle. Random TF මිශ්‍ර කිරීම = conflicting signals.' },
          { h: 'වැරදි', t: 'Crash එකක හැම lower touch ටම buy; moon-run එකක හැම upper ටම sell; SL නැතිව; news spike නිසා bands පුළුල් වෙනකොට rush.' },
          { h: 'Practice checklist', t: '① ඉහළ TF bias ② BB touch හෝ squeeze break ③ Candle confirm ④ RSI agree ⑤ Risk % ⑥ Paper ⑦ Journal.' }
        ]
      },
      {
        id: 'rsi',
        title: '2 · RSI (Relative Strength Index)',
        summary: 'Momentum oscillator 0–100. Default 14. BB + candles එක්ක භාවිතා කරන්න — RSI එකක් විතරකින් system එකක් නෙවෙයි.',
        lessons: [
          { h: 'RSI මැනන්නේ මොකද්ද', t: 'පසුගිය N bars වල gains vs losses compare කරයි. High RSI = bullish momentum; low = bearish. “Overbought = must sell” හැමදාම නෙවෙයි.' },
          { h: 'Classic zones', t: 'බොහෝ විට: 70+ overbought, 30− oversold. ශක්තිමත් trend එකක RSI දිගටම extreme එකේ ඉන්න පුළුවන් — ඒක normal.' },
          { h: 'Midline 50', t: 'RSI 50 උඩට cross = bullish support hint; 50 යට = bearish. BB middle එක්ක trend-filter විදිහට use කරන්න.' },
          { h: 'Bullish divergence', t: 'Price lower low, RSI higher low → downside momentum අඩු වෙයි. තවමත් candle + structure බලලා Paper entry.' },
          { h: 'Bearish divergence', t: 'Price higher high, RSI lower high → upside fade. Shooting Star / Engulfing + resistance / upper BB එක්ක confirm.' },
          { h: 'Failure swings', t: 'RSI prior extreme retest fail වෙලා 50 හරහා ආයෙත් — early momentum shift. Chart Lab structure එක්ක බලන්න.' },
          { h: 'RSI + BB (CPE style)', t: 'Long practice: lower BB, RSI ≤ 35 (හෝ ≤30 ඉන් ඉහළට), bullish candle. Short: upper BB, RSI ≥ 65–70, bearish candle.' },
          { h: 'Hidden divergence', t: 'Trend continuation clue. Advanced — කලින් classic divergence DEMO එකෙන් master කරන්න.' },
          { h: 'Settings', t: 'RSI(14) common default. Short RSI = noise වැඩි. Signal බලන්න settings හැමදාම මාරු කරන්න එපා.' },
          { h: 'Exits', t: 'Oversold ඉන් buy කළා නම් RSI mid/upper එනකොට partial TP හොඳයි. ඉතිරිය trail / BB middle එක්ක.' },
          { h: 'News & RSI', t: 'ලොකු news එකකින් RSI ක්ෂණිකව spike වෙයි. පළමු violent candle අවසන් වෙනකම් බලන්න.' },
          { h: 'වැරදි', t: 'Bull market එකක හැම RSI>70 ටම short; crash එකක හැම RSI<30 ටම long; confluence නැතුව; revenge re-entry.' },
          { h: 'Practice checklist', t: '① RSI value + slope ② BB location ③ Candle ④ ඉහළ TF ⑤ Paper + journal ⑥ එකවර එක idea.' }
        ]
      },
      {
        id: 'fib',
        title: '3 · Fibonacci (Retracement & Extension)',
        summary: 'පැහැදිලි swing high ↔ low ඉන් pullback/target මැනීම. 38.2 · 50 · 61.8 + BB/RSI confluence ඉහළ අවධානය.',
        lessons: [
          { h: 'Fib භාවිතා කරන්නේ ඇයි', t: 'බොහෝ traders එකම ratios බලන නිසා ඒ zones අසල reaction එන්න පුළුවන්. Fib = possible map — guarantee නෙවෙයි.' },
          { h: 'Swing points', t: 'පැහැදිලි swing low → high (up) හෝ high → low (down). නරක swings = නිකම් levels. Chart Lab DEMO එකෙන් swing pick practice කරන්න.' },
          { h: 'Key retracements', t: '23.6% shallow, 38.2%, 50% (බහුල), 61.8% golden, 78.6% deep. Deep retrace = trend weakness signal වෙන්න පුළුවන්.' },
          { h: 'Pullback buys (uptrend)', t: 'Impulse up ඊට පස්සේ 38.2–61.8 zone ට pullback + bullish candle + BB mid/lower හෝ RSI >40–45 hold.' },
          { h: 'Pullback sells (downtrend)', t: 'Impulse down ඊට පස්සේ 38.2–61.8 rally + bearish candle + RSI 55–60 යට fail.' },
          { h: 'Extensions / targets', t: '127.2%, 161.8% TP2 ideas. Trail එක්ක — exact tick force එපා.' },
          { h: 'Confluence = power', t: 'හොඳ zones: Fib 50/61.8 + BB + prior structure + RSI turn. Fib රේඛාවක් විතරක් weak.' },
          { h: 'Fib + BB', t: 'Uptrend එකක 61.8% lower BB අසල නම් high-quality Paper study zone. Candle confirm නැතුව entry එපා.' },
          { h: 'Multiple Fibs', t: 'Beginners = එක clean swing. Fibs 5ක් stack කරන එක = noise + FOMO.' },
          { h: 'Invalidation', t: 'Bias එකට විරුද්ධව 78.6% පැහැදිලිව break වුණොත් pullback thesis fail — exit හෝ stand aside.' },
          { h: 'Forex vs crypto', t: 'Ratios එකමයි. Majors liquid sessions වල cleaner; crypto wick ගහලා reverse වෙන්න පුළුවන් — size අඩුවෙන්.' },
          { h: 'වැරදි', t: 'කුඩා noise swings වල Fib; candle නැතුව mid-air entry; “almost held” කියලා SL ඈතට; ඉහළ TF ignore.' },
          { h: 'Practice checklist', t: '① Swing mark ② 38.2/50/61.8 ③ Price එනකම් බලන්න ④ Candle + RSI/BB ⑤ Risk ⑥ Paper → journal.' }
        ]
      },
      {
        id: 'money',
        title: '4 · Money Management',
        summary: 'භාවිතය: risk ප්‍රතිශතය ස්ථාවරයි. Size එක stop එකෙන් එනවා. ලාභයෙන් කොටසක් අරගෙන, දවසේ පාඩු සීමාවට පස්සේ නවත්වනවා. CPE manual සහ auto trade වලට මෙය යොදනවා.',
        lessons: [
          { h: 'Money management ඉලක්කය', t: 'Game එකේ ඉන්න. එක නරක trade එකකින් account අවසන් නොවිය යුතුයි. Consistency > lottery sizing.' },
          { h: 'ඇත්තටම භාවිත කරන විදිහ', t: 'පොදු ක්‍රමය fixed-fractional risk. කාසි ප්‍රමාණය කලින් තෝරන්නේ නැහැ. කලින් stop එක ලියනවා. මේ idea එකෙන් account එකෙන් 1%ක් විතරක් අහිමි වෙන්න පුළුවන් කියලා තීරණය කරනවා. ඊට පස්සේ size එක ඒකෙන් එනවා. Stop එක පළල් නම් position එක කුඩායි. Stop එක කෙටි නම් position එක ලොකුයි. ඩොලර් risk එක එකම වගේ. Money management tick එක on කළාම CPE යොදන්නේ මේ ක්‍රමය.' },
          { h: 'උදාහරණය ($1000 practice account)', t: 'Account $1000. Risk 1% = $10. Entry 100, stop 98. දුර = 2%. Size = 10 ÷ 0.02 = $500 notional. Stop එක වැදුණොත් පාඩුව $10ක් විතර. $500ක් නෙවෙයි. මිල 103 ගියොත් (risk එක මෙන් 1.5) ලාභය $15ක් විතර. හැම pair එකකම එකම අදහස: risk ඩොලර් 1% ආසන්නයි. කාසි ගණන වෙනස්.' },
          { h: 'Tick එකෙන් CPE මොකද කරන්නේ', t: 'Trade Now → Auto: “Use money management” tick කරන්න. Save Auto Config. ඊළඟ auto trade එක $1000 practice account එකක් සහ වැසුණු results එකතුවෙන් 1%ක් විතර risk කරනවා. Size එක ඒ signal එකේ entry සහ SL වලින්. Exchange අවම ප්‍රමාණයෙන් 1%ට වඩා risk වෙනවා නම් ඒ trade එක මඟ හරිනවා. දවසේ −2%ක් විතර ගියාම ඊළඟ දවස දක්වා අලුත් auto නවත්වනවා. විවෘත trade වල එකතුව 3%ක් විතරට සීමා වෙනවා. Manual Trade එකේත් ඒ tick එක තියෙනවා. Signal History එකේ සමාන $10 පරීක්ෂණය තියෙනවා. ඒ යට $1000 account එකකට 1% plan size එකත් පෙනෙනවා.' },
          { h: 'Partial ලාභය සහ trail', t: 'පළවෙනි ඉලක්කයේදී කොටසක් (බොහෝ විට අඩක්) අරගෙන ඉතිරිය trail කරනවා. Stop එක උඩට ගියාම ඉලක්කයත් උඩට යන්න පුළුවන්. ඒ නිසා ජයග්‍රාහකයෙක් පළවෙනි ඉලක්කයට වඩා ගෙවන්න පුළුවන්. මුල් idea එකේ risk එක වැඩි කරන්නේ නැහැ. Strong signal එකක් නිසා 5% risk කරන්නේ නැහැ. 1% එකමයි. වැඩි ලාභය එන්නේ trail එකෙන්.' },
          { h: 'දවසේ නැවතුම සහ විවෘත risk', t: 'දවස account එකෙන් 2%ක් විතර පහළ නම් අලුත් trade නවත්වනවා. 1% බැගින් විවෘත idea තුනක් නම් heat 3%ක් විතර. සම්බන්ධ කාසි පහක් එක ඔට්ටුවක්. වෙනම පහක් නෙවෙයි.' },
          { h: 'මේ ක්‍රමය ප්‍රතික්ෂේප කරන දේ', t: 'Martingale (පාඩුවට පස්සේ දෙගුණය) භාවිත නොවේ. ඇතුළු වූ පසු stop එක ඈතට ගෙනයාම භාවිත නොවේ. “හරියටම” signal එකකට සියල්ල දැමීම භාවිත නොවේ. වලංගු stop එකක් නැත්නම් size එකක් නැහැ. Trade එකක් නැහැ.' },
          { h: 'Risk per trade', t: 'පොදු නීතිය: එක idea එකකට equity එකෙන් ~0.5–1% විතරක් risk. DEMO එකේත් LIVE වගේම % habit practice කරන්න.' },
          { h: 'Position size formula', t: 'Size ≈ (Account × Risk%) ÷ (Entry − Stop distance). SL පුළුල් නම් size කුඩා. Size කලින් තෝරලා SL පස්සේ — එපා.' },
          { h: 'Risk : Reward', t: 'ඉගෙනගන්නකොට reward ≥ risk (උදා 1:1.5+) ideas. TP1 එකෙන් scale out කරලා runner “free risk” කරන්න.' },
          { h: 'Partial take-profit', t: 'CPE style: TP1 කොටසක් lock, TP2/trail ඉතිරිය. Partial = emotional panic අඩු.' },
          { h: 'Trailing TP + SL', t: 'BUY: price ඉහළ යනකොට levels ඉහළට trail. SELL: පහළට. Perfect exit call නැතුවත් open profit lock.' },
          { h: 'Daily / weekly loss limit', t: 'උදාහරණය: දවසට −2% ගියාම stop. Loss limit ඊට පස්සේ revenge session = account killer.' },
          { h: 'Spot sizing', t: 'Exchange min notional තියෙනවා. තවමත් risk% apply කරන්න. Min size එකෙන්ම risk වැඩි නම් trade skip.' },
          { h: 'Futures / leverage', t: 'Leverage = profit සහ loss දෙකම වැඩි. High leverage + wide SL = blown. ඉගෙනගන්නකොට low leverage; Isolated = per-position cap.' },
          { h: 'Correlation', t: 'BTC correlated alts 5ක් = ලොකු එක bet එකක්. Risk group විදිහට ගණන් කරන්න.' },
          { h: 'Fees & slippage', t: 'Tight scalp chart එකේ හොඳයි fees නිසා R:R කනවා. Costs දන්නකන් DEMO එකේ cleaner swings.' },
          { h: 'DEMO → LIVE', t: 'CPE DEMO (~3 months mindset): එකම journal rules, එකම %. LIVE පටන් ගන්නකොට පළමු සති DEMO size එකෙන් අඩක්.' },
          { h: 'API money safety', t: 'සෑම key එකකම Withdrawals OFF. Matching platform Test OK ඊට පසු LIVE. වැරදි platform secret = fail/danger.' },
          { h: 'වැරදි', t: 'Martingale; SL ඈතට ගෙනයාම; “sure” setup එකට all-in; min size vs risk ignore; daily stop නැතුව.' },
          { h: 'Practice checklist', t: '① Risk % ලියලා ② SL distance ඉන් size ③ TP1/TP2/trail plan ④ Max daily loss ⑤ Paper ⑥ Journal අවංකව.' }
        ]
      },
      {
        id: 'psych',
        title: '5 · Psychology for Trading',
        summary: 'BB/RSI/Fib skills real screen එකේ ජීවත් වෙන්නේ mindset නිසා. FOMO, revenge, overconfidence, fear — DEMO එකේ indicators වගේම train කරන්න.',
        lessons: [
          { h: 'Psychology ඇයි වැදගත්', t: 'පරිපූර්ණ BB+RSI plan එකත් early entry, SL skip, revenge නිසා fail වෙයි. Skill = system × discipline.' },
          { h: 'Process > prediction', t: 'අනාගතය predict කරන්න ඕන නැහැ. Rules execute කරන්න: setup → risk → manage → journal. Outcome වෙනස්; process controllable.' },
          { h: 'FOMO', t: 'Miss වෙයි කියලා බය = දුර BB/Fib zone ඉන් ඈතට chase. Rule: entry miss නම් ඊළඟ setup බලන්න. Chart Lab එකේ තවත් candle තියෙනවා.' },
          { h: 'Revenge trading', t: 'Loss එකකට පස්සේ “දැන් win කරගන්න” urge = account destroy. Cool-down අනිවාර්ය: walk, journal, checklist clean නම් විතරක් ඊළඟ trade.' },
          { h: 'Wins ඊට පස්සේ overconfidence', t: 'Wins 3ක් = size 5× නෙවෙයි. Risk % fixed. Winning streak එකේදී තමයි බොහෝ දෙනා money rules කඩන්නේ.' },
          { h: 'Losses ඊට පස්සේ fear', t: 'Red day එකකට පස්සේ හැම valid setup එකක්ම skip කරන එකත් bias. Plan එක trust කරන්න; ඕන නම් size අඩු කරන්න, process අත්හරින්න එපා.' },
          { h: 'Analysis paralysis', t: 'Indicators 10ක් disagree → freeze. CPE core: candles + BB + RSI (+ Fib). Tools ගණනට වඩා quality.' },
          { h: 'Tilt & news', t: 'News spike එකේ ලොකු red candle = adrenaline. Structure ආයෙත් හැදෙනකම් flat ඉන්න — ego ට action ඕන; plan ට patience ඕන.' },
          { h: 'Journal = therapy + data', t: 'CPE Journal එකේ emotion tags (FOMO, rush, calm). Feelings patterns PnL එකකට වඩා leaks පෙන්වයි.' },
          { h: 'Written rules', t: 'ලියලා නැත්නම් rule එකක් නෙවෙයි. උදා: “BB+candle+RSI විතරක්; risk 1%; −2% දවසට පස්සේ no trade; papers 20ක් DEMO.”' },
          { h: 'Environment', t: 'නින්ද, බඩගිනි, phone distraction decisions වෙනස් කරයි. වෙහෙසිලා size up එපා. Brain protect කරන්න.' },
          { h: 'Social noise', t: 'Telegram “signals” / hype plan කඩයි. Learning Class + ඔබේ journal > random tips. News & Tricks = context, orders නෙවෙයි.' },
          { h: 'Identity', t: '“මම checklist follow කරනවා” — “මම හරි වෙන්න ඕන” නෙවෙයි. Small risk එක්ක wrong වෙන එක normal; large risk එක්ක stubborn වෙන එක optional.' },
          { h: 'DEMO = gym', t: 'Emotions safely rehearse කරන්න DEMO/Paper. DEMO එකේ rules follow කරන්න බැරි නම් LIVE එකෙන් discipline magic එන්නේ නැහැ.' },
          { h: 'Practice checklist', t: '① Calm ද? ② Checklist complete ද? ③ Risk % same ද? ④ Revenge නොවේද? ⑤ Journal අවංකවද? කිසිම NO එකක් නම් → no trade.' }
        ]
      },
      {
        id: 'signals',
        title: '6 · CPE Signals — තේරුම සහ මොකද කරන්නේ',
        summary: 'Spot / Futures / Forex desks වල BUY · SELL · HOLD + score පෙනෙනවා. Engine එක සමාන අදහසක් — නමුත් order යන්නේ ඔබ API Keys එකේ save කළ platform එකට විතරයි. Signal එකක් ආවාම මොකද්ද / මොකද කරන්නේ මෙතනින්.',
        lessons: [
          { h: 'Signal එන හැටි', t: 'CPE = BB, RSI, Fib, candle, EMA cross, SMA50, MACD, momentum score කරයි. Score ≥ +3 = BUY. ≤ −3 = SELL. මැද = HOLD. Helper rating එකක් — profit promise නෙවෙයි.' },
          { h: 'BUY — තේරුම', t: 'Bullish confluence ශක්තිමත් (lower BB, RSI oversold, bullish candle, golden cross, Fib support ආදිය). TP1/TP2/SL row / Chart Lab / Trade Now එකේ පෙනෙනවා.' },
          { h: 'SELL — තේරුම', t: 'Bearish confluence ශක්තිමත්. Spot එකේ SELL = holdings sell / profit ගන්න; short = Futures/Forex වගේ market එකකට විතරක්.' },
          { h: 'HOLD — තේරුම', t: 'Score අඩු/මිශ්‍ර. Force trade එපා. Flat හරි. ★ watchlist + ඊළඟ පැහැදිලි signal බලන්න.' },
          { h: 'Score අංකය', t: '|score| වැඩි = tools එකඟතාව වැඩි. BUY +5 > BUY +3 — තවමත් Chart Lab candle confirm.' },
          { h: 'BB Lower board', t: 'Lower band අසල pairs — practice long candidates. Candle + RSI confirm නැතුව හැම touch එකකටම entry එපා.' },
          { h: 'Platform vs signal', t: 'Binance, Bybit, OKX, KuCoin, Bitget, Gate, MEXC, Kraken, Coinbase, OANDA, FXCM, MT5, Forex Demo — signal අදහස සමාන. Order යන්නේ තෝරපු platform API එකට විතරයි. Binance BUY එකකින් Bybit එකේ open නොවේ.' },
          { h: 'Crypto Spot', t: 'Binance Spot / Coinbase: BUY = coin මිලදී; SELL = sell. Min size (උදා ~$11). Leverage නැහැ.' },
          { h: 'Crypto Futures', t: 'Binance Futures / Bybit / OKX…: BUY = long; SELL = short. Cross/Isolated + leverage. Trail: BUY↑ / SELL↓.' },
          { h: 'Forex platforms', t: 'OANDA / FXCM / MT5 / Forex Demo: FX pairs වල BUY/SELL/HOLD. BUY = base මිලදී; lots (0.01). Sessions + news වැදගත්.' },
          { h: 'BUY ආවාම — මෙහෙම කරන්න', t: '① Row click → Why / candle / RSI. ② Chart Lab confirm. ③ DEMO: Trade Now → TP1/TP2/SL/trail → Paper. ④ ඒ platform Test OK ඊට පසු small LIVE. ⑤ Journal.' },
          { h: 'SELL ආවාම — මෙහෙම කරන්න', t: '① Spot long නම් TP / partial / trail සලකන්න. ② Futures/Forex short plan තිබේ නම් Chart Lab confirm → Paper/Live + SL. ③ Revenge size එපා.' },
          { h: 'HOLD ආවාම', t: 'අලුත් Manual entry එපා. Scan කරන්න. ★ watch. Open position තියෙනවා නම් trail විතරක් සලකන්න.' },
          { h: 'Auto Trade + signal', t: 'Auto BUY = BB Lower + strong score rules. කලින් DEMO Auto. LIVE Auto = real risk — Withdrawals OFF, small size.' },
          { h: 'Notifications', t: 'BUY Signal toast = desk එකට යන්න කියලා alert — automatic market order නෙවෙයි.' },
          { h: 'මොකද එපා', t: 'Chart නැතුව හැම BUY එකක්ම; වැරදි platform key; SL නැතුව; එක signal එකකට පස්සේ size ඉහළට; HOLD = “almost BUY” කියලා trade.' },
          { h: 'Quick card', t: 'Signal → Chart Lab → Risk % → TP1/TP2/SL → DEMO Paper → Journal → (පසුව) matching platform key එක්ක LIVE.' }
        ]
      },
      {
        id: 'forex_sig',
        title: '7 · Forex signals — තේරුම සහ මොකද කරන්නේ',
        summary: 'Forex Desk එකේත් BUY / SELL / HOLD. Crypto ට වඩා වෙනස්කම් සහ signal එකකින් Paper → broker දක්වා steps.',
        lessons: [
          { h: 'Forex Desk signals', t: 'EURUSD, GBPUSD, USDJPY… = BUY/SELL/HOLD + score. Row click = chart + psychology + levels.' },
          { h: 'Forex BUY', t: 'Base currency මිලදී (BUY EURUSD = EUR vs USD). Chart Lab Forex TF එකෙන් confirm.' },
          { h: 'Forex SELL', t: 'Base sell / short. SL structure / upper band අදහස උඩ.' },
          { h: 'Forex HOLD', t: 'Edge නැති — skip. NFP/CPI/central bank කලින් flat / HOLD හොඳයි.' },
          { h: 'Forex Demo Rates', t: 'API ඕන නැහැ. Charts + Paper practice. OANDA/FXCM/MT5 කලින් drills.' },
          { h: 'OANDA — signal → action', t: '① Desk signal. ② Chart Lab. ③ Keys → token + Account ID → Test. ④ Paper. ⑤ Live lots කුඩා + TP/SL/trail.' },
          { h: 'FXCM / MT5', t: 'Signal කියවීම එකමයි. Broker credentials API Keys එකේ. Test OK වෙනකම් Paper.' },
          { h: 'Sessions', t: 'London–NY overlap = majors වැඩි move. Asia quieter — HOLD normal.' },
          { h: 'Spread & news', t: 'News අවට spread පුළුල් — technical BUY එකත් fill නරක වෙන්න පුළුවන්. News & Tricks බලලා candle close බලන්න.' },
          { h: 'Lots vs crypto', t: 'Forex = lots. Risk % එකමයි: SL පුළුල් = lots කුඩා.' },
          { h: 'BB Lower Forex', t: 'Lower band + Hammer + RSI rising = practice long. ඉහළ TF bias (4H/Daily) confirm.' },
          { h: 'Forex BUY ආවාම', t: '① Why. ② ඉහළ TF OK ද? ③ SL mark. ④ Paper. ⑤ Broker ready නම් tiny + trail. ⑥ Journal (session + emotion).' },
          { h: 'Forex SELL ආවාම', t: '① News spike නෙවෙයිද? ② Bearish candle. ③ Paper short හෝ long close. ④ Short නම් trail↓. ⑤ Miss එකකට පස්සේ lot double එපා.' },
          { h: 'Crypto vs Forex', t: 'Crypto 24/7; Forex sessions. Crypto min $; Forex lots. Majors ඉගෙන ගන්න cleaner.' },
          { h: 'FX checklist', t: '① Major ද? ② Session? ③ News clear? ④ BUY/SELL (HOLD නෙවෙයි)? ⑤ Chart? ⑥ Risk %? ⑦ Paper → journal → broker key.' }
        ]
      },
      {
        id: 'fomo',
        title: '8 · FOMO සහ Emotional Discipline',
        summary: 'FOMO, revenge, greed, fear — account එක මරන ඇත්තම හේතු මේවා, indicators නෙවෙයි. Triggers, body signs, සහ impulse trades නවත්තන නියම rules ඉගෙන ගන්න.',
        lessons: [
          { h: 'FOMO කියන්නේ ඇත්තටම මොකද්ද', t: 'FOMO = දැනටමත් ඔබේ zone එකෙන් ගොඩක් දුර ගිය move එකක් miss වෙයි කියන fear. ඒක නිසා late entry, නරක price, SL නැතුව එනවා. ඔබ “miss” කරපු candle එක = information, loss එකක් නෙවෙයි.' },
          { h: 'FOMO triggers 3', t: '① chart එකේ ලොකු green/red candle එකක්. ② යාළුවෙක් හෝ Telegram post එකක profit screenshot. ③ News headline. Entry එකට කලින් trigger එක notice කරන්න.' },
          { h: 'Body signs', t: 'හදවත වේගයි, screen එකට ඇලෙනවා, “market buy now” click කරන්න හිතෙනවා, checklist skip වෙනවා. මේවා දැනුනොත් tab එක වහලා එක candle එකක් wait කරන්න.' },
          { h: '“දැනටමත් ගියා” rule', t: 'Price ඔබේ planned entry එකෙන් ~1 ATR එකකට වඩා ගිහින් නම් trade එක ගියා. BB mid / Fib pullback එකක් එනකම් wait කරන්න නැත්නම් skip. හැමදාම තව setup එකක් තියෙනවා.' },
          { h: 'Green candle trap', t: 'Plan නොකරපු Marubozu එකක් chase එකක්, entry එකක් නෙවෙයි. Late entries වල reward:risk අඩු — stop එක දුර නිසා.' },
          { h: 'Revenge trading', t: 'Loss එකකට පස්සේ “ආයෙ ගන්න ඕන” හිතෙනවා. Rule: loss එකකට පස්සේ 15–30 min අලුත් entry එපා, checklist clean නම් විතරයි. Market එක ඔබට ණයක් නෑ.' },
          { h: 'Trigger pull කරන්න fear', t: 'ප්‍රතිවිරුද්ධ problem: හොඳ setup එකක් දැකලා freeze වෙනවා. Tiny DEMO size එකක් use කරලා process එක prove කරන්න. Candle එනවට කලින් size decide කරන්න.' },
          { h: 'Wins ඊට පස්සේ greed', t: 'Green trade දෙකක් ආවම invincible හිතෙනවා → size double. අඩුම trades 20ක් risk % fix කරන්න; winning streaks revert වෙනවා.' },
          { h: 'Boredom trading', t: 'Flat එකත් position එකක්. A+ setup නැත්නම් “මොකක් හරි කරමු” කියලා entry එපා. Boredom trades = FOMO.' },
          { h: 'Screen-time discipline', t: 'දවසට scan windows දෙක තුනක් දාන්න, charts stare කරන්නෙ නැතුව. Decisions අඩු = impulse decisions අඩු.' },
          { h: 'Emotional journal', t: 'හැම trade එකකට calm / rushed / FOMO / revenge tag කරන්න. Trades 20කට පස්සේ ඔබේ leaks ලේසියෙන් පේනවා.' },
          { h: 'Reset ritual', t: 'Loss එකකට හෝ FOMO slip එකකට පස්සේ: නැගිටින්න, හුස්ම 10ක් slow ගන්න, මොකද වුණාද කියලා එක කොටසක් ලියන්න, ඊට පස්සේ පැයක් නවත්තන්න නැත්නම් භාගයක් size එකෙන් කරන්න.' },
          { h: 'Practice checklist', t: '① Body calm ද? ② Trigger දැක්කද? ③ Setup මගේ zone එකේද? ④ SL කලින් ලිව්වද? ⑤ Risk % වෙනස් නැද්ද? ⑥ Revenge නෙවෙයිද? NO නම් → trade එපා.' }
        ]
      },
      {
        id: 'risk_deep',
        title: '9 · Risk සහ Money Management (ගැඹුරු)',
        summary: 'Account එක ජීවත් කරන math: fixed-fractional sizing, R-multiples, drawdown maths, correlation heat, daily stop. Trading එක numbers වලින් business එකක් කරන්න.',
        lessons: [
          { h: 'Fixed-fractional risk', t: 'එක idea එකකට equity එකෙන් fix % එකක් (0.5–1%) risk කරන්න. Size = stop distance එකේ ප්‍රතිඵලය, කලින් choose කරන්නේ නෑ. Wide SL → small size; tight SL → large size; dollar risk නොවෙනස්.' },
          { h: 'Sizing formula', t: 'Size = (Equity × Risk%) ÷ |Entry − Stop|. උදා: $1000 × 1% = $10 risk. Entry 100, stop 98 → distance 2% → size 10 ÷ 0.02 = $500 notional.' },
          { h: 'R-multiples වලින් හිතන්න', t: 'Dollars වෙනුවට R වලින් හිතන්න. එකකට 1R risk. 2R winner එකක් losses දෙකක් cover කරනවා. Trades 20ක average R track කරන්න — ඒක ඔබේ ඇත්ත edge එක, win rate එක නෙවෙයි.' },
          { h: 'Reward : risk', t: 'Entry එකට කලින් අඩුම 1.5R potential බලන්න. ඊට අඩු නම් skip කරන්න, win rate ගොඩක් ඉහළ නම් මිස.' },
          { h: 'Drawdown maths', t: '−50% drawdown එකක් recover කරන්න +100% ඕන. Losing streaks normal — 60% win-rate system එකකත් 5+ losses පේළියක් එනවා. Small risk එකෙන් streak එක survive කරන්න.' },
          { h: 'Daily stop', t: 'Hard rule: දවසේ −2% equity (නැත්නම් පේළියට losses 2–3) නම් අලුත් trades නවත්තන්න. Limit එකට පස්සේ revenge sessions = account killers.' },
          { h: 'Weekly සහ monthly limits', t: 'Week (උදා −5%) සහ month එකත් cap කරන්න. Hit නම් DEMO ට ගිහින් journal review කරන්න, පිරිසිදු run එකකට පස්සේ විතරයි size අලුතෙන් ගන්න.' },
          { h: 'Open heat', t: 'Open trades හැම එකකම මුළු risk ~3% හෝ ඊට අඩුවෙන් තියන්න. Correlated alts 5ක් = එක bet එකක්, පහක් නෙවෙයි — ඒවා එකට count කරන්න.' },
          { h: 'Spot sizing', t: 'Spot ට exchange minimum notional තියෙනවා. Minimum එකෙන් ඔබේ 1% ට වඩා risk වෙනවා නම් trade එක skip කරන්න — risk එක round up කරන්න එපා.' },
          { h: 'Futures sizing', t: 'Leverage margin වෙනස් කරනවා, risk නෙවෙයි. Risk = Entry − Stop × size. ඉගෙන ගන්නකොට leverage අඩු, Isolated margin prefer කරන්න.' },
          { h: 'Forex sizing', t: 'Risk = lots × pip-value × stop-pips. Lots වලට solve කරන්න. උදා: 0.01 lot ≈ $0.10/pip; 20-pip stop එකකින් $1000 වල 1% ($10) risk → 10 ÷ 0.10 ÷ 20 = 0.05 lots.' },
          { h: 'Scaling out', t: 'TP1 එකේ ~50% ගන්න එතකොට ඉතිරිය free risk. ඊට පස්සේ trail කරන්න. හොඳ trade එකක් low-stress runner එකක් වෙනවා.' },
          { h: 'Compounding vs fixed', t: 'දැනට තියෙන equity එකෙන් fix % එකක් risk කරන්න (compounding). All-time-high account size එකට risk එක fix කරන්න එපා.' },
          { h: 'Fees සහ slippage R එකේ', t: 'Fees R එකෙන් අඩු කරන්න. 0.5% scalp එකකට 0.2% fee එකක් එද්දී edge එක මැකෙනවා — cleaner swings prefer කරන්න.' },
          { h: '“No stop, no trade” law', t: 'Logical stop එකක් define කරන්න බැරි නම් risk දන්නේ නෑ, ඉතින් size නෑ, ඉතින් trade නෑ.' },
          { h: 'Anti-martingale', t: 'Loss එකකට පස්සේ size double කරන්න එපා. Proven process එකක profitable, disciplined weeks කිහිපයකට පස්සේ විතරයි size වැඩි කරන්න — ඒකත් හිමින්.' },
          { h: 'Practice checklist', t: '① Equity දන්නවා ② Risk % ලියලා ③ Stop define ④ Size stop එකෙන් ⑤ Reward ≥ 1.5R ⑥ Daily stop දන්නවා ⑦ Correlated heat count.' }
        ]
      },
      {
        id: 'sl_tp',
        title: '10 · Stop Loss සහ Take Profit පාලනය',
        summary: 'Market එක ඔබව වැරදි කියලා ඔප්පු කරන තැනට SL තියන්න, profit එක පියවරෙන් ගන්න, stop එක trail කරන්න — CPE multi-TP + trailing SL එකෙන් කරන්නේ මේකයි.',
        lessons: [
          { h: 'SL = decision, number නෙවෙයි', t: 'Stop එක තියන්න idea එක වැරදි වෙන තැනට (swing low / wick / structure යට), random dollar distance එකකට නෙවෙයි. “මෙතනට ගියොත් මගේ reason එක වැරදි” කියන information එකක් ඔබ ගන්නවා.' },
          { h: 'Structure stops', t: 'Long: SL swing low හෝ lower-band wick ට ටිකක් යට. Short: swing high ට ටිකක් උඩ. Spread සහ wick noise එකට ~0.1–0.3% buffer එකක් දෙන්න.' },
          { h: 'Volatility stops', t: 'Wider markets වලට wider stops ඕන. ATR හෝ wick length එකෙන් stop size කරන්න, ඊට පස්සේ dollar risk එක නොවෙනස් වෙන්න position එක කුඩා කරන්න.' },
          { h: 'Fixed-dollar SL fail වෙන්නේ ඇයි', t: 'BTC එකේ $10 stop එකක් සහ EURUSD වල $10 stop එකක් සම්පූර්ණයෙන් වෙනස් risk. Distance % වලින් තියෙන්න ඕන, dollars වලින් නෙවෙයි.' },
          { h: 'Anti stop-hunt buffer', t: 'CPE එක wick touch එකක් ignore කරනවා: consecutive breaches දෙකක් + කුඩා buffer (0.15%) තියෙනකොට විතරයි close කරන්නේ. Noise එකෙන් stop hunt වෙන එක නවත්තනවා.' },
          { h: 'Take profit පියවරෙන්', t: 'Price එකකද 100% වහන්න එපා. Scale out: TP1 ටිකක් book කරන්න, TP2 / trail ඉතිරිය ride කරන්න — ලොකු move එකක් losers ගොඩක් ගෙවනවා.' },
          { h: 'Multi-TP levels', t: 'CPE එකේ ඕන තරම් TP level දාන්න පුළුවන්, හැම එකකටම close %. උදා: TP1 40%, TP2 30%, TP3 30% — නැත්නම් TP1 අරන් ඉතිරිය trail කරන්න.' },
          { h: 'Stop trail කිරීම', t: 'TP1 ට පස්සේ stop එක breakeven ට; TP2 ට පස්සේ TP1 ට. Stop එක price එක පිටිපස්සෙන් යන්න දෙන්න — open profit protect වෙනවා, runner එකත් යනවා.' },
          { h: 'Trail % තෝරන විදිහ', t: 'Tight trail ඉක්මනට lock කරනවා නමුත් කලින් exit වෙනවා; wide trail හුස්ම ගන්නවා නමුත් ටිකක් return කරනවා. Crypto වලට ~1–2% කින් පටන් අරන් Positions edit modal එකෙන් tune කරන්න.' },
          { h: 'Runners', t: 'ශක්තිමත් trend එකක price band එක්ක walk කරනකොට target එක ලොකු කර trail කරන්න, TP2 එකේ ඔක්කොම ගන්න එපා. එක trade එකකින් සතියක් ගෙවන්න පුළුවන්.' },
          { h: 'Partial-close buttons', t: 'Positions වල 50% / 100% close buttons manual පාලනයට, නැත්නම් Auto Close එකෙන් plan එකට TP / SL manage කරන්න දෙන්න.' },
          { h: 'Breakeven trap', t: 'TP1 ට කලින් stop එක breakeven ට ගන්න එපා — normal pullback වලින් හොඳ trades වලින් එළියට විසි වෙනවා.' },
          { h: 'Losing stop එක දුර යවන්න එපා', t: '“Room දෙමු” කියලා SL එක දුර යවන එක නිසා කුඩා losses account killers වෙනවා. Entry එකට කලින් දාපු stop එක තමයි stop එක.' },
          { h: 'Time stop', t: 'Trade එකක් candles ගණනක් තිස්සේ මොකුත් නොකර, ඊට හොඳ setup එකක් එනවා නම්, flat වහලා risk එක අලුතෙන් deploy කිරීම valid exit එකක්.' },
          { h: 'Practice checklist', t: '① SL invalidation එකේ, random නෙවෙයි ② Wicks වලට buffer ③ TP1 partial plan ④ TP1 ට පස්සේ trail ⑤ SL කවදාවත් දුර යවන්නෙ නෑ ⑥ Winner එක run කරන්න දෙන්න.' }
        ]
      },
      {
        id: 'plan_journal',
        title: '11 · Trade Plan සහ Journaling',
        summary: 'ලියපු plan එකක් trading එක gambling එකෙන් process එකකට හරවනවා. One-page plan, pre-trade checklist, සහ ඔබේ leaks පේන විදිහට journal කරන ක්‍රමය ඉගෙන ගන්න.',
        lessons: [
          { h: 'Plan එකක් ලියන්නේ ඇයි', t: 'ලියලා නැත්නම් rule එකක් නෑ. Plan එකක් stress එකේ live decision-making අයින් කරලා results measure කරන්න පුළුවන් කරනවා.' },
          { h: 'One-page plan', t: 'Pair, market, setup (BB + RSI + candle + Fib zone), direction, entry, SL, TP1 / TP2, size (SL එකෙන්), max daily loss. Line එකක් හිස් නම් → trade එපා.' },
          { h: 'Pre-trade checklist', t: 'ඉහළ TF bias? · Setup මගේ zone එකේද? · Candle confirm? · RSI agree? · SL ලියලා? · Risk %? · Reward ≥ 1.5R? · Calm? ඔක්කොම yes → trade.' },
          { h: 'Pre-session routine', t: 'ඉහළ TF, key levels, news බලන්න. අද watch pairs දෙක තුනක් candle එක explode වෙන්න කලින් ලියන්න — පස්සේ නෙවෙයි.' },
          { h: 'Journal කරන්නේ මොකද', t: 'Symbol, side, entry, exit, size, R, reason, timeframe, session, සහ emotion tag. CPE Journal P/L සහ reasons auto save කරනවා; ඔබේ notes add කරන්න.' },
          { h: 'WHY එක journal කරන්න', t: 'දැකපු දේ (setup) සහ දැනුණු දේ (calm / FOMO / rushed) ලියන්න. Context නැති outcome එකකින් මොකුත් ඉගෙන ගන්න බෑ.' },
          { h: 'Wins නෙවෙයි R track කරන්න', t: 'එකම win rate එක තියෙන දෙන්නෙක්ට විපරීත results තියෙන්න පුළුවන්. Average R සහ maximum drawdown, win % ට වඩා වැදගත්.' },
          { h: 'Screenshot habit', t: 'හැම trade එකකට කලින් සහ පස්සේ chart එක save කරන්න. Screenshots 20ක් review කරද්දී ඔබේ edge සහ leaks indicators වලට වඩා ඉක්මනට පේනවා.' },
          { h: 'Weekly review', t: 'සතියකට වරක්: trades count, average R, හොඳම සහ නරකම setup, rule breaks. ඊළඟ සතියට fix කරන්න එක leak එකක් තෝරන්න.' },
          { h: 'Leaks tag කරන්න', t: 'Tags: late entry, no SL, oversized, moved SL, revenge, boredom. Tag එකක් repeat වෙනවා නම් ඒක hard rule එකක් කරන්න.' },
          { h: 'Log කරන්න එපා දේ', t: 'Winners විතරක් log කරන්න එපා. Losses තමයි data. Winners විතරක් තියෙන journal එකක් brochure එකක්, journal එකක් නෙවෙයි.' },
          { h: 'DEMO → LIVE පියවර plan කරන්න', t: 'DEMO එකේ set trades ගණනක් positive average R එකක් එක්ක prove කරන්න, ඊට පස්සේ real money risk කරන්න — ඒකත් half size එකකින්.' },
          { h: 'Practice checklist', t: '① Entry එකට කලින් plan ලියන්න ② Checklist pass ③ Journal + emotion ④ Weekly review ⑤ එක leak fix.' }
        ]
      },
      {
        id: 'leverage',
        title: '12 · Leverage, Margin සහ Liquidation',
        summary: 'Leverage profit එක වගේම loss එකත් ගුණ කරනවා. Margin, liquidation, isolated vs cross margin, සහ එක trade එකකින් account එක මරන්න නොදෙන ආරක්ෂිත rules ඉගෙන ගන්න.',
        lessons: [
          { h: 'Leverage කියන්නේ මොකද්ද', t: 'Leverage එකෙන් අඩු margin එකකින් ලොකු position එකක් control කරන්න පුළුවන්. Profit වගේම loss වැඩි වෙනවා — edge එක වැඩි වෙන්නේ නෑ.' },
          { h: 'Margin vs risk', t: 'Margin = exchange එක lock කරන deposit එක. Risk = Entry − Stop × size. Leverage margin එක වෙනස් කරනවා, dollar risk එක නෙවෙයි.' },
          { h: 'Liquidation', t: 'Losses margin එක කාලා දැම්මොත් exchange එක position එක force-close කරනවා (liquidation) — බොහෝ විට හොඳම නොවන අවස්ථාවේ. Stop එක liquidation price එකෙන් බොහෝ දුර තියන්න.' },
          { h: 'Isolated vs Cross', t: 'Isolated එක එක position එකේ margin එකට loss එක cap කරනවා. Cross මුළු wallet balance එකම use කරනවා — beginners ට අනතුරුදායක. Isolated prefer කරන්න.' },
          { h: 'Safer leverage', t: 'Low leverage (2–5x) + හොඳ stop එකක්, stop නැති 50x එකකට වඩා ගොඩක් safe. ඔබව protect කරන්නේ stop එක, leverage number එක නෙවෙයි.' },
          { h: 'Liquidation-distance rule', t: 'SL එක liquidation price එකෙන් බොහෝ ඇතුළටද තියෙන්නේ බලන්න. ඒවා ළඟ නම්, හොඳ space එකක් එනකම් size අඩු කරන්න.' },
          { h: 'Leverage නරක entry එකක් හදන්නේ නෑ', t: 'නරක entry එකකට high leverage = ඉක්මනට loss. කලින් setup එක හදන්න, ඊට පස්සේ size කරන්න.' },
          { h: 'Funding සහ fees', t: 'Perpetual futures කාලයක් තිස්සේ funding charge කරනවා. Leveraged perps දිගටම hold කරනකොට funding එකෙන් හානි වෙනවා — size/time පරෙස්සම් වෙන්න තව හේතුවක්.' },
          { h: 'Spot vs Futures', t: 'Spot එක liquidate කරන්න බෑ (coin එක ඔබේ). Futures එක liquidate කරන්න පුළුවන්, බිංදුවට යන්නත් පුළුවන්. Futures use කරන්නේ ලියපු plan + Isolated margin එක්ක විතරයි.' },
          { h: 'Leverage යටතේ sizing', t: 'Size = stop distance එකෙන්, ඊට පස්සේ margin එක affordable ද බලන්න. කවදාවත් leverage කලින් තෝරන්න එපා.' },
          { h: '“One trade” test', t: 'Entry එකට කලින් අහන්න: මේක stop hit වුණොත් හුස්මක් ගන්න පුළුවන්ද, නැත්නම් disaster එකක්ද? Shrug එකක් නෙවෙයි නම් size එක වැඩියි.' },
          { h: 'Practice checklist', t: '① Isolated set ② Low leverage ③ SL liquidation price ඇතුළේ ④ Size stop එකෙන් ⑤ මෙතන full loss එකක් දරගන්න පුළුවන්ද? yes → trade.' }
        ]
      },
      {
        id: 'practice',
        title: '13 · Practice Routine සහ Backtesting',
        summary: 'DEMO එකේ skill හදන්නේ LIVE ට කලින්. Repeatable practice loop, charts scroll කරලා “backtest”, සහ real money ට safe විදිහට graduate වෙන ක්‍රමය ඉගෙන ගන්න.',
        lessons: [
          { h: 'DEMO = gym', t: 'Paper / DEMO තියෙන්නේ process එක සහ emotions zero risk එකෙන් rehearse කරන්න. DEMO එකේ rules follow කරන්න බැරි නම් LIVE එකෙන් හදන්නේ නෑ.' },
          { h: 'Practice loop', t: 'Setup එකක් තෝරන්න (උදා BB lower + Hammer + RSI turn). Chart එකේ historical examples 20ක් mark කරන්න. Entry / SL / TP define කරන්න. Result එක record කරන්න. ආයෙත් කරන්න.' },
          { h: 'Manual backtesting', t: 'Chart Lab එකේ ආපස්සට scroll කරන්න, future එක hide කරන්න, හැම signal එකක් අතින් mark කරන්න. Pattern recognition train වෙනවා, ඔබව රවට්ටන්න දෙන්නෙ නෑ.' },
          { h: 'Sample size', t: 'Trades 10ක් නම් මොකුත් කියන්නෙ නෑ. Setup එකක් judge කරන්න කලින් recorded trades 30–50ක් ඉලක්ක කරන්න.' },
          { h: 'Forward test on DEMO', t: 'අතින් mark කරපු පස්සේ, ඒ setup එකම software signals එක්ක DEMO එකේ සති දෙකේ සිට හතරක් run කරන්න. Real fills සහ emotions backtest එකට compare කරන්න.' },
          { h: 'එකවර එක setup', t: 'Systems 5ක් එකවර test කරන්න එපා. Edge එකක් master කරන්න, ඊට පස්සේ දෙවැන්න add කරන්න.' },
          { h: 'Routine එක කුඩා කරන්න', t: 'දිනකට මිනිත්තු 20ක routine එකක් (scan, mark, journal, review) random chart-staring පැය 6කට වඩා හොඳ.' },
          { h: 'LIVE ට graduate', t: 'Criteria: DEMO trades 30+ ට positive average R, rules follow, revenge episodes නෑ. ඊට පස්සේ LIVE half size එකෙන් පටන් අරන් හිමින් scale කරන්න.' },
          { h: 'Scale-up rule', t: 'Profitable සහ disciplined සති set ගණනකට පස්සේ විතරයි size වැඩි කරන්න — එක ලොකු win එකකට පස්සේ නෙවෙයි.' },
          { h: 'Step back කරන්න කවදාද', t: 'Daily හෝ weekly loss limit hit, නැත්නම් rule breaks repeat → DEMO ට ආපහු ගිහින් දිගටම කරන්න කලින් discipline ආයෙ හදන්න.' },
          { h: 'Process metrics', t: 'Log කරන්න: checklist pass-rate, rule-breaks per week, average R. මේවා එක P/L number එකකට වඩා growth predict කරනවා.' },
          { h: 'CPE practice path', t: 'Learning Class → Chart Lab (setups mark) → Paper Trade → Journal review → Signal desks DEMO එකේ → matching platform key එකෙන් small LIVE.' },
          { h: 'Practice checklist', t: '① Setup එකක් තෝරන්න ② Examples 30ක් mark ③ DEMO forward test ④ Journal + review ⑤ Positive R → half-size LIVE.' }
        ]
      },
      {
        id: 'volatility',
        title: '14 · Volatility සහ Martingale',
        summary: 'Market volatility (මිල වෙනස් වෙන්නේ ඇයි) කියවන ආකාරය, එය සෑම signal එකකටම reason line එකක් ලෙස add වන ආකාරය, සහ optional Martingale ladder එක වැඩ කරන ආකාරය — නොසැලකිල්ලෙන් පාවිච්චි කළොත් account එක ඉක්මනින්ම නැති කරන හේතුවත් සමඟ.',
        lessons: [
          { h: 'Volatility කියන්නේ මොකක්ද', t: 'Volatility කියන්නේ මිල කොච්චර වෙනස් වෙනවද කියන එක — කොයි පැත්තටද කියන එක නෙවෙයි. High volatility = ලොකු candles + ඉක්මන් swings. Low volatility = නිශ්ශබ්ද, පටු range එකක්. එකම setup එකට මේ දෙකේ reliability ගොඩක් වෙනස්.' },
          { h: 'CPE volatility reading එක', t: 'දැන් සෑම signal එකක්ම සාමාන්‍ය candle range එකයි Bollinger band පළලයි මනිනවා, ඊට පස්සේ ඒ pair එකේම මෑත normal එකට compare කරනවා. ඔබට LOW / NORMAL / HIGH / EXTREME සහ සරල භාෂාවෙන් reason line එකක් ලැබෙනවා — market වෙනස් වීමට හේතුව, signal එකත් එක්කම පෙන්වනවා.' },
          { h: 'EXTREME volatility = downgrade', t: 'Tape එක EXTREME වුණාම, අලුත් STRONG signal එකක් CAUTION ට downgrade වෙනවා (හේතුව පෙන්වනවා). Whipsaw market එකක එකම pattern එක ගොඩක් වැඩිපුර fail වෙනවා — fake breaks සහ stop-hunt wicks එදාට සාමාන්‍යයි.' },
          { h: 'HIGH / EXTREME වලදී කරන්න ඕන දේ', t: 'Size අඩු කරන්න. Stop එක ඈතට තියන්න. Trades අඩු කරන්න. Mid-candle spike එකක් නෙවෙයි, complete වුණු candle එකක් එනකම් ඉන්න. Reading එක EXTREME නම්, setup එක entry එකක් නෙවෙයි — study zone එකක් විදිහට සලකන්න.' },
          { h: 'Martingale කියන්නේ මොකක්ද', t: 'Martingale කියන්නේ losing position එකකට add කරලා average entry එක පහත දාන එක: හැම adverse move එකකට පස්සේ තව order එකක් — සාමාන්‍යයෙන් ලොකු (1x, 2x, 4x …) — add කරනවා. ගොඩක් වෙලාවට දිනනවා, ඊට පස්සේ එක නරක run එකකින් සියල්ල නැති කරනවා.' },
          { h: 'CPE Martingale rule එක', t: 'CPE extra order එකක් add කරන්නේ මේ දෙකම සත්‍ය වුණොත් විතරයි: (1) මිල trade එකට විරුද්ධව අඩුම තරමින් step × rung % ක් ගිහින්, සහ (2) ඒ pair එකට තවම අලුත් එකම පැත්තේ signal එකක් තියෙනවා නම්. මිල බැස්ස නිසා විතරක් කවදාවත් add කරන්නේ නෑ.' },
          { h: 'Numbers හතර', t: 'Step % = හැම add එකකට කලින් ඕන adverse move එක. Multiplier = හැම add එකක size එක base එකට සාපේක්ෂව (1 = flat, 2 = double). Max adds = extra orders වලට hard limit එක. Ladder risk cap % = මුළු ladder එකේම risk එක equity එකෙන් % ක් ලෙස. මේ හතරම ඔබ තෝරන්න.' },
          { h: 'Hard cap එක ඔබව රකිනවා', t: 'ලොකු multiplier එකක් සහ adds ගොඩක් තිබුණත්, ladder එකේ මුළු risk එක ඔබේ cap % එක පහු කරන්න යනවා නම් CPE order එක refuse කරනවා. ඒ වගේම exchange minimum size එකයි daily −2% stop එකයි respect කරනවා.' },
          { h: 'කොහෙද run වෙන්නේ', t: 'ඒ trade එකම manage කරන්න Manual එකේ tick කරන්න, නැත්නම් Auto session එකකට ඒකේ auto trades manage කරන්න tick කරන්න. DEMO සහ LIVE දෙකටම. Manual එකේදී pair එක scan list එකේ තියෙන්න ඕන — එවිට අලුත් එකම පැත්තේ signal එකක් කියවන්න පුළුවන්.' },
          { h: 'Cap එක ඇයි වැදගත් (උදාහරණය)', t: 'Step 1%, multiplier 2, 1%-risk base එකකට adds තුනක්: risk 1% → 2% → 4% → 8% වෙනවා. අන්තිම rung එකේ එක full stop-out එකක් winners ගොඩක් මකනවා. ඒ නිසයි cap එක තියෙන්නේ, සහ default numbers කුඩා වෙන්නේ.' },
          { h: 'Anti-martingale විකල්පය', t: 'Pros ගොඩක් විරුද්ධ දේ කරනවා: දිනන ඒවට විතරක් add කරලා, පැරදෙන ඒවා ඉක්මනට cut කරනවා. ඒක දැනෙන්න නරක (losses කුඩා ඒවා වැඩි), නමුත් විරුද්ධ trend එකකින් එක පාරටම account එක blow up කරන්න බෑ.' },
          { h: 'Risk එක ඉවර වෙන්නේ නෑ', t: 'Averaging down එකෙන් risk ඉවර වෙන්නේ නෑ — “losses කුඩා ගොඩක්” කියන එක “එක ලොකු loss එකක්” බවට මාරු කරනවා. නැති කරන්න බැරි සල්ලිවලින් කවදාවත් add කරන්න එපා, සහ losing trade එකක් “recover” කරන්න cap එක off කරන්නත් එපා.' },
          { h: 'Practice path', t: 'Volatility reading එක මුලින්ම DEMO එකේ ඉගෙන ගන්න. Martingale එක max adds 1–2 සහ කුඩා multiplier එකක් එක්ක DEMO එකේ trades 30+ ක් try කරන්න. හැම ladder එකක්ම Journal කරන්න, ඊට පස්සේ තීරණය කරන්න — traders ගොඩක්ට flat / anti-martingale ක්‍රමය safer.' },
          { h: 'Volatility + Martingale checklist', t: '① මුලින්ම volatility level එක කියවන්න ② EXTREME වලදී skip/කුඩා කරන්න ③ Martingale අලුත් එකම පැත්තේ signal එකක් එක්ක විතරයි ④ Step × rung ලඟා වුණාද ⑤ Risk cap එක යටතේද → add. ඕනෑම “no” එකක් → add නෑ.' }
        ]
      },
      {
        id: 'lab_indicators',
        title: '15 · Chart Lab Indicators (Stoch · ADX · Ichimoku · VWAP)',
        summary: 'Chart Lab එකේ දැන් සම්පූර්ණ indicator bar එකක් තියෙනවා — හැම button එකක්ම on/off tick එකක්, click කළාම chart එක එසැණින් redraw වෙනවා. BB / RSI / MACD / EMA / SMA50 / Volume වලට අමතරව දැන් Stochastic, ADX/DMI, Ichimoku සහ VWAP තියෙනවා — සහ signal engine එකත් ඒවා කියවනවා, chart එකේ විතරක් නෙවෙයි.',
        lessons: [
          { h: 'Bar එක කොහෙද', t: 'Chart Lab → chart එක යට “Indicators” button පේළිය. එක click එකකින් indicator එකක් on වෙනවා, ආයෙ click කළාම off වෙනවා; chart එක එසැණින් redraw වෙනවා. මේ ticks chart එකට විතරක් නෙවෙයි, signal engine එකටත් feed වෙනවා.' },
          { h: 'Stochastic (14,3,3)', t: 'Candles යට ඇඳෙන %K / %D oscillator, 0–100 පරාසය. ~80ට උඩ = overbought zone, ~20ට යට = oversold zone. Oversold zone එකේ %K එක %D එක හරහා උඩට cross වීම bullish study එකක්; උඩින් පහළට cross වීම bearish. ශක්තිමත් trend එකක එය එක කෙළවරක ගොඩක් වෙලා pin වෙලා ඉන්න පුළුවන් — හැමවිටම BB සහ candle එක්ක combine කරන්න.' },
          { h: 'ADX / DMI (14)', t: 'ADX මනින්නේ trend එකේ ශක්තිය, දිශාව නෙවෙයි. ~25ට උඩ = ඇත්ත trend එකක් යනවා; ~20ට යට = කැළඹිලි සහිත range එකක්. +DI, −DI ට වඩා උඩ = buyers සක්‍රීය; −DI උඩ = sellers සක්‍රීය. Trend-trade කරන්නද නැත්නම් නිකම් ඉන්නද කියලා තීරණය කරන්න ADX පාවිච්චි කරන්න.' },
          { h: 'Ichimoku Cloud (9,26,52)', t: 'Tenkan (වේගවත් line), Kijun (මන්දගාමී line) සහ Senkou cloud එක. මිල ඉහළ යන cloud එකකට උඩ = bullish පසුබිම; පහළ යන cloud එකකට යට = bearish. Cloud එක ඇතුළේ Tenkan/Kijun cross දුර්වල; මිල cloud එකෙන් පිටවෙන cross වඩා ශක්තිමත්. Cloud එකේ කෙළවර බොහෝ විට support / resistance ලෙස ක්‍රියා කරනවා.' },
          { h: 'VWAP', t: 'Volume-Weighted Average Price — volume එකෙන් weight කළ සාමාන්‍ය මිල, session එකකට වරක් reset වෙනවා. ලොකු institutions තමන්ගේ fills මේකට benchmark කරනවා. ඉහළ යන VWAP එකකට උඩ මිල = buyers පාලනයේ; downtrend එකක VWAP එකේදී පිරිසිදු rejection එකක් short study එකක්. 24/7 crypto වල එය FX වලට වඩා වෙනස් ලෙස reset වෙනවා — නීතියක් නෙවෙයි, guide line එකක් විදිහට ගන්න.' },
          { h: 'Engine එක මේවා පාවිච්චි කරන විදිහ', t: 'සෑම අලුත් indicator එකක්ම එය යන පැත්තට කුඩා confirmation එකක් score එකට එකතු කරනවා (Stochastic, Ichimoku, VWAP, දිශාවට එකඟ වුණාම ADX, සහ Elliott). ඒවා confirmations, triggers නෙවෙයි — BB / RSI / candle එක්ක එකඟ නොවුණොත් score එක වඩා මිශ්‍ර වෙලා HOLD වැඩි වෙනවා.' },
          { h: 'CAUTION ඇයි දැඩි වුණේ', t: 'දැන් checks පොකුරේ වැඩි නිසා CAUTION bar එක දැඩි කළා: score ≥ 4 සහ අඩුම තරමින් එකඟ checks 3ක් ඕන. ඒ නිසා tools වැඩි නිසා විතරක් දුර්වල signals වලින් app එක පිරෙන්නේ නෑ.' },
          { h: 'වැඩ කරන කියවීමේ පිළිවෙළ', t: '① ඉහළ TF දිශාව (Ichimoku cloud + ADX). ② මිල තියෙන තැන (BB / Fib / VWAP). ③ Momentum (RSI + Stochastic). ④ Candle confirmation. ⑤ Risk % සහ levels ලියලා → මුලින්ම Paper.' },
          { h: 'වළකින්න ඕන වැරදි', t: 'හැම indicator එකක්ම on කරලා දේදුන්නක් බලන එක; ADX දිශාවක් විදිහට ගන්න එක (එය ශක්තිය විතරයි); bull run එකක Stochastic >80 නිසා විතරක් short කරන එක; crypto සහ FX වල VWAP එකේ අර්ථය වෙනස් බව අමතක කරන එක.' },
          { h: 'Practice checklist', t: '① Cloud + ADX එකෙන් bias ② BB / Fib / VWAP එකෙන් location ③ RSI + Stoch එකෙන් momentum ④ Candle confirm ⑤ SL / TP ලියන්න ⑥ Paper, ඊට පස්සේ journal.' }
        ]
      },
      {
        id: 'elliott',
        title: '16 · Elliott Wave (light count)',
        summary: 'CPE එකේ lightweight Elliott Wave counter එකක් තියෙනවා. Chart Lab indicator bar එකේ “Elliott” tick කරන්න — එවිට අවසන් 0-1-2-3-4-5 impulse එක candles මත label වෙලා, wave-5 Fibonacci target එකක් project කරනවා. මෙය study tool එකක් — කිසිසේත් crystal ball එකක් නෙවෙයි.',
        lessons: [
          { h: 'අදහස එක පේළියකින්', t: 'Market යනවා waves වලින්: impulses (trend දිශාවට legs 5ක්) සහ corrections (විරුද්ධ පැත්තට legs 3ක්). CPE count කරන්නේ impulse එක විතරයි — trend එක උසුලන කොටස ඒක.' },
          { h: 'CPE එය count කරන විදිහ', t: 'එය අවසන් swing pivots (3-bar fractals) හොයාගෙන, high / low මාරු කරමින්, අවසන් swings 5–6 Elliott නීති වලට එකඟද කියලා test කරනවා. Shape එක ගැළපුනොත් 0→5 labels (තවම යන wave එක කහ පාටින්) සහ wave-1 දිග × 1.618, wave 4 එකෙන් මනින ලද W5 target line එක අඳිනවා.' },
          { h: 'එය බලන නීති', t: 'Wave 2, wave 1 ආරම්භය පහු නොකරයි; wave 4, wave 1 හි ප්‍රදේශය overlap නොකරයි; wave 3, 1 / 3 / 5 අතරින් කෙටිම එක නොවේ. නීතියක් fail වුණොත් එය කිසිවක් පෙන්වන්නේ නෑ — බලෙන් count එකක් දාන්නේ නෑ.' },
          { h: 'Bullish සහ bearish', t: 'ඉහළ යන 0-1-2-3-4-5 එක bullish impulse එකක්; පහළ යන කැඩපත bearish. Engine එක wave එකේ පැත්තට කුඩා confirmation එකක් score එකට එකතු කරනවා.' },
          { h: 'Live සහ complete', t: 'LIVE wave 5 (තවම යන) එක trend continuation එකක් ලෙස කියවෙනවා. COMPLETE impulse එකක් (0–5 ඉවර) trend එක වෙහෙසට පත්වෙන්න පුළුවන් බව අනතුරු අඟවනවා — බොහෝ විට correction එකක් එනවා.' },
          { h: 'W5 target line එක', t: 'Wave-4 low / high එකෙන් wave 1 හි Fibonacci extension එකක්. එය target අදහසක්, magnet එකක් නෙවෙයි — මිල ඒකට නොපැමිණ නවතින්නත්, පහු කරන්නත් පුළුවන්.' },
          { h: 'එය පාවිච්චි කරන විදිහ', t: 'Count එක confluence එකක් විදිහට ගන්න: පැහැදිලි BB / Fib zone එකක candle එකක් සහ RSI එක්ක තියෙද්දී impulsive count එකක් විශ්වාසය වැඩි කරනවා. ඒක විතරක් නම් එය sketch එකක් පමණයි.' },
          { h: 'වළකින්න ඕන වැරදි', t: 'ඔබේ position එකට ගැළපෙනකම් waves නැවත නැවත count කරන එක (Elliott වල classic පාපය); කුඩා wiggles count කරන එක; ඉහළ timeframe count එක අමතක කරන එක; අලුත් bar එකක් print වෙන හැම වතාවකම count එක වෙනස් වන බව අමතක වන එක.' },
          { h: 'Practice checklist', t: '① පැහැදිලි swings තෝරන්න ② නීති pass වෙනවද ③ Zig-zag BB / Fib එක්ක එකඟද ④ Candle confirm ⑤ Wave-4 invalidation එකට එහායින් SL.' }
        ]
      },
      {
        id: 'forecast',
        title: '17 · 3-Month Forecast (Forecast 3M tick එක)',
        summary: 'Long-horizon projector එක: මේ chart එක ඉදිරි මාස ~3ක් තුළ හැදෙන්න පුළුවන් විදිහ, signal එකේම trend, targets සහ volatility එකෙන් ගොඩනගනවා. Chart Lab එකේ “Forecast 3M” tick එකෙන් on/off කරන්න.',
        lessons: [
          { h: 'මොකද අඳින්නේ', t: 'Analyze කළ entry එකේ සිට engine එක දන්නා හොඳම target එක දක්වා (Elliott target → tp2 → tp1) යන dashed centre path එකක්, සහ විය හැකි මිල පරාසය පෙන්වන පළල් වන “cone” එකක්. M+1 / M+2 / M+3 මාස සලකුණු horizon එක බෙදනවා.' },
          { h: 'Line එකක් නෙවෙයි cone එකක් ඇයි', t: 'නිශ්චිත අනාගත මිලක් කිසිවෙකුට දැනගන්න බෑ. Cone එකේ පළල කාලයේ වර්ගමූලය සහ pair එකේම volatility එකෙන් වැඩිවෙනවා — ඒ නිසා නිශ්ශබ්ද FX pair එකකට පටු cone එකක්, කැළඹිලි සහිත altcoin එකකට ගොඩක් පළල් එකක් ලැබෙනවා. ඒ පළල තමයි පණිවිඩය: කොච්චර දුර බැලුවත්, ඒ තරම් අවිනිශ්චිත.' },
          { h: 'Numbers එන්නේ කොහෙන්ද', t: 'Drift එක එන්නේ දැන් තියෙන signal target එකෙන්; daily volatility එක එන්නේ signal එකේ ATR% එක දවසකට scale කරලා — ඒ නිසා 5m හෝ 1d chart දෙකේම cone එකේ අර්ථය එකයි; EXTREME / HIGH volatility වලදී තව පළල් වෙනවා.' },
          { h: 'කියවන විදිහ', t: 'SLOPE එක බලන්න (path එක කොයි පැත්තට නැඹුරුද) සහ WIDTH එක බලන්න (කොච්චර සැකයක්ද). ඉහළ යන path එකක් + පටු cone = තරමක් ස්ථිර trend අදහසක්; flat path එකක් + ලොකු cone = “මෙතන edge එකක් නෑ, noise බලාපොරොත්තු වෙන්න”.' },
          { h: 'On / off කරන විදිහ', t: '“Forecast 3M” button එක “Future space” එක ළඟම තියෙනවා. ඒකට “Future space” ON වෙන්න ඕන (projection එක අඳින දකුණු පැත්තේ හිස් තැන). Signal එක HOLD නම් දිශාවක් නෑ, ඒ නිසා කිසිවක් අඳින්නේ නෑ.' },
          { h: 'ඒක trend එක, trade එක නෙවෙයි', t: 'Forecast එක ලොකු පින්තූරේ map එකක්. ඇත්තට trade කරන levels — entry, TP1 / TP2, SL සහ කෙටි කාලීන projection — ඒවා තමයි ඔබ trade කරන්නේ.' },
          { h: 'අවංක සීමා', t: 'News, listings, delistings සහ macro වෙනස්කම් model එකේ නෑ; path එක smooth drift එකක්, ඒ නිසා ඇත්ත මිල ගොඩක් wiggle වෙනවා; මාස 3ක cone එක study උපකාරයක්, කවදාවත් පොරොන්දුවක් නෙවෙයි.' },
          { h: 'නිතර නිතර re-analyse කරන්න', t: 'අලුත් candles print වෙද්දී target එක, volatility එක සහ ඒ නිසා මුළු cone එකම update වෙනවා. Forecast එක snapshot එකක්, contract එකක් නෙවෙයි.' },
          { h: 'Practice checklist', t: '① Path එකේ දිශාව කියවන්න ② Cone එකේ පළල බලන්න ③ ඉහළ TF structure එක්ක සසඳන්න ④ Position size එක ඇත්ත SL එකෙන් ගන්න, කවදාවත් cone එකෙන් නෙවෙයි.' }
        ]
      }
    ],
    platforms: {
      BINANCE: {
        title: 'Binance Trading A → Z',
        steps: [
          'Account + 2FA.',
          'API Key: Spot/Futures ON, Withdrawals OFF.',
          'CPE → API Keys → Binance → Save → Test.',
          'Spot/Futures Desk scan (charts keys නැතුවත් public data).',
          'Practice: Start Paper Trade.',
          'Live: TP/SL/Trail + Start Live (API ඕන).',
          'Positions වලින් edit / partial close.',
          'License: Trial 7 → මාස 3 හෝ Lifetime (app එකේ owner prices).'
        ]
      },
      BYBIT: {
        title: 'Bybit A → Z',
        steps: ['Trade-only API, Withdrawals OFF.', 'CPE Keys → Bybit.', 'Paper → live.', 'Futures Desk + trail TP+SL.']
      },
      OKX: {
        title: 'OKX A → Z',
        steps: ['Key + Secret + Passphrase.', 'Withdrawals OFF.', 'Paper → live.', 'Passphrase නිවැරදිව copy කරන්න.']
      },
      KUCOIN: {
        title: 'KuCoin A → Z',
        steps: ['Key + Secret + Passphrase.', 'Paper කලින්.', 'පස්සේ small live.']
      },
      BITGET: {
        title: 'Bitget A → Z',
        steps: ['Trade API only.', 'Paper → live.', 'Futures: Cross/Isolated.']
      },
      GATE: { title: 'Gate.io A → Z', steps: ['API v4.', 'Paper practice.', 'Chart Lab entries.'] },
      MEXC: { title: 'MEXC A → Z', steps: ['Spot කලින්.', 'Keys save.', 'Trail profits.'] },
      KRAKEN: { title: 'Kraken A → Z', steps: ['Trade only.', 'Paper.', 'Live order verify.'] },
      COINBASE: { title: 'Coinbase A → Z', steps: ['Advanced Trade API.', 'Spot focus.', 'Paper → live.'] },
      FOREX_DEMO: {
        title: 'Forex Demo A → Z',
        steps: ['API ඕන නැහැ.', 'Forex Desk + Chart Lab practice.', 'Paper trades.', 'Live සඳහා OANDA/FXCM/MT5 keys.']
      },
      FOREX_OANDA: {
        title: 'OANDA Forex A → Z',
        steps: ['Demo risk 1%.', 'Token + Account ID.', 'Forex Desk + Chart Lab.', 'Paper → live.']
      },
      FOREX_FXCM: {
        title: 'FXCM A → Z',
        steps: ['Broker API.', 'Paper CPE එකෙන්.', 'Sessions + news බලන්න.']
      },
      FOREX_MT5: {
        title: 'MT5 A → Z',
        steps: ['Login + server + password.', 'Lots 0.01 practice.', 'Paper → live.']
      }
    },
    forexAz: {
      title: 'Forex Trading A → Z (සම්පූර්ණ class)',
      lessons: [
        { h: 'A — Account & risk', t: 'Demo මුලින්. Risk ~0.5–1% per idea. Revenge trade එපා.' },
        { h: 'B — Pairs', t: 'Majors (EURUSD, GBPUSD, USDJPY) කලින් — exotics පස්සේ.' },
        { h: 'C — Candles', t: 'Doji, Hammer, Engulfing — Chart Lab Forex වලින්.' },
        { h: 'D — Daily bias', t: 'ඉහළ TF බලලා 15m/30m entry.' },
        { h: 'E — Entries', t: 'BB lower bounce + candle confirm = practice setup.' },
        { h: 'F — Fib', t: '50% / 61.8% pullback zones practice.' },
        { h: 'G — Goals (TP)', t: 'TP1 scale, TP2 runner, trail SL.' },
        { h: 'H — Hours', t: 'London–NY overlap = වැඩි movement.' },
        { h: 'I — Indicators', t: 'RSI + MACD + BB; overload එපා.' },
        { h: 'J — Journal', t: 'සෑම paper/live trade එකක් Journal ට.' },
        { h: 'K — Keys', t: 'Live broker = API/token; Forex Demo = key නැතුව.' },
        { h: 'L — Lots', t: 'Practice mindset එකෙන් 0.01 lots.' },
        { h: 'M — Mindset', t: 'Process > prediction. නරක දවස skip.' },
        { h: 'N — News', t: 'ලොකු events කලින් News & Tricks බලන්න.' },
        { h: 'O — Orders', t: 'සැමවිටම SL. Trailing = profit lock.' },
        { h: 'P — Practice', t: 'Paper Trade = API නැතුව practice.' },
        { h: 'Q — Quality', t: 'අඩු quality setups වඩා හොඳ setups.' },
        { h: 'R — Risk:reward', t: 'Reward ≥ risk setups තෝරන්න.' },
        { h: 'S — Sessions', t: 'Asia quieter; London/NY active.' },
        { h: 'T — Trends', t: 'ඉහළ TF trend සමඟ ඉගෙන ගන්න.' },
        { h: 'U — Updates', t: 'CPE update banner + Live Help බලන්න.' },
        { h: 'V — Volatility', t: 'ATR spike වෙද්දී patience.' },
        { h: 'W — Withdraw API', t: 'කිසිම API එකක withdraw ON එපා.' },
        { h: 'X — eXits', t: 'Partial TP + trail > hope.' },
        { h: 'Y — Your plan', t: 'Rules ලියලා Manual/Auto එකෙන් follow.' },
        { h: 'Z — Zero rush', t: 'FOMO එපා. Practice → ඊට පසු live API.' }
      ]
    }
  }
};

window.CPE_getLearn = function (lang) {
  const code = String(lang || 'en').toLowerCase().split('-')[0];
  const en = window.CPE_LEARN.en;
  // Full Learning Class packs: en + si (other UI langs fall back to English lessons for now)
  const pack = window.CPE_LEARN[code] || en;
  const useSi = code === 'si' && window.CPE_LEARN.si;
  const src = useSi ? window.CPE_LEARN.si : pack;
  return {
    ...en,
    ...src,
    candles: (src.candles && src.candles.length) ? src.candles : en.candles,
    chartPatterns: (src.chartPatterns && src.chartPatterns.length) ? src.chartPatterns : en.chartPatterns,
    modules: (src.modules && src.modules.length) ? src.modules : en.modules,
    platforms: { ...en.platforms, ...(src.platforms || {}) },
    forexAz: src.forexAz?.lessons?.length > 5 ? src.forexAz : en.forexAz,
    intro: src.intro || en.intro
  };
};
