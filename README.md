# Arumon
## BenToGo
### Problem
日本では政府から週末の外出自粛の要請がおこなわれており、密閉・密集・密接を避けるように言われている。
これにより、飲食店など人が集まる場所で食事がとりづらくなっている。
日本の飲食店の多くは、店内での料理提供が売り上げの大部分だったため、客足が遠のき、売り上げが下がっている。
デリバリーサービスを開始した大手チェーン店もあるが、個人経営のお店の多くはITの利用にも疎く、まだまだオンラインでのサービス展開はおこなえていない。

The Japanese government requires people to avoid sealed/crowd/closed situations continuously and to manage to stay home during the weekend.
This requirement makes us harder to go to restaurant and eat something in there.
Most of restaurant in Japan earn from in-store services, then they are struggling the current situation.
Although some big companies started delivery service, there are a lot of restaurants cannot provide their service on the internet because they aren't used to IT.

### Solution
飲食店向けに、オンライン注文を受け付けるサイトを簡単に立ち上げられるサービス「BenToGo」を提供する。
レストランのオーナーは、スマートフォンから簡単に利用申込ができ、サイトを立ち上げることができる。
サイトでは、商品を登録し、オンラインサイトに公開する。

サイト利用者はリストから商品を選び、プレオーダーする。
その際、混雑具合から、取りに行く時間帯を選択することができる。
これにより、混在している時間を避けることができ、不要な人との接触を避け、新型コロナウイルスへの感染リスクを下げる。

We provide a service for restaurants to create an online ordering service easily and the service name is "BentToGo".
An owner of a restaurant can apply for the service by smartphone, and then they will get an online restaurant.
They can add the list of dishes on the site and publish the list.

People pre-order a dish/dishes via the online page.
Then, they can see congestion situation and select the pick-up time to avoid "crowd" environment.
We support to reduce the risk of infection for COVID-19 by this solution.


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

### System Architecture
## Front end
- Application for restaurant owners
- Population of customers for each time-period

## Back end
- Lambda function to check the existance of store id

### Future Work
