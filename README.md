# Arumon
## BenToGo
### Problem
新型コロナウイルスの影響により、多くのオフィスワーカーが在宅勤務に切り替えている。
日本でも同様に在宅勤務の推奨・外出自粛の要請がなされている。
飲食店の多くは、これまで店内での料理提供が売り上げの主だったため、客が来なくなり、売り上げが下がっている。
大手チェーン店など、体力のある企業はデリバリーサービスを開始したが、個人経営のお店の多くはITの利用にも疎く、まだまだオンラインでのサービス展開はおこなえていない。

### Solution
飲食店向けに、オンライン注文を受け付けるサイトを簡単に立ち上げられるサービスを提供する。
スマートフォンから簡単に申し込みができ、サイトの立ち上げをおこなえる。
サイトには、持ち帰り用の商品を登録し、公開する。

サイト利用者はサイトからプレオーダーをおこない、混雑具合から、取りに行く時間を検討。
混在している時間を避けて持ち帰りをおこなうことで、新型コロナウイルスへの感染リスクを下げることができる。

### Background
日本にも UberEats のようなサービスや、出前と呼ばれる各お店ごとが固有にもつ食べ物の配達文化が存在する。
同様に、弁当という、箱に詰められた料理を持ち帰る文化も存在する。
連日、感染拡大のニュースが報道される中、不特定多数の人間に接触する配達サービスを利用したくない。
一方で、たまにはいつもと異なるプロの料理を食べたい、というニーズも存在する。

BenToGo は、混雑・感染リスクを避けつつプロの料理を楽しみたいニーズと、オンラインチャネルがなく、経営に苦しんでいる飲食店とのマッチングをおこなう。

### Overview of the service
- Owner of restaurant can create a new site via the application form
- We will get a notification when a new application is created
- We create a new site with our theme on Shopify platform and delegate it to the owner
- The site has the following features by default
  + add/delete items
  + pre-order
  + congestion map
  + analytics


## Front end
- Application for restaurant owners
- Population of customers for each time-period

## Back end
- Lambda function to check the existance of store id