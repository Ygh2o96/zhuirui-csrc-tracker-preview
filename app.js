const P0_WAITING = {"asOf":"2026-11-21","calendar":{"holidays":["2017-01-01","2017-01-02","2017-01-27","2017-01-28","2017-01-29","2017-01-30","2017-01-31","2017-02-01","2017-02-02","2017-04-02","2017-04-03","2017-04-04","2017-05-01","2017-05-28","2017-05-29","2017-05-30","2017-10-01","2017-10-02","2017-10-03","2017-10-04","2017-10-05","2017-10-06","2017-10-07","2017-10-08","2018-01-01","2018-02-15","2018-02-16","2018-02-17","2018-02-18","2018-02-19","2018-02-20","2018-02-21","2018-04-05","2018-04-06","2018-04-07","2018-04-29","2018-04-30","2018-05-01","2018-06-18","2018-09-24","2018-10-01","2018-10-02","2018-10-03","2018-10-04","2018-10-05","2018-10-06","2018-10-07","2018-12-30","2018-12-31","2019-01-01","2019-02-04","2019-02-05","2019-02-06","2019-02-07","2019-02-08","2019-02-09","2019-02-10","2019-04-05","2019-05-01","2019-05-02","2019-05-03","2019-05-04","2019-06-07","2019-09-13","2019-10-01","2019-10-02","2019-10-03","2019-10-04","2019-10-05","2019-10-06","2019-10-07","2020-01-01","2020-01-24","2020-01-25","2020-01-26","2020-01-27","2020-01-28","2020-01-29","2020-01-30","2020-01-31","2020-02-01","2020-02-02","2020-04-04","2020-04-05","2020-04-06","2020-05-01","2020-05-02","2020-05-03","2020-05-04","2020-05-05","2020-06-25","2020-06-26","2020-06-27","2020-10-01","2020-10-02","2020-10-03","2020-10-04","2020-10-05","2020-10-06","2020-10-07","2020-10-08","2021-01-01","2021-01-02","2021-01-03","2021-02-11","2021-02-12","2021-02-13","2021-02-14","2021-02-15","2021-02-16","2021-02-17","2021-04-03","2021-04-04","2021-04-05","2021-05-01","2021-05-02","2021-05-03","2021-05-04","2021-05-05","2021-06-12","2021-06-13","2021-06-14","2021-09-19","2021-09-20","2021-09-21","2021-10-01","2021-10-02","2021-10-03","2021-10-04","2021-10-05","2021-10-06","2021-10-07","2022-01-01","2022-01-02","2022-01-03","2022-01-31","2022-02-01","2022-02-02","2022-02-03","2022-02-04","2022-02-05","2022-02-06","2022-04-03","2022-04-04","2022-04-05","2022-04-30","2022-05-01","2022-05-02","2022-05-03","2022-05-04","2022-06-03","2022-06-04","2022-06-05","2022-09-10","2022-09-11","2022-09-12","2022-10-01","2022-10-02","2022-10-03","2022-10-04","2022-10-05","2022-10-06","2022-10-07","2022-12-31","2023-01-01","2023-01-02","2023-01-21","2023-01-22","2023-01-23","2023-01-24","2023-01-25","2023-01-26","2023-01-27","2023-04-05","2023-04-29","2023-04-30","2023-05-01","2023-05-02","2023-05-03","2023-06-22","2023-06-23","2023-06-24","2023-09-29","2023-09-30","2023-10-01","2023-10-02","2023-10-03","2023-10-04","2023-10-05","2023-10-06","2024-01-01","2024-02-10","2024-02-11","2024-02-12","2024-02-13","2024-02-14","2024-02-15","2024-02-16","2024-02-17","2024-04-04","2024-04-05","2024-04-06","2024-05-01","2024-05-02","2024-05-03","2024-05-04","2024-05-05","2024-06-10","2024-09-15","2024-09-16","2024-09-17","2024-10-01","2024-10-02","2024-10-03","2024-10-04","2024-10-05","2024-10-06","2024-10-07","2025-01-01","2025-01-28","2025-01-29","2025-01-30","2025-01-31","2025-02-01","2025-02-02","2025-02-03","2025-02-04","2025-04-04","2025-04-05","2025-04-06","2025-05-01","2025-05-02","2025-05-03","2025-05-04","2025-05-05","2025-05-31","2025-06-01","2025-06-02","2025-10-01","2025-10-02","2025-10-03","2025-10-04","2025-10-05","2025-10-06","2025-10-07","2025-10-08","2026-01-01","2026-01-02","2026-01-03","2026-02-15","2026-02-16","2026-02-17","2026-02-18","2026-02-19","2026-02-20","2026-02-21","2026-02-22","2026-02-23","2026-04-04","2026-04-05","2026-04-06","2026-05-01","2026-05-02","2026-05-03","2026-05-04","2026-05-05","2026-06-19","2026-06-20","2026-06-21","2026-09-25","2026-09-26","2026-09-27","2026-10-01","2026-10-02","2026-10-03","2026-10-04","2026-10-05","2026-10-06","2026-10-07","2027-01-01","2027-01-02","2027-01-03","2027-02-05","2027-02-06","2027-02-07","2027-02-08","2027-02-09","2027-02-10","2027-02-11","2027-02-12","2027-02-13","2027-04-03","2027-04-04","2027-04-05","2027-05-01","2027-05-02","2027-05-03","2027-05-04","2027-05-05","2027-06-09","2027-09-15","2027-10-01","2027-10-02","2027-10-03","2027-10-04","2027-10-05","2027-10-06","2027-10-07"],"workdays":["2017-01-22","2017-02-04","2017-04-01","2017-05-27","2017-09-30","2018-02-11","2018-02-24","2018-04-08","2018-04-28","2018-09-29","2018-09-30","2018-12-29","2019-02-02","2019-02-03","2019-04-28","2019-05-05","2019-09-29","2019-10-12","2020-01-19","2020-04-26","2020-05-09","2020-06-28","2020-09-27","2020-10-10","2021-02-07","2021-02-20","2021-04-25","2021-05-08","2021-09-18","2021-09-26","2021-10-09","2022-01-29","2022-01-30","2022-04-02","2022-04-24","2022-05-07","2022-10-08","2022-10-09","2023-01-28","2023-01-29","2023-04-23","2023-05-06","2023-06-25","2023-10-07","2023-10-08","2024-02-04","2024-02-18","2024-04-07","2024-04-28","2024-05-11","2024-09-14","2024-09-29","2024-10-12","2025-01-26","2025-02-08","2025-04-27","2025-09-28","2025-10-11","2026-01-04","2026-02-14","2026-02-28","2026-05-09","2026-09-20","2026-10-10","2027-01-31","2027-02-14","2027-05-08","2027-09-26","2027-10-09"],"years":[2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027]},"dates":{"2019-04-08":{"calendar":2784,"business":1900},"2019-12-31":{"calendar":2517,"business":1715},"2020-07-10":{"calendar":2325,"business":1586},"2020-10-08":{"calendar":2235,"business":1527},"2021-02-10":{"calendar":2110,"business":1437},"2021-03-29":{"calendar":2063,"business":1408},"2021-04-14":{"calendar":2047,"business":1397},"2021-04-30":{"calendar":2031,"business":1384},"2021-05-31":{"calendar":2000,"business":1365},"2021-06-15":{"calendar":1985,"business":1355},"2021-06-24":{"calendar":1976,"business":1348},"2021-06-29":{"calendar":1971,"business":1345},"2021-06-30":{"calendar":1970,"business":1344},"2021-08-13":{"calendar":1926,"business":1312},"2021-08-25":{"calendar":1914,"business":1304},"2021-09-30":{"calendar":1878,"business":1278},"2021-10-29":{"calendar":1849,"business":1261},"2022-01-10":{"calendar":1776,"business":1211},"2022-01-24":{"calendar":1762,"business":1201},"2022-02-25":{"calendar":1730,"business":1180},"2022-02-28":{"calendar":1727,"business":1179},"2022-03-30":{"calendar":1697,"business":1157},"2022-04-19":{"calendar":1677,"business":1144},"2022-04-29":{"calendar":1667,"business":1135},"2022-05-20":{"calendar":1646,"business":1122},"2022-05-24":{"calendar":1642,"business":1120},"2022-05-27":{"calendar":1639,"business":1117},"2022-05-30":{"calendar":1636,"business":1116},"2022-05-31":{"calendar":1635,"business":1115},"2022-06-07":{"calendar":1628,"business":1111},"2022-06-15":{"calendar":1620,"business":1105},"2022-06-16":{"calendar":1619,"business":1104},"2022-06-17":{"calendar":1618,"business":1103},"2022-06-27":{"calendar":1608,"business":1097},"2022-06-28":{"calendar":1607,"business":1096},"2022-06-29":{"calendar":1606,"business":1095},"2022-06-30":{"calendar":1605,"business":1094},"2022-07-06":{"calendar":1599,"business":1090},"2022-07-21":{"calendar":1584,"business":1079},"2022-09-09":{"calendar":1534,"business":1043},"2022-10-24":{"calendar":1489,"business":1016},"2022-10-28":{"calendar":1485,"business":1012},"2022-11-09":{"calendar":1473,"business":1004},"2022-11-17":{"calendar":1465,"business":998},"2022-11-21":{"calendar":1461,"business":996},"2022-11-22":{"calendar":1460,"business":995},"2022-11-25":{"calendar":1457,"business":992},"2022-12-07":{"calendar":1445,"business":984},"2022-12-08":{"calendar":1444,"business":983},"2022-12-09":{"calendar":1443,"business":982},"2022-12-14":{"calendar":1438,"business":979},"2022-12-15":{"calendar":1437,"business":978},"2022-12-29":{"calendar":1423,"business":968},"2022-12-30":{"calendar":1422,"business":967},"2023-01-13":{"calendar":1408,"business":958},"2023-01-26":{"calendar":1395,"business":953},"2023-01-31":{"calendar":1390,"business":949},"2023-02-01":{"calendar":1389,"business":948},"2023-02-13":{"calendar":1377,"business":940},"2023-02-20":{"calendar":1370,"business":935},"2023-02-21":{"calendar":1369,"business":934},"2023-02-24":{"calendar":1366,"business":931},"2023-02-27":{"calendar":1363,"business":930},"2023-02-28":{"calendar":1362,"business":929},"2023-03-03":{"calendar":1359,"business":926},"2023-03-10":{"calendar":1352,"business":921},"2023-03-13":{"calendar":1349,"business":920},"2023-03-14":{"calendar":1348,"business":919},"2023-03-16":{"calendar":1346,"business":917},"2023-03-20":{"calendar":1342,"business":915},"2023-03-26":{"calendar":1336,"business":911},"2023-03-28":{"calendar":1334,"business":909},"2023-03-29":{"calendar":1333,"business":908},"2023-03-30":{"calendar":1332,"business":907},"2023-03-31":{"calendar":1331,"business":906},"2023-04-03":{"calendar":1328,"business":905},"2023-04-04":{"calendar":1327,"business":904},"2023-04-11":{"calendar":1320,"business":900},"2023-04-13":{"calendar":1318,"business":898},"2023-04-20":{"calendar":1311,"business":893},"2023-04-24":{"calendar":1307,"business":890},"2023-04-28":{"calendar":1303,"business":886},"2023-05-05":{"calendar":1296,"business":884},"2023-05-10":{"calendar":1291,"business":880},"2023-05-11":{"calendar":1290,"business":879},"2023-05-16":{"calendar":1285,"business":876},"2023-05-22":{"calendar":1279,"business":872},"2023-05-25":{"calendar":1276,"business":869},"2023-05-29":{"calendar":1272,"business":867},"2023-05-30":{"calendar":1271,"business":866},"2023-05-31":{"calendar":1270,"business":865},"2023-06-01":{"calendar":1269,"business":864},"2023-06-06":{"calendar":1264,"business":861},"2023-06-07":{"calendar":1263,"business":860},"2023-06-08":{"calendar":1262,"business":859},"2023-06-11":{"calendar":1259,"business":858},"2023-06-12":{"calendar":1258,"business":857},"2023-06-13":{"calendar":1257,"business":856},"2023-06-16":{"calendar":1254,"business":853},"2023-06-19":{"calendar":1251,"business":852},"2023-06-21":{"calendar":1249,"business":850},"2023-06-25":{"calendar":1245,"business":849},"2023-06-27":{"calendar":1243,"business":847},"2023-06-28":{"calendar":1242,"business":846},"2023-06-29":{"calendar":1241,"business":845},"2023-06-30":{"calendar":1240,"business":844},"2023-07-09":{"calendar":1231,"business":839},"2023-07-25":{"calendar":1215,"business":827},"2023-07-31":{"calendar":1209,"business":823},"2023-08-03":{"calendar":1206,"business":820},"2023-08-08":{"calendar":1201,"business":817},"2023-08-10":{"calendar":1199,"business":815},"2023-08-11":{"calendar":1198,"business":814},"2023-08-15":{"calendar":1194,"business":812},"2023-08-17":{"calendar":1192,"business":810},"2023-08-18":{"calendar":1191,"business":809},"2023-08-21":{"calendar":1188,"business":808},"2023-08-22":{"calendar":1187,"business":807},"2023-08-25":{"calendar":1184,"business":804},"2023-08-28":{"calendar":1181,"business":803},"2023-08-30":{"calendar":1179,"business":801},"2023-09-04":{"calendar":1174,"business":798},"2023-09-08":{"calendar":1170,"business":794},"2023-09-19":{"calendar":1159,"business":787},"2023-09-20":{"calendar":1158,"business":786},"2023-09-22":{"calendar":1156,"business":784},"2023-09-27":{"calendar":1151,"business":781},"2023-09-28":{"calendar":1150,"business":780},"2023-09-29":{"calendar":1149,"business":780},"2023-10-03":{"calendar":1145,"business":780},"2023-10-04":{"calendar":1144,"business":780},"2023-10-05":{"calendar":1143,"business":780},"2023-10-06":{"calendar":1142,"business":780},"2023-10-24":{"calendar":1124,"business":766},"2023-11-03":{"calendar":1114,"business":758},"2023-11-10":{"calendar":1107,"business":753},"2023-11-17":{"calendar":1100,"business":748},"2023-11-22":{"calendar":1095,"business":745},"2023-11-30":{"calendar":1087,"business":739},"2023-12-01":{"calendar":1086,"business":738},"2023-12-04":{"calendar":1083,"business":737},"2023-12-05":{"calendar":1082,"business":736},"2023-12-15":{"calendar":1072,"business":728},"2023-12-28":{"calendar":1059,"business":719},"2023-12-29":{"calendar":1058,"business":718},"2024-01-02":{"calendar":1054,"business":717},"2024-01-11":{"calendar":1045,"business":710},"2024-01-12":{"calendar":1044,"business":709},"2024-01-16":{"calendar":1040,"business":707},"2024-01-22":{"calendar":1034,"business":703},"2024-01-26":{"calendar":1030,"business":699},"2024-01-29":{"calendar":1027,"business":698},"2024-01-30":{"calendar":1026,"business":697},"2024-02-01":{"calendar":1024,"business":695},"2024-02-06":{"calendar":1019,"business":691},"2024-02-09":{"calendar":1016,"business":688},"2024-02-14":{"calendar":1011,"business":688},"2024-02-22":{"calendar":1003,"business":683},"2024-02-23":{"calendar":1002,"business":682},"2024-02-26":{"calendar":999,"business":681},"2024-02-27":{"calendar":998,"business":680},"2024-02-28":{"calendar":997,"business":679},"2024-02-29":{"calendar":996,"business":678},"2024-03-04":{"calendar":992,"business":676},"2024-03-06":{"calendar":990,"business":674},"2024-03-08":{"calendar":988,"business":672},"2024-03-12":{"calendar":984,"business":670},"2024-03-15":{"calendar":981,"business":667},"2024-03-18":{"calendar":978,"business":666},"2024-03-19":{"calendar":977,"business":665},"2024-03-20":{"calendar":976,"business":664},"2024-03-22":{"calendar":974,"business":662},"2024-03-25":{"calendar":971,"business":661},"2024-03-26":{"calendar":970,"business":660},"2024-03-27":{"calendar":969,"business":659},"2024-03-28":{"calendar":968,"business":658},"2024-04-03":{"calendar":962,"business":654},"2024-04-08":{"calendar":957,"business":652},"2024-04-19":{"calendar":946,"business":643},"2024-04-22":{"calendar":943,"business":642},"2024-04-26":{"calendar":939,"business":638},"2024-04-29":{"calendar":936,"business":636},"2024-04-30":{"calendar":935,"business":635},"2024-05-03":{"calendar":932,"business":635},"2024-05-10":{"calendar":925,"business":630},"2024-05-13":{"calendar":922,"business":628},"2024-05-15":{"calendar":920,"business":626},"2024-05-16":{"calendar":919,"business":625},"2024-05-17":{"calendar":918,"business":624},"2024-05-27":{"calendar":908,"business":618},"2024-05-28":{"calendar":907,"business":617},"2024-05-30":{"calendar":905,"business":615},"2024-05-31":{"calendar":904,"business":614},"2024-06-12":{"calendar":892,"business":607},"2024-06-25":{"calendar":879,"business":598},"2024-06-26":{"calendar":878,"business":597},"2024-06-27":{"calendar":877,"business":596},"2024-06-28":{"calendar":876,"business":595},"2024-07-01":{"calendar":873,"business":594},"2024-07-10":{"calendar":864,"business":587},"2024-07-16":{"calendar":858,"business":583},"2024-07-18":{"calendar":856,"business":581},"2024-07-24":{"calendar":850,"business":577},"2024-07-26":{"calendar":848,"business":575},"2024-07-29":{"calendar":845,"business":574},"2024-07-30":{"calendar":844,"business":573},"2024-07-31":{"calendar":843,"business":572},"2024-08-12":{"calendar":831,"business":564},"2024-08-23":{"calendar":820,"business":555},"2024-08-26":{"calendar":817,"business":554},"2024-08-27":{"calendar":816,"business":553},"2024-08-30":{"calendar":813,"business":550},"2024-09-02":{"calendar":810,"business":549},"2024-09-13":{"calendar":799,"business":540},"2024-09-19":{"calendar":793,"business":537},"2024-09-20":{"calendar":792,"business":536},"2024-09-22":{"calendar":790,"business":536},"2024-09-26":{"calendar":786,"business":532},"2024-09-29":{"calendar":783,"business":530},"2024-09-30":{"calendar":782,"business":529},"2024-10-01":{"calendar":781,"business":529},"2024-10-04":{"calendar":778,"business":529},"2024-10-09":{"calendar":773,"business":527},"2024-10-14":{"calendar":768,"business":523},"2024-10-29":{"calendar":753,"business":512},"2024-10-31":{"calendar":751,"business":510},"2024-11-01":{"calendar":750,"business":509},"2024-11-07":{"calendar":744,"business":505},"2024-11-08":{"calendar":743,"business":504},"2024-11-12":{"calendar":739,"business":502},"2024-11-13":{"calendar":738,"business":501},"2024-11-15":{"calendar":736,"business":499},"2024-11-18":{"calendar":733,"business":498},"2024-11-22":{"calendar":729,"business":494},"2024-11-24":{"calendar":727,"business":494},"2024-11-25":{"calendar":726,"business":493},"2024-11-28":{"calendar":723,"business":490},"2024-11-29":{"calendar":722,"business":489},"2024-12-02":{"calendar":719,"business":488},"2024-12-03":{"calendar":718,"business":487},"2024-12-04":{"calendar":717,"business":486},"2024-12-06":{"calendar":715,"business":484},"2024-12-08":{"calendar":713,"business":484},"2024-12-09":{"calendar":712,"business":483},"2024-12-11":{"calendar":710,"business":481},"2024-12-12":{"calendar":709,"business":480},"2024-12-13":{"calendar":708,"business":479},"2024-12-15":{"calendar":706,"business":479},"2024-12-16":{"calendar":705,"business":478},"2024-12-20":{"calendar":701,"business":474},"2024-12-23":{"calendar":698,"business":473},"2024-12-27":{"calendar":694,"business":469},"2024-12-30":{"calendar":691,"business":468},"2024-12-31":{"calendar":690,"business":467},"2025-01-01":{"calendar":689,"business":467},"2025-01-02":{"calendar":688,"business":466},"2025-01-03":{"calendar":687,"business":465},"2025-01-06":{"calendar":684,"business":464},"2025-01-13":{"calendar":677,"business":459},"2025-01-15":{"calendar":675,"business":457},"2025-01-16":{"calendar":674,"business":456},"2025-01-17":{"calendar":673,"business":455},"2025-01-20":{"calendar":670,"business":454},"2025-01-21":{"calendar":669,"business":453},"2025-01-23":{"calendar":667,"business":451},"2025-01-24":{"calendar":666,"business":450},"2025-01-27":{"calendar":663,"business":448},"2025-01-28":{"calendar":662,"business":448},"2025-02-07":{"calendar":652,"business":445},"2025-02-11":{"calendar":648,"business":442},"2025-02-13":{"calendar":646,"business":440},"2025-02-14":{"calendar":645,"business":439},"2025-02-17":{"calendar":642,"business":438},"2025-02-18":{"calendar":641,"business":437},"2025-02-20":{"calendar":639,"business":435},"2025-02-21":{"calendar":638,"business":434},"2025-02-24":{"calendar":635,"business":433},"2025-02-25":{"calendar":634,"business":432},"2025-02-26":{"calendar":633,"business":431},"2025-02-27":{"calendar":632,"business":430},"2025-02-28":{"calendar":631,"business":429},"2025-03-07":{"calendar":624,"business":424},"2025-03-11":{"calendar":620,"business":422},"2025-03-21":{"calendar":610,"business":414},"2025-03-25":{"calendar":606,"business":412},"2025-03-30":{"calendar":601,"business":409},"2025-03-31":{"calendar":600,"business":408},"2025-04-03":{"calendar":597,"business":405},"2025-04-08":{"calendar":592,"business":403},"2025-04-09":{"calendar":591,"business":402},"2025-04-10":{"calendar":590,"business":401},"2025-04-11":{"calendar":589,"business":400},"2025-04-14":{"calendar":586,"business":399},"2025-04-15":{"calendar":585,"business":398},"2025-04-16":{"calendar":584,"business":397},"2025-04-17":{"calendar":583,"business":396},"2025-04-18":{"calendar":582,"business":395},"2025-04-22":{"calendar":578,"business":393},"2025-04-23":{"calendar":577,"business":392},"2025-04-25":{"calendar":575,"business":390},"2025-04-28":{"calendar":572,"business":388},"2025-04-29":{"calendar":571,"business":387},"2025-04-30":{"calendar":570,"business":386},"2025-05-02":{"calendar":568,"business":386},"2025-05-07":{"calendar":563,"business":384},"2025-05-09":{"calendar":561,"business":382},"2025-05-16":{"calendar":554,"business":377},"2025-05-19":{"calendar":551,"business":376},"2025-05-22":{"calendar":548,"business":373},"2025-05-23":{"calendar":547,"business":372},"2025-05-26":{"calendar":544,"business":371},"2025-05-27":{"calendar":543,"business":370},"2025-05-28":{"calendar":542,"business":369},"2025-05-29":{"calendar":541,"business":368},"2025-05-30":{"calendar":540,"business":367},"2025-06-01":{"calendar":538,"business":367},"2025-06-03":{"calendar":536,"business":366},"2025-06-04":{"calendar":535,"business":365},"2025-06-08":{"calendar":531,"business":363},"2025-06-09":{"calendar":530,"business":362},"2025-06-10":{"calendar":529,"business":361},"2025-06-11":{"calendar":528,"business":360},"2025-06-13":{"calendar":526,"business":358},"2025-06-16":{"calendar":523,"business":357},"2025-06-17":{"calendar":522,"business":356},"2025-06-18":{"calendar":521,"business":355},"2025-06-19":{"calendar":520,"business":354},"2025-06-20":{"calendar":519,"business":353},"2025-06-23":{"calendar":516,"business":352},"2025-06-25":{"calendar":514,"business":350},"2025-06-26":{"calendar":513,"business":349},"2025-06-27":{"calendar":512,"business":348},"2025-06-29":{"calendar":510,"business":348},"2025-06-30":{"calendar":509,"business":347},"2025-07-01":{"calendar":508,"business":346},"2025-07-07":{"calendar":502,"business":342},"2025-07-08":{"calendar":501,"business":341},"2025-07-09":{"calendar":500,"business":340},"2025-07-10":{"calendar":499,"business":339},"2025-07-11":{"calendar":498,"business":338},"2025-07-15":{"calendar":494,"business":336},"2025-07-16":{"calendar":493,"business":335},"2025-07-18":{"calendar":491,"business":333},"2025-07-21":{"calendar":488,"business":332},"2025-07-22":{"calendar":487,"business":331},"2025-07-24":{"calendar":485,"business":329},"2025-07-25":{"calendar":484,"business":328},"2025-07-29":{"calendar":480,"business":326},"2025-07-30":{"calendar":479,"business":325},"2025-07-31":{"calendar":478,"business":324},"2025-08-01":{"calendar":477,"business":323},"2025-08-06":{"calendar":472,"business":320},"2025-08-07":{"calendar":471,"business":319},"2025-08-12":{"calendar":466,"business":316},"2025-08-13":{"calendar":465,"business":315},"2025-08-14":{"calendar":464,"business":314},"2025-08-15":{"calendar":463,"business":313},"2025-08-18":{"calendar":460,"business":312},"2025-08-20":{"calendar":458,"business":310},"2025-08-21":{"calendar":457,"business":309},"2025-08-22":{"calendar":456,"business":308},"2025-08-25":{"calendar":453,"business":307},"2025-08-26":{"calendar":452,"business":306},"2025-08-27":{"calendar":451,"business":305},"2025-08-28":{"calendar":450,"business":304},"2025-08-29":{"calendar":449,"business":303},"2025-08-31":{"calendar":447,"business":303},"2025-09-02":{"calendar":445,"business":301},"2025-09-04":{"calendar":443,"business":299},"2025-09-05":{"calendar":442,"business":298},"2025-09-08":{"calendar":439,"business":297},"2025-09-09":{"calendar":438,"business":296},"2025-09-10":{"calendar":437,"business":295},"2025-09-11":{"calendar":436,"business":294},"2025-09-12":{"calendar":435,"business":293},"2025-09-15":{"calendar":432,"business":292},"2025-09-16":{"calendar":431,"business":291},"2025-09-19":{"calendar":428,"business":288},"2025-09-22":{"calendar":425,"business":287},"2025-09-23":{"calendar":424,"business":286},"2025-09-24":{"calendar":423,"business":285},"2025-09-25":{"calendar":422,"business":284},"2025-09-26":{"calendar":421,"business":283},"2025-09-28":{"calendar":419,"business":282},"2025-09-29":{"calendar":418,"business":281},"2025-09-30":{"calendar":417,"business":280},"2025-10-02":{"calendar":415,"business":280},"2025-10-05":{"calendar":412,"business":280},"2025-10-08":{"calendar":409,"business":280},"2025-10-09":{"calendar":408,"business":279},"2025-10-10":{"calendar":407,"business":278},"2025-10-11":{"calendar":406,"business":277},"2025-10-13":{"calendar":404,"business":276},"2025-10-14":{"calendar":403,"business":275},"2025-10-15":{"calendar":402,"business":274},"2025-10-16":{"calendar":401,"business":273},"2025-10-17":{"calendar":400,"business":272},"2025-10-20":{"calendar":397,"business":271},"2025-10-22":{"calendar":395,"business":269},"2025-10-23":{"calendar":394,"business":268},"2025-10-24":{"calendar":393,"business":267},"2025-10-27":{"calendar":390,"business":266},"2025-10-28":{"calendar":389,"business":265},"2025-10-29":{"calendar":388,"business":264},"2025-10-30":{"calendar":387,"business":263},"2025-10-31":{"calendar":386,"business":262},"2025-11-02":{"calendar":384,"business":262},"2025-11-03":{"calendar":383,"business":261},"2025-11-05":{"calendar":381,"business":259},"2025-11-06":{"calendar":380,"business":258},"2025-11-07":{"calendar":379,"business":257},"2025-11-10":{"calendar":376,"business":256},"2025-11-11":{"calendar":375,"business":255},"2025-11-12":{"calendar":374,"business":254},"2025-11-13":{"calendar":373,"business":253},"2025-11-14":{"calendar":372,"business":252},"2025-11-17":{"calendar":369,"business":251},"2025-11-18":{"calendar":368,"business":250},"2025-11-20":{"calendar":366,"business":248},"2025-11-21":{"calendar":365,"business":247},"2025-11-22":{"calendar":364,"business":247},"2025-11-24":{"calendar":362,"business":246},"2025-11-25":{"calendar":361,"business":245},"2025-11-26":{"calendar":360,"business":244},"2025-11-27":{"calendar":359,"business":243},"2025-11-28":{"calendar":358,"business":242},"2025-11-30":{"calendar":356,"business":242},"2025-12-01":{"calendar":355,"business":241},"2025-12-02":{"calendar":354,"business":240},"2025-12-03":{"calendar":353,"business":239},"2025-12-04":{"calendar":352,"business":238},"2025-12-05":{"calendar":351,"business":237},"2025-12-06":{"calendar":350,"business":237},"2025-12-08":{"calendar":348,"business":236},"2025-12-09":{"calendar":347,"business":235},"2025-12-10":{"calendar":346,"business":234},"2025-12-11":{"calendar":345,"business":233},"2025-12-12":{"calendar":344,"business":232},"2025-12-14":{"calendar":342,"business":232},"2025-12-15":{"calendar":341,"business":231},"2025-12-17":{"calendar":339,"business":229},"2025-12-18":{"calendar":338,"business":228},"2025-12-19":{"calendar":337,"business":227},"2025-12-21":{"calendar":335,"business":227},"2025-12-22":{"calendar":334,"business":226},"2025-12-23":{"calendar":333,"business":225},"2025-12-24":{"calendar":332,"business":224},"2025-12-29":{"calendar":327,"business":221},"2025-12-30":{"calendar":326,"business":220},"2025-12-31":{"calendar":325,"business":219},"2026-01-01":{"calendar":324,"business":219},"2026-01-02":{"calendar":323,"business":219},"2026-01-04":{"calendar":321,"business":218},"2026-01-05":{"calendar":320,"business":217},"2026-01-06":{"calendar":319,"business":216},"2026-01-07":{"calendar":318,"business":215},"2026-01-08":{"calendar":317,"business":214},"2026-01-09":{"calendar":316,"business":213},"2026-01-12":{"calendar":313,"business":212},"2026-01-13":{"calendar":312,"business":211},"2026-01-14":{"calendar":311,"business":210},"2026-01-15":{"calendar":310,"business":209},"2026-01-16":{"calendar":309,"business":208},"2026-01-18":{"calendar":307,"business":208},"2026-01-19":{"calendar":306,"business":207},"2026-01-20":{"calendar":305,"business":206},"2026-01-21":{"calendar":304,"business":205},"2026-01-22":{"calendar":303,"business":204},"2026-01-23":{"calendar":302,"business":203},"2026-01-25":{"calendar":300,"business":203},"2026-01-26":{"calendar":299,"business":202},"2026-01-27":{"calendar":298,"business":201},"2026-01-28":{"calendar":297,"business":200},"2026-01-29":{"calendar":296,"business":199},"2026-01-30":{"calendar":295,"business":198},"2026-02-02":{"calendar":292,"business":197},"2026-02-03":{"calendar":291,"business":196},"2026-02-04":{"calendar":290,"business":195},"2026-02-05":{"calendar":289,"business":194},"2026-02-06":{"calendar":288,"business":193},"2026-02-08":{"calendar":286,"business":193},"2026-02-09":{"calendar":285,"business":192},"2026-02-10":{"calendar":284,"business":191},"2026-02-11":{"calendar":283,"business":190},"2026-02-12":{"calendar":282,"business":189},"2026-02-13":{"calendar":281,"business":188},"2026-02-14":{"calendar":280,"business":187},"2026-02-15":{"calendar":279,"business":187},"2026-02-16":{"calendar":278,"business":187},"2026-02-20":{"calendar":274,"business":187},"2026-02-24":{"calendar":270,"business":186},"2026-02-25":{"calendar":269,"business":185},"2026-02-26":{"calendar":268,"business":184},"2026-02-27":{"calendar":267,"business":183},"2026-03-02":{"calendar":264,"business":181},"2026-03-03":{"calendar":263,"business":180},"2026-03-04":{"calendar":262,"business":179},"2026-03-05":{"calendar":261,"business":178},"2026-03-06":{"calendar":260,"business":177},"2026-03-09":{"calendar":257,"business":176},"2026-03-11":{"calendar":255,"business":174},"2026-03-13":{"calendar":253,"business":172},"2026-03-15":{"calendar":251,"business":172},"2026-03-16":{"calendar":250,"business":171},"2026-03-17":{"calendar":249,"business":170},"2026-03-18":{"calendar":248,"business":169},"2026-03-19":{"calendar":247,"business":168},"2026-03-20":{"calendar":246,"business":167},"2026-03-23":{"calendar":243,"business":166},"2026-03-24":{"calendar":242,"business":165},"2026-03-25":{"calendar":241,"business":164},"2026-03-26":{"calendar":240,"business":163},"2026-03-27":{"calendar":239,"business":162},"2026-03-29":{"calendar":237,"business":162},"2026-03-30":{"calendar":236,"business":161},"2026-03-31":{"calendar":235,"business":160},"2026-04-01":{"calendar":234,"business":159},"2026-04-02":{"calendar":233,"business":158},"2026-04-03":{"calendar":232,"business":157},"2026-04-07":{"calendar":228,"business":156},"2026-04-08":{"calendar":227,"business":155},"2026-04-09":{"calendar":226,"business":154},"2026-04-10":{"calendar":225,"business":153},"2026-04-12":{"calendar":223,"business":153},"2026-04-13":{"calendar":222,"business":152},"2026-04-14":{"calendar":221,"business":151},"2026-04-15":{"calendar":220,"business":150},"2026-04-16":{"calendar":219,"business":149},"2026-04-17":{"calendar":218,"business":148},"2026-04-20":{"calendar":215,"business":147},"2026-04-21":{"calendar":214,"business":146},"2026-04-22":{"calendar":213,"business":145},"2026-04-23":{"calendar":212,"business":144},"2026-04-24":{"calendar":211,"business":143},"2026-04-27":{"calendar":208,"business":142},"2026-04-28":{"calendar":207,"business":141},"2026-04-29":{"calendar":206,"business":140},"2026-04-30":{"calendar":205,"business":139},"2026-05-04":{"calendar":201,"business":139},"2026-05-05":{"calendar":200,"business":139},"2026-05-06":{"calendar":199,"business":138},"2026-05-07":{"calendar":198,"business":137},"2026-05-08":{"calendar":197,"business":136},"2026-05-09":{"calendar":196,"business":135},"2026-05-10":{"calendar":195,"business":135},"2026-05-11":{"calendar":194,"business":134},"2026-05-12":{"calendar":193,"business":133},"2026-05-13":{"calendar":192,"business":132},"2026-05-14":{"calendar":191,"business":131},"2026-05-15":{"calendar":190,"business":130},"2026-05-18":{"calendar":187,"business":129},"2026-05-19":{"calendar":186,"business":128},"2026-05-20":{"calendar":185,"business":127},"2026-05-21":{"calendar":184,"business":126},"2026-05-22":{"calendar":183,"business":125},"2026-05-25":{"calendar":180,"business":124},"2026-05-26":{"calendar":179,"business":123},"2026-05-27":{"calendar":178,"business":122},"2026-05-28":{"calendar":177,"business":121},"2026-05-29":{"calendar":176,"business":120},"2026-05-31":{"calendar":174,"business":120},"2026-06-01":{"calendar":173,"business":119},"2026-06-02":{"calendar":172,"business":118},"2026-06-03":{"calendar":171,"business":117},"2026-06-04":{"calendar":170,"business":116},"2026-06-05":{"calendar":169,"business":115},"2026-06-07":{"calendar":167,"business":115},"2026-06-08":{"calendar":166,"business":114},"2026-06-09":{"calendar":165,"business":113},"2026-06-10":{"calendar":164,"business":112},"2026-06-11":{"calendar":163,"business":111},"2026-06-12":{"calendar":162,"business":110},"2026-06-14":{"calendar":160,"business":110},"2026-06-15":{"calendar":159,"business":109},"2026-06-16":{"calendar":158,"business":108},"2026-06-17":{"calendar":157,"business":107},"2026-06-18":{"calendar":156,"business":106},"2026-06-22":{"calendar":152,"business":105},"2026-06-23":{"calendar":151,"business":104},"2026-06-24":{"calendar":150,"business":103},"2026-06-25":{"calendar":149,"business":102},"2026-06-26":{"calendar":148,"business":101},"2026-06-29":{"calendar":145,"business":100},"2026-06-30":{"calendar":144,"business":99},"2026-07-01":{"calendar":143,"business":98},"2026-07-02":{"calendar":142,"business":97},"2026-07-03":{"calendar":141,"business":96},"2026-07-05":{"calendar":139,"business":96},"2026-07-06":{"calendar":138,"business":95},"2026-07-07":{"calendar":137,"business":94},"2026-07-08":{"calendar":136,"business":93},"2026-07-09":{"calendar":135,"business":92},"2026-07-10":{"calendar":134,"business":91},"2026-07-13":{"calendar":131,"business":90},"2026-07-14":{"calendar":130,"business":89},"2026-07-15":{"calendar":129,"business":88},"2026-07-16":{"calendar":128,"business":87},"2026-07-17":{"calendar":127,"business":86},"2026-07-19":{"calendar":125,"business":86},"2026-07-20":{"calendar":124,"business":85},"2026-07-22":{"calendar":122,"business":83},"2026-07-23":{"calendar":121,"business":82},"2026-07-24":{"calendar":120,"business":81},"2026-07-27":{"calendar":117,"business":80},"2026-07-28":{"calendar":116,"business":79},"2026-07-29":{"calendar":115,"business":78},"2026-07-30":{"calendar":114,"business":77},"2026-07-31":{"calendar":113,"business":76},"2026-08-03":{"calendar":110,"business":75},"2026-08-04":{"calendar":109,"business":74},"2026-08-06":{"calendar":107,"business":72},"2026-08-07":{"calendar":106,"business":71},"2026-08-09":{"calendar":104,"business":71},"2026-08-10":{"calendar":103,"business":70},"2026-08-11":{"calendar":102,"business":69},"2026-08-12":{"calendar":101,"business":68},"2026-08-13":{"calendar":100,"business":67},"2026-08-14":{"calendar":99,"business":66},"2026-08-17":{"calendar":96,"business":65},"2026-08-18":{"calendar":95,"business":64},"2026-08-19":{"calendar":94,"business":63},"2026-08-20":{"calendar":93,"business":62},"2026-08-21":{"calendar":92,"business":61},"2026-08-24":{"calendar":89,"business":60},"2026-08-25":{"calendar":88,"business":59},"2026-08-26":{"calendar":87,"business":58},"2026-08-27":{"calendar":86,"business":57},"2026-08-28":{"calendar":85,"business":56},"2026-08-30":{"calendar":83,"business":56},"2026-08-31":{"calendar":82,"business":55},"2026-09-01":{"calendar":81,"business":54},"2026-09-02":{"calendar":80,"business":53},"2026-09-03":{"calendar":79,"business":52},"2026-09-04":{"calendar":78,"business":51},"2026-09-08":{"calendar":74,"business":49},"2026-09-10":{"calendar":72,"business":47},"2026-09-11":{"calendar":71,"business":46},"2026-09-13":{"calendar":69,"business":46},"2026-09-14":{"calendar":68,"business":45},"2026-09-15":{"calendar":67,"business":44},"2026-09-16":{"calendar":66,"business":43},"2026-09-17":{"calendar":65,"business":42},"2026-09-18":{"calendar":64,"business":41},"2026-09-19":{"calendar":63,"business":41},"2026-09-21":{"calendar":61,"business":39},"2026-09-22":{"calendar":60,"business":38},"2026-09-23":{"calendar":59,"business":37},"2026-09-24":{"calendar":58,"business":36},"2026-09-27":{"calendar":55,"business":36},"2026-09-28":{"calendar":54,"business":35},"2026-09-29":{"calendar":53,"business":34},"2026-09-30":{"calendar":52,"business":33},"2026-10-02":{"calendar":50,"business":33},"2026-10-08":{"calendar":44,"business":32},"2026-10-10":{"calendar":42,"business":30},"2026-10-14":{"calendar":38,"business":27},"2026-10-19":{"calendar":33,"business":24},"2026-10-22":{"calendar":30,"business":21},"2026-10-26":{"calendar":26,"business":19},"2026-10-29":{"calendar":23,"business":16},"2026-11-02":{"calendar":19,"business":14},"2026-11-04":{"calendar":17,"business":12},"2026-11-10":{"calendar":11,"business":8},"2026-11-11":{"calendar":10,"business":7},"2026-11-12":{"calendar":9,"business":6},"2026-11-16":{"calendar":5,"business":4}}};
// no-cache (not no-store) lets the browser revalidate with the CDN ETag and
// skip re-downloading the multi-MB payload when the snapshot is unchanged.
const DATA_URL = "data/csrc_tracker_public.json";
const OFFERING_FEES_URL = "data/offering_fees.json";
const FEE_ROSTER_URL = "data/fee_roster.json";
const OFFERING_DOSSIERS_URL = "data/offering_dossiers.json";
const TRANSACTION_CASES_URL = "data/transaction_cases.json";
const PAGE_SIZE = 50;

const defaults = {
  selectedId: null,
  roundId: "",
  returnTo: "",
  peek: "",
  sizeBand: "all",
  shoeBasis: "offered",
  feeMin: "",
  feeMax: "",
  feeType: "all",
  feeSortDir: "desc",
  feeCompare: "",
  cohort: "",
  cohortMetric: "a1ToReceived",
  cohortCollapsed: false,
  firm: "",
  sponsorMode: "list",
  status: "all",
  hkexStage: "applying",
  query: "",
  dirQuery: "",
  dirStage: "all",
  dirType: "all",
  dirIndustry: "all",
  dirSponsor: "all",
  dirDocStatus: "all",
  dirSort: "latestActivity",
  dirSortDir: "desc",
  dirPage: 1,
  csQuery: "",
  csArchetype: "all",
  csId: "",
  offeringQuery: "",
  feeQuery: "",
  feePhase: "listed",
  feeBasis: "all",
  feeIndustry: "all",
  feeInstitution: "all",
  feeSponsorRole: "all",
  feeEconMetric: "totalEcon",
  feeEconSplit: "total",
  feeCurrency: "all",
  feeDateFrom: "",
  feeDateTo: "",
  feeSort: "date",
  feeRoundId: "",
  feePage: 1,
  dossierQuery: "",
  dossierId: "",
  dossierSection: "",
  transactionId: '',
  transactionMode: 'list',
  transactionRule: 'all',
  transactionCurrency: 'all',
  transactionAdvisor: 'all',
  transactionA: '',
  transactionB: '',
  transactionDifferences: '',
  transactionQuery: "",
  transactionCategory: "all",
  transactionStatus: "all",
  transactionRole: "all",
  transactionService: "all",
  transactionRecent: "all",
  transactionCompare: "",
  view: "directory",
  dateField: "a1Date",
  dateFrom: "",
  dateTo: "",
  structure: "all",
  industry: "all",
  sponsor: "all",
  marketCapMin: "",
  marketCapMax: "",
  sortField: "currentA1Date",
  sortDir: "desc",
  dayCountMode: "calendar",
  daySortField: "calendarDaysA1ToReceived",
  page: 1
};

const state = {
  data: null,
  feeData: null,
  feeRosterData: null,
  dossierData: null,
  transactionData: null,
  ...defaults
};

const statusLabels = {
  notice_issued: ["已发通知书", "Notice issued"],
  regulator_opinion: ["征询监管意见中", "Regulator opinion"],
  supplement_requested: ["补充材料", "Supplement requested"],
  csrc_received: ["已接收", "CSRC received"],
  waiting_received: ["尚未接收", "No public receipt yet"],
  not_required: ["无需备案", "Not required"],
  applicability_pending: ["无公开备案记录", "No public filing record"],
  review_pending: ["待披露", "Pending"],
  pending_match: ["待披露", "Pending"]
};

const viewTitles = {
  directory: "项目总录",
  tracker: "监管节奏",
  offerings: "发售搁置",
  pausedOfferings: "发售搁置",
  fees: "新股与费用",
  cornerstones: "基石画像",
  sponsorLeaderboard: "机构与保荐",
  sponsorPk: "机构比较",
  precedents: "交易与重组",
  dossiers: "发行人档案",
  signals: "市场信号",
  research: "研究笔记"
};

const metricDefinitions = [
  {
    metric: "a1ToReceived",
    labelZh: "A1至接收天数",
    labelEn: "A1 to CSRC receipt days",
    note: "已核实多轮取较长同轮周期；其余按既有有效日期口径"
  },
  {
    metric: "receivedToNotice",
    labelZh: "接收至通知天数",
    labelEn: "CSRC received to notice days",
    note: "需同一发行人接收日及通知书"
  },
  {
    metric: "a1ToNotice",
    labelZh: "备案锚点（A1日）至通知天数",
    labelEn: "CSRC A1 date anchor to notice days",
    note: "按有通知书样本"
  }
];

const listedMetricDefinitions = [
  {
    metric: "a1ToNotice",
    labelZh: "首次A1至备案通过天数",
    labelEn: "First A1 to CSRC notice days",
    note: "按上市日在CSRC新规后且已有source-backed备案通知书样本；De-SPAC/HDR剔除"
  },
  {
    metric: "a1ToListing",
    labelZh: "首次A1至上市天数",
    labelEn: "First A1 to HKEX listing days",
    note: "按HKEX New Listing Report上市日样本；密交/疑似密交/De-SPAC/HDR剔除；无需备案发行人可纳入"
  }
];

const trackedStateKeys = [
  'transactionId',
  'transactionMode',
  'transactionRule',
  'transactionCurrency',
  'transactionAdvisor',
  'transactionA',
  'transactionB',
  'transactionDifferences',

  "roundId",
  "returnTo",
  "peek",
  "sizeBand",
  "shoeBasis",
  "feeMin",
  "feeMax",
  "feeType",
  "feeSortDir",
  "feeCompare",
  "cohort",
  "cohortMetric",
  "cohortCollapsed",
  "firm",
  "sponsorMode",
  "view",
  "status",
  "hkexStage",
  "query",
  "dirQuery",
  "dirStage",
  "dirType",
  "dirIndustry",
  "dirSponsor",
  "dirDocStatus",
  "dirSort",
  "dirSortDir",
  "dirPage",
  "csQuery",
  "csArchetype",
  "csId",
  "offeringQuery",
  "feeQuery",
  "feePhase",
  "feeBasis",
  "feeIndustry",
  "feeInstitution",
  "feeSponsorRole",
  "feeEconMetric",
  "feeEconSplit",
  "feeCurrency",
  "feeDateFrom",
  "feeDateTo",
  "feeSort",
  "feeRoundId",
  "feePage",
  "dossierQuery",
  "dossierId",
  "dossierSection",
  "transactionQuery", "transactionCategory", "transactionStatus", "transactionRole", "transactionService", "transactionRecent", "transactionCompare",
  "dateField",
  "dateFrom",
  "dateTo",
  "structure",
  "industry",
  "sponsor",
  "marketCapMin",
  "marketCapMax",
  "sortField",
  "sortDir",
  "dayCountMode",
  "daySortField",
  "page"
];

const dayFieldPairs = {
  a1ToReceived: {
    calendar: "calendarDaysA1ToReceived",
    business: "businessDaysA1ToReceived",
    label: "A1至接收"
  },
  currentA1ToReceived: {
    calendar: "calendarDaysCurrentA1ToReceived",
    business: "businessDaysCurrentA1ToReceived",
    label: "当前A1至接收"
  },
  receivedToNotice: {
    calendar: "calendarDaysReceivedToNotice",
    business: "businessDaysReceivedToNotice",
    label: "接收至通知"
  },
  a1ToNotice: {
    calendar: "calendarDaysA1ToNotice",
    business: "businessDaysA1ToNotice",
    label: "A1至通知"
  },
  a1ToListing: {
    calendar: "calendarDaysA1ToListing",
    business: "businessDaysA1ToListing",
    label: "A1至上市"
  }
};

const daySortFields = Object.values(dayFieldPairs).flatMap((item) => [item.calendar, item.business]);

const statusSortRank = {
  notice_issued: 10,
  regulator_opinion: 20,
  supplement_requested: 30,
  csrc_received: 40,
  not_required: 80,
  applicability_pending: 95,
  waiting_received: 90,
  review_pending: 100,
  pending_match: 100
};

const descendingDefaultSortFields = new Set([
  "a1Date",
  "currentA1Date",
  "hkexLatestDocumentDate",
  "csrcReceivedDate",
  "csrcCurrentReceivedDate",
  "noticeDate",
  "hkexListingDate",
  "calendarDaysA1ToReceived",
  "calendarDaysCurrentA1ToReceived",
  "calendarDaysReceivedToNotice",
  "calendarDaysA1ToNotice",
  "businessDaysA1ToReceived",
  "businessDaysCurrentA1ToReceived",
  "businessDaysReceivedToNotice",
  "businessDaysA1ToNotice",
  "calendarDaysCurrentA1ToNotice",
  "businessDaysCurrentA1ToNotice",
  "aShareMarketCapAtA1RmbBn",
  "listingMarketCapHkdBn"
]);

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const integerFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const rmbBnFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const rmbYiFormatter = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 1 });

function setLoading(isLoading) {
  const loader = document.getElementById("loadingScreen");
  if (!loader) return;
  loader.classList.toggle("is-hidden", !isLoading);
  loader.setAttribute("aria-hidden", String(!isLoading));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function asDateValue(value) {
  if (!value) return null;
  const time = Date.parse(`${value}T00:00:00+08:00`);
  return Number.isNaN(time) ? null : time;
}

function formatDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return formatPending();
  return String(value);
}

function formatDatePlain(value) {
  const html = formatDate(value);
  return html.includes("<span") ? "—" : html;
}

function formatNumber(value, mode = "decimal") {
  if (value === null || value === undefined || value === "" || Number.isNaN(value)) return "待披露";
  return mode === "integer" ? integerFormatter.format(value) : numberFormatter.format(value);
}

function parseVisitCounterValue(value) {
  const compact = String(value ?? "").replaceAll(",", "").trim();
  if (!/^\d+$/.test(compact)) return null;
  const parsed = Number(compact);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function visitCounterPresentation(sitePv, siteUv) {
  const pv = parseVisitCounterValue(sitePv);
  const uv = parseVisitCounterValue(siteUv);
  if (pv === null || uv === null || (pv === 0 && uv === 0)) return null;

  if (pv >= uv) {
    return {
      displayPv: formatNumber(pv, "integer"),
      displayUv: formatNumber(uv, "integer"),
      state: "exact",
      title: ""
    };
  }

  return {
    displayPv: `≥${formatNumber(uv, "integer")}`,
    displayUv: formatNumber(uv, "integer"),
    state: "lower-bound",
    title:
      "访问量历史基线异常，暂显示由访客数可证实的最低访问量。 Historical PV baseline is inconsistent; showing the defensible minimum."
  };
}

function initVisitCounter() {
  const container = document.getElementById("siteVisitCounter");
  const pvElement = document.getElementById("busuanzi_value_site_pv");
  const uvElement = document.getElementById("busuanzi_value_site_uv");
  if (!container || !pvElement || !uvElement) return;

  container.hidden = false;
  container.style.display = "";
  const pvWrap = document.getElementById("busuanzi_container_site_pv");
  const uvWrap = document.getElementById("busuanzi_container_site_uv");
  if (pvWrap) pvWrap.style.display = "";
  if (uvWrap) uvWrap.style.display = "";
  if (typeof MutationObserver === "undefined") return;

  let timeoutId = null;
  const observer = new MutationObserver(renderWhenReady);

  function renderWhenReady() {
    const presentation = visitCounterPresentation(pvElement.textContent, uvElement.textContent);
    if (!presentation) return;

    observer.disconnect();
    if (timeoutId !== null) window.clearTimeout(timeoutId);
    pvElement.textContent = presentation.displayPv;
    uvElement.textContent = presentation.displayUv;
    container.dataset.counterState = presentation.state;
    container.classList.toggle("is-lower-bound", presentation.state === "lower-bound");
    container.title = presentation.title;
    container.setAttribute(
      "aria-label",
      `自上线累计，访问量 ${presentation.displayPv}，访客 ${presentation.displayUv}`
    );
    container.hidden = false;
    container.style.display = "";
    if (pvWrap) pvWrap.style.display = "";
    if (uvWrap) uvWrap.style.display = "";
  }

  observer.observe(pvElement, { childList: true, characterData: true, subtree: true });
  observer.observe(uvElement, { childList: true, characterData: true, subtree: true });
  renderWhenReady();
  timeoutId = window.setTimeout(() => observer.disconnect(), 8000);
}

function formatDayValue(value) {
  if (value === null || value === undefined || value === "" || Number.isNaN(value)) return "—";
  return integerFormatter.format(Math.ceil(value));
}

function formatDayNumber(value, unit = dayUnitLabel()) {
  return typeof value === "number" ? `${formatDayValue(value)} ${unit}` : "—";
}

function formatPending() {
  return `<span aria-label="无公开日期">—</span>`;
}

function isAhCandidate(record) {
  return Boolean(record.isAH) || Boolean(record.aShareCode) || String(record.aShareStatus || "").includes("A-share listed");
}

function isHkexListed(record) {
  const rawStatus = String(record.hkexPublicStatus || "").trim();
  return Boolean(record.hkexListingDate) || rawStatus.toLowerCase() === "listed" || rawStatus === "已上市" || (record.statusTags || []).includes("已上市");
}

// BEGIN shared tracker timing (sync_sponsor_timing.py)
function postRegimeListingDate(date, regimeStart) {
  return Boolean(date) && String(date) >= (regimeStart || "2023-03-31");
}

function timingNoticeGap(record, listingDate, regimeStart) {
  return record.csrcFilingRequired === true && !record.noticeDate && postRegimeListingDate(listingDate, regimeStart);
}

function isSpecialTimingRoute(record) {
  return ["de_spac", "hdr", "gem_to_main_transfer", "introduction", "rto"].includes(record.specialListingRoute);
}

const verifiedReceiptCycles20261124 = {"ganzhou hemay pharmaceutical co., ltd. - b":[{"a1Date":"2025-05-29","receivedDate":"2025-06-20","calendarDays":22,"businessDays":15,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 995 (Ganzhou Hemay)","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook as of 2025-09-19, Sheet1 row 133; 赣州和美药业股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"},{"a1Date":"2025-12-01","receivedDate":"2025-12-06","calendarDays":5,"businessDays":4,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 654 (Ganzhou Hemay)","receivedSourceUrl":"https://hzfimage.mofcom.gov.cn/attach/202601/20260115142650315.xlsx","receivedLocator":"CSRC status workbook as of 2026-01-09, Sheet1 row 259; 赣州和美药业股份有限公司","receivedWorkbookSha256":"a1afda173b7d720eb55f051f3c4f7d97d23b685a0df4de9aef83cbc598d63dca"}],"eve energy co., ltd.":[{"a1Date":"2025-06-30","receivedDate":"2025-07-25","calendarDays":25,"businessDays":19,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 912 (EVE Energy)","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook as of 2025-09-19, Sheet1 row 207; 惠州亿纬锂能股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"},{"a1Date":"2026-01-02","receivedDate":"2026-01-08","calendarDays":6,"businessDays":5,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 568 (EVE Energy)","receivedSourceUrl":"https://hzfimage.mofcom.gov.cn/attach/202601/20260115142650315.xlsx","receivedLocator":"CSRC status workbook as of 2026-01-09, Sheet1 row 285; 惠州亿纬锂能股份有限公司","receivedWorkbookSha256":"a1afda173b7d720eb55f051f3c4f7d97d23b685a0df4de9aef83cbc598d63dca"}],"listed:09980":[{"a1Date":"2025-04-03","receivedDate":"2025-04-11","calendarDays":8,"businessDays":5,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 1068","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 53; 东鹏饮料（集团）股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"}],"janbon materials co., ltd. (formerly known as janbon high tech co., ltd.)":[{"a1Date":"2025-05-02","receivedDate":"2025-05-23","calendarDays":21,"businessDays":14,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 1029","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 87; Janbon High Tech Co., Ltd.（建邦高科有限公司）","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"},{"a1Date":"2025-11-07","receivedDate":"2025-11-13","calendarDays":6,"businessDays":4,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 702","receivedSourceUrl":"https://hzfimage.mofcom.gov.cn/attach/202601/20260115142650315.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 220; Janbon High Tech Co., Ltd.\n（建邦高科有限公司）","receivedWorkbookSha256":"a1afda173b7d720eb55f051f3c4f7d97d23b685a0df4de9aef83cbc598d63dca"}],"beijing deepzero technology co., ltd.":[{"a1Date":"2025-05-28","receivedDate":"2025-06-09","calendarDays":12,"businessDays":7,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 1000","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 110; 北京深演智能科技股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"},{"a1Date":"2025-12-01","receivedDate":"2025-12-06","calendarDays":5,"businessDays":4,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 653","receivedSourceUrl":"https://hzfimage.mofcom.gov.cn/attach/202601/20260115142650315.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 258; 北京深演智能科技股份有限公司","receivedWorkbookSha256":"a1afda173b7d720eb55f051f3c4f7d97d23b685a0df4de9aef83cbc598d63dca"}],"listed:03355":[{"a1Date":"2025-05-27","receivedDate":"2025-06-20","calendarDays":24,"businessDays":17,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 1005","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 129; 深圳市飞速创新技术股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"},{"a1Date":"2025-12-10","receivedDate":"2025-12-11","calendarDays":1,"businessDays":1,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 634","receivedSourceUrl":"https://hzfimage.mofcom.gov.cn/attach/202601/20260115142650315.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 264; 深圳市飞速创新技术股份有限公司","receivedWorkbookSha256":"a1afda173b7d720eb55f051f3c4f7d97d23b685a0df4de9aef83cbc598d63dca"}],"shanghai meditrust health technology group co., ltd.":[{"a1Date":"2025-06-30","receivedDate":"2025-07-09","calendarDays":9,"businessDays":7,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 918","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 171; 上海镁信健康集团股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"}],"bluefocus intelligent communications group co., ltd.":[{"a1Date":"2025-06-25","receivedDate":"2025-07-10","calendarDays":15,"businessDays":11,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 946","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 178; 北京蓝色光标数据科技集团股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"}],"suzhou ecmax technology co., ltd. (formerly known as suzhou ecmax information te":[{"a1Date":"2025-06-18","receivedDate":"2025-07-25","calendarDays":37,"businessDays":27,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 963","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 205; 苏州极易科技股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"}],"joulwatt technology co., ltd.":[{"a1Date":"2025-05-30","receivedDate":"2025-06-20","calendarDays":21,"businessDays":14,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 990","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 132; 杰华特微电子股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"}],"shenzhen ldrobot co., ltd":[{"a1Date":"2025-05-30","receivedDate":"2025-06-13","calendarDays":14,"businessDays":9,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 993","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 122; 深圳乐动机器人股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"},{"a1Date":"2025-12-01","receivedDate":"2025-12-11","calendarDays":10,"businessDays":8,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 658","receivedSourceUrl":"https://hzfimage.mofcom.gov.cn/attach/202601/20260115142650315.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 263; 深圳乐动机器人股份有限公司","receivedWorkbookSha256":"a1afda173b7d720eb55f051f3c4f7d97d23b685a0df4de9aef83cbc598d63dca"}],"xiamen hithium energy storage technology co., ltd.":[{"a1Date":"2025-03-25","receivedDate":"2025-04-09","calendarDays":15,"businessDays":10,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 1079","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 52; 厦门海辰储能科技股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"},{"a1Date":"2025-10-27","receivedDate":"2025-11-06","calendarDays":10,"businessDays":8,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 742","receivedSourceUrl":"https://hzfimage.mofcom.gov.cn/attach/202601/20260115142650315.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 207; 厦门海辰储能科技股份有限公司","receivedWorkbookSha256":"a1afda173b7d720eb55f051f3c4f7d97d23b685a0df4de9aef83cbc598d63dca"}],"listed:02726":[{"a1Date":"2025-04-08","receivedDate":"2025-05-13","calendarDays":35,"businessDays":23,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 1067","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 75; 瀚天天成电子科技（厦门）股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"},{"a1Date":"2025-10-14","receivedDate":"2025-10-24","calendarDays":10,"businessDays":8,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 761","receivedSourceUrl":"https://hzfimage.mofcom.gov.cn/attach/202601/20260115142650315.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 194; 瀚天天成电子科技（厦门）股份有限公司","receivedWorkbookSha256":"a1afda173b7d720eb55f051f3c4f7d97d23b685a0df4de9aef83cbc598d63dca"}],"yusys technologies co., ltd.":[{"a1Date":"2025-06-18","receivedDate":"2025-06-26","calendarDays":8,"businessDays":6,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 964","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 139; 北京宇信科技集团股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"},{"a1Date":"2025-12-24","receivedDate":"2026-01-05","calendarDays":12,"businessDays":7,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 600","receivedSourceUrl":"https://hzfimage.mofcom.gov.cn/attach/202601/20260115142650315.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 279; 北京宇信科技集团股份有限公司","receivedWorkbookSha256":"a1afda173b7d720eb55f051f3c4f7d97d23b685a0df4de9aef83cbc598d63dca"}],"gpixel changchun microelectronics inc.":[{"a1Date":"2025-06-19","receivedDate":"2025-07-02","calendarDays":13,"businessDays":9,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 958","receivedSourceUrl":"https://xzcs-video.oss-cn-beijing.aliyuncs.com/uploads/20250922/72dd62b21c8bb2558e489972c298c92e.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 152; 长春长光辰芯微电子股份有限公司","receivedWorkbookSha256":"05893c2deb2e7e92f0b2293bd2e60ef7cba91534ad3f6f35b85caed64c29b474"},{"a1Date":"2025-12-19","receivedDate":"2025-12-31","calendarDays":12,"businessDays":8,"a1SourceUrl":"https://www1.hkexnews.hk/app/documents/sehkconsolidatedindex.xlsx","a1Locator":"SEHK Consolidated Index row 615","receivedSourceUrl":"https://hzfimage.mofcom.gov.cn/attach/202601/20260115142650315.xlsx","receivedLocator":"CSRC status workbook, Sheet1 row 272; 长春长光辰芯微电子股份有限公司","receivedWorkbookSha256":"a1afda173b7d720eb55f051f3c4f7d97d23b685a0df4de9aef83cbc598d63dca"}]};
function applyVerifiedReceiptCycles(payload) {
 if (!Array.isArray(payload?.records)) return payload;
 let changed=false;
 const records=payload.records.map(r=>{
  const cycles=verifiedReceiptCycles20261124[r.id];
  if (!cycles || r.a1ReceiptTiming?.policy==="longest_verified_same_cycle" || r.a1Date!==cycles[0].a1Date) return r;
  const first=cycles[0], rec=(r.csrcFirstReceivedDate||r.csrcReceivedDate||"");
  if (rec && rec < first.receivedDate) return r;
  const selected=cycles.reduce((best,c)=>c.calendarDays>best.calendarDays?c:best);
  changed=true;
  const next={...r,csrcReceivedDate:first.receivedDate,csrcFirstReceivedDate:first.receivedDate,
   csrcReceivedDateIsAsOf:false,csrcFirstReceivedDateIsAsOf:false,
   csrcFirstReceivedSourceKind:"archived_csrc_status_xlsx",csrcFirstReceivedSourceSnapshotDate:"2025-09-19",
   calendarDaysA1ToReceived:selected.calendarDays,businessDaysA1ToReceived:selected.businessDays,
   a1ReceiptTiming:{policy:"longest_verified_same_cycle",reviewedAt:"2026-11-24",a1Date:selected.a1Date,receivedDate:selected.receivedDate,calendarDays:selected.calendarDays,businessDays:selected.businessDays,cycles}};
  // In this issuer's historic field the prior 214-day display paired a 2025 receipt and the 2026 notice.
  if(r.id==="ganzhou hemay pharmaceutical co., ltd. - b"&&r.noticeDate==="2026-07-08"&&r.calendarDaysReceivedToNotice===214){
   next.calendarDaysReceivedToNotice=null;next.businessDaysReceivedToNotice=null;
  }
  next.sourceLinks=[...(r.sourceLinks||[]),{label:"证监会备案情况表（2025-09-19 存档）",url:first.receivedSourceUrl}];
  return next;
 });
 return changed?{...payload,records}:payload;
}

function timingSample(record, metric, field, currentReceiptField, stage, listingDate, regimeStart) {
  if (isSpecialTimingRoute(record)) return null;
  if (metric === "a1ToListing") {
    if (record.listingDurationSampleEligible === false) return null;
  } else {
    if (record.csrcFilingRequired !== true || record.durationSampleEligible === false) return null;
    if (record.noticeSupersededByCurrentFiling && ["a1ToNotice", "receivedToNotice"].includes(metric)) return null;
    if (timingNoticeGap(record, listingDate, regimeStart)) return null;
    if (metric === "a1ToReceived" && record.a1ReceiptTiming?.policy === "longest_verified_same_cycle") {
      const selected = record.a1ReceiptTiming[field.startsWith("business") ? "businessDays" : "calendarDays"];
      return Number.isFinite(selected) ? selected : null;
    }
    if (metric === "a1ToReceived" && stage !== "listed" && record.calendarDaysA1ToReceived > 180) {
      field = currentReceiptField;
    }
  }
  return Number.isFinite(record[field]) ? record[field] : null;
}
// END shared tracker timing

function isPostRegimeListed(record) {
  return postRegimeListingDate(record.hkexListingDate, state.data?.meta?.csrcRegimeEffectiveDate);
}

function hasNoticeGapAfterListing(record) {
  return timingNoticeGap(record, record.hkexListingDate, state.data?.meta?.csrcRegimeEffectiveDate);
}

function hkexListingStage(record) {
  // practicalStage is computed by the exporter: lapsed/withdrawn issuers with
  // live CSRC progress stay in "applying" (they almost always refile); only
  // genuinely stale cases park in "other".
  if (record.practicalStage) return record.practicalStage;
  if (isPostRegimeListed(record)) return "listed";
  const rawStatus = String(record.hkexPublicStatus || "").trim();
  const normalized = rawStatus.toLowerCase();
  if (["active", "processing"].includes(normalized) || rawStatus === "處理中" || rawStatus === "处理中") return "applying";
  if (["lapsed", "withdrawn", "rejected"].includes(normalized) || ["失效", "撤回", "拒绝", "拒絕"].includes(rawStatus)) return "other";
  return "applying";
}

function hkexStageLabel(stage) {
  const labels = {
    all: "全部 All",
    applying: "上市申请中 In application",
    listed: "已上市 Listed",
    other: "搁置/撤回 Stalled / withdrawn"
  };
  return labels[stage] || stage;
}

let stageCountsCache = null;

function hkexListingStageCounts(records = state.data?.records || []) {
  if (records === state.data?.records && stageCountsCache) return stageCountsCache;
  const counts = { all: records.length, applying: 0, listed: 0, other: 0 };
  for (const record of records) {
    const stage = hkexListingStage(record);
    counts[stage] = (counts[stage] || 0) + 1;
  }
  if (records === state.data?.records) stageCountsCache = counts;
  return counts;
}

function syncListingStageButtons() {
  const stageCounts = hkexListingStageCounts();
  document.querySelectorAll("[data-hkex-stage]").forEach((button) => {
    const stage = button.dataset.hkexStage;
    button.classList.toggle("is-active", stage === state.hkexStage);
    button.setAttribute("aria-pressed", String(stage === state.hkexStage));
    button.title = `${hkexStageLabel(stage)}：${formatNumber(stageCounts[stage] || 0, "integer")} 家`;
  });
  document.querySelectorAll("[data-stage-count]").forEach((item) => {
    const stage = item.dataset.stageCount;
    item.textContent = formatNumber(stageCounts[stage] || 0, "integer");
  });
}

const allStageListingMetric = {
  metric: "a1ToListing",
  labelZh: "首次A1至上市天数",
  labelEn: "First A1 to HKEX listing days",
  note: "按HKEX New Listing Report上市日样本；密交/疑似密交/De-SPAC/HDR剔除；无需备案发行人可纳入"
};

function currentMetricDefinitions() {
  if (state.hkexStage === "listed") return listedMetricDefinitions;
  if (state.hkexStage === "all") return [...metricDefinitions, allStageListingMetric];
  if (state.hkexStage === "other") return [];
  return metricDefinitions;
}

function currentDayMetricEntries() {
  const metrics = state.hkexStage === "listed"
    ? ["a1ToNotice", "a1ToListing"]
    : state.hkexStage === "all"
      ? ["a1ToReceived", "currentA1ToReceived", "receivedToNotice", "a1ToNotice", "a1ToListing"]
      : ["a1ToReceived", "currentA1ToReceived", "receivedToNotice", "a1ToNotice"];
  return metrics.map((metric) => dayFieldPairs[metric]).filter(Boolean);
}

function issuerTypeKey(record) {
  if (record.issuerTypeKey) return record.issuerTypeKey;
  if (record.specialListingRoute === "de_spac") return "de_spac";
  if (record.specialListingRoute === "hdr") return "hdr";
  if (isAhCandidate(record)) return "a_h";
  const structure = String(record.structureType || record.rawStructureType || "").trim().toLowerCase();
  if (/^de[- ]spac\b/.test(structure)) return "de_spac";
  if (/^hdr\b|^depositary receipt/.test(structure)) return "hdr";
  if (/^h[- ]share\b|^prc-incorporated\b|^h股/.test(structure)) return "h_share";
  if (/^red[- ]?chip\b|^红筹|^紅籌/.test(structure)) return "red_chip";
  return "other";
}

function issuerTypeInfo(recordOrKey) {
  const key = typeof recordOrKey === "string" ? recordOrKey : issuerTypeKey(recordOrKey);
  const labels = {
    a_h: { primary: "A+H", secondary: "A-share + H-share", rank: 1 },
    h_share: { primary: "H股", secondary: "H-share", rank: 2 },
    red_chip: { primary: "红筹", secondary: "Red-chip", rank: 3 },
    de_spac: { primary: "De-SPAC", secondary: "De-SPAC", rank: 4 },
    hdr: { primary: "HDR", secondary: "Depositary receipts", rank: 5 },
    other: { primary: "港资/海外", secondary: "HK & Overseas", rank: 9 }
  };
  return labels[key] || labels.other;
}

const RECORD_INDUSTRY_OVERRIDES = {
  "genor biopharma holdings limited": {
    csrcCats: ["医药制造业"],
    bizTags: ["生物医药 / 创新药"]
  },
  "csrc_notice:7672176": {
    csrcCats: ["计算机、通信和其他电子设备制造业"],
    bizTags: ["半导体 / 5G及卫星基带芯片"]
  }
};

function effectiveIndustryMeta(record) {
  const ov = RECORD_INDUSTRY_OVERRIDES[record?.id];
  const csrcCats = (record?.csrcIndustryTags?.length ? record.csrcIndustryTags : ov?.csrcCats) || [];
  const rawBiz = (record?.industryTags?.length ? record.industryTags : ov?.bizTags) || [];
  const bizTags = rawBiz.filter(t => !csrcCats.includes(t));
  const rawFallback = record?.industryDisplayLabel && !/Undetermined|未确定/i.test(record.industryDisplayLabel)
    ? record.industryDisplayLabel
    : "综合 / 待招股书披露";
  return { csrcCats, bizTags, fallbackLabel: rawFallback };
}

function renderIssuerType(record) {
  const info = issuerTypeInfo(record);
  return `<span class="issuer-type-primary">${escapeHtml(info.primary)}</span><span class="pending-en">${escapeHtml(info.secondary)}</span>`;
}

function formatChineseUnitAmount(rawValue, currency = "", approximate = false) {
  const n = Number(rawValue);
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  const prefix = `${approximate ? "约 " : ""}${sign}${currency ? currency + " " : ""}`;
  if (abs >= 1e8) {
    const yi = abs / 1e8;
    return `${prefix}${yi.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}亿`;
  }
  if (abs >= 1e4) {
    const wan = abs / 1e4;
    const isExactWan = Math.abs(wan - Math.round(wan)) < 0.05;
    return `${prefix}${wan.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: isExactWan ? 0 : 1 })}万`;
  }
  return `${prefix}${abs.toLocaleString("en-US", { maximumFractionDigits: 1 })}`;
}

function formatMarketCap(record) {
  const v = record.aShareMarketCapAtA1RmbBn;
  if (!isAhCandidate(record)) return "不适用";
  if (!Number.isFinite(v) || v <= 0) return formatPending();
  return `<span title="¥${rmbBnFormatter.format(v)}B">CNY ${rmbYiFormatter.format(v * 10)}亿</span>`;
}

function formatListingMarketCap(record) {
  const v = record.listingMarketCapHkdBn;
  if (record.listingMarketCapSampleEligible !== true || !Number.isFinite(v) || v <= 0) return "—";
  const exact = Math.round(v * 1e9).toLocaleString("en-US");
  const isEst = record.listingMarketCapProvenance?.status === "estimate";
  return `<span title="HKD ${exact}${isEst ? " · 招股书/股权公开口径" : ""}">HKD ${rmbYiFormatter.format(v * 10)}亿${isEst ? '<sup class="mcap-est-tag" title="按招股书或股权公开口径估值">估</sup>' : ""}</span>`;
}

function renderValuationDetails(record, listing) {
  const data = record[listing ? "listingMarketCapProvenance" : "aShareMarketCapProvenance"];
  if (listing && !["verified","estimate"].includes(data?.status)) {
    const quote = record.hkListingSessionClose;
    if (!quote) return "";
    return `<div class="timeline-row"><span>港股收市价 / HK closing price</span><strong>HK$${escapeHtml(quote.price)} · ${escapeHtml(quote.priceDate)}</strong><a href="${escapeHtml(quote.sourceUrl)}" target="_blank" rel="noopener noreferrer">行情来源</a></div>`;
  }
  if (!data) return "";
  const policies = {
    hk_ordinary_historical_estimate: "港股收盘价计量全部普通股 / Full ordinary equity at HK close",
    ah_components_ex_treasury: "A/H分别估值，折算港币 / A/H components in HKD",
    hk_ordinary_ex_treasury: "港股收盘价计量全部普通股 / Full ordinary equity at HK close",
    hk_hdr_and_idx_ordinary_ex_treasury: "香港预托证券与印尼其余普通股分别按当地收盘价计值 / HK depositary receipts and remaining IDX shares at local closing prices",
  };
  const rows = [
    ["估值锚点 Valuation anchor", data.anchorDate],
    ...(!listing ? [["价格日期 Price date", data.priceDate], ["股本日期 Share date", data.sharesAsOf]] : []),
    ["估值口径 Basis", policies[data.policy]],
    ["币种 Currency", data.valueCurrency],
  ];
  for (const item of (data.components || [])) {
    const quantityLabel = data.status === "estimate" ? "估值采用股数 / Shares used" : item.class === "HDR" ? "香港预托证券份数 / HK depositary receipts" : `${item.class} 股数（不含库存股） / Shares ex treasury`;
    rows.push([quantityLabel, item.sharesExTreasury == null ? null : formatNumber(item.sharesExTreasury)]);
    rows.push([`${item.class} 股本日期 / Share date`, item.sharesAsOf]);
    rows.push([`${item.class} 收盘价 / Closing price`, item.price == null ? null : `${item.priceCurrency} ${item.price} · ${item.priceDate || ""}`]);
    if (item.priceStatus === "verified" && item.priceDatePolicy === "latest_exchange_session_on_or_before_valuation_date" && item.priceDate !== data.anchorDate) {
      rows.push([`${item.class} 价格口径 / Price basis`, "估值日休市，沿用最近交易日收盘价 / Market closed; most recent trading close"]);
    }
  }
  if (listing && ["ah_components_ex_treasury", "hk_hdr_and_idx_ordinary_ex_treasury"].includes(data.policy)) {
    const fx = data.fx;
    const base = data.policy === "ah_components_ex_treasury" ? "CNY" : "IDR";
    const complete = data.fxStatus === "verified" && fx?.baseCurrency === base && fx.quoteCurrency === "HKD"
      && (typeof fx.rate === "number" || (typeof fx.rate === "string" && /^\d+(?:\.\d+)?$/.test(fx.rate)))
      && Number.isFinite(Number(fx.rate)) && Number(fx.rate) > 0
      && typeof fx.date === "string" && fx.date === data.anchorDate && /^\d{4}-\d{2}-\d{2}$/.test(fx.date)
      && new Date(fx.date + "T00:00:00Z").toJSON()?.slice(0, 10) === fx.date;
    const displayRate = base === "IDR" && complete ? Number(fx.rate).toPrecision(8) : fx?.rate;
    rows.push(["当日汇率 FX", complete ? `${fx.baseCurrency}/${fx.quoteCurrency} ${displayRate} · ${fx.date}` : null]);
  }
  return `<div class="timeline">${rows.filter(([, value]) => value != null && value !== "").map(([label, value]) => `<div class="timeline-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</div>`;
}

function hasCjk(value) {
  return /[\u3400-\u9fff]/.test(String(value || ""));
}

function nameParts(record) {
  if (hasCjk(record.csrcName)) {
    return { primary: record.csrcName, secondary: record.issuerName };
  }
  return { primary: record.issuerName, secondary: record.csrcName };
}

function statusLabel(status, index = 0) {
  return (state.data?.meta?.statusLabels?.[status] || statusLabels[status] || [status, status])[index];
}

function publicStatusKey(status) {
  return statusLabel(status) === statusLabel("applicability_pending") ? "applicability_pending" : status;
}

function dayUnitLabel() {
  return state.dayCountMode === "business" ? "工作日" : "自然日";
}

function dayBasisNote() {
  return state.dayCountMode === "business" ? "按中国节假日调休口径" : "按自然日差值";
}

function dayMetricEntry(field) {
  return Object.values(dayFieldPairs).find((item) => item.calendar === field || item.business === field) || null;
}

function fieldForDayMode(field, mode = state.dayCountMode) {
  const entry = dayMetricEntry(field);
  return entry ? entry[mode] : field;
}

function dayMetricField(metric) {
  return dayFieldPairs[metric]?.[state.dayCountMode] || metric;
}

function setDaySelectOptions() {
  const select = document.getElementById("daySortField");
  if (!select) return;
  const entries = currentDayMetricEntries();
  if (!entries.some((entry) => entry[state.dayCountMode] === state.daySortField)) {
    state.daySortField = entries[0]?.[state.dayCountMode] || fieldForDayMode(state.daySortField, state.dayCountMode);
    if (daySortFields.includes(state.sortField)) {
      state.sortField = state.daySortField;
      state.sortDir = defaultSortDir(state.daySortField);
    }
  }
  const html = entries
    .map((entry) => `<option value="${escapeHtml(entry[state.dayCountMode])}">${escapeHtml(entry.label)}</option>`)
    .join("");
  if (select.innerHTML !== html) select.innerHTML = html;
  select.title = dayMetricForField(state.daySortField) === "a1ToListing"
    ? "A1至上市默认升序（最快优先）"
    : "选择天数排序口径";
}

const sponsorDisplayRules = [
  { pattern: /China International Capital|CICC/i, shortName: "中金", aliases: ["CICC", "中国国际金融", "China International Capital"] },
  { pattern: /CITIC Securities/i, shortName: "中信证券", aliases: ["CITIC", "中信", "CITIC Securities"] },
  { pattern: /China Securities.*International/i, shortName: "中信建投国际", aliases: ["中信建投", "CSC", "China Securities"] },
  { pattern: /Huatai/i, shortName: "华泰国际", aliases: ["华泰", "Huatai"] },
  { pattern: /Guotai Junan/i, shortName: "国泰君安", aliases: ["国泰君安国际", "GTJA", "Guotai Junan"] },
  { pattern: /CMB International/i, shortName: "招银国际", aliases: ["招银", "CMBI", "CMB International"] },
  { pattern: /China Merchants Securities/i, shortName: "招商证券", aliases: ["招商", "CMS", "China Merchants"] },
  { pattern: /Haitong/i, shortName: "海通国际", aliases: ["海通", "Haitong"] },
  { pattern: /J\.?P\.?\s*Morgan|JP Morgan/i, shortName: "摩根大通", aliases: ["JPM", "J.P. Morgan", "JP Morgan"] },
  { pattern: /CCB International|CCBI/i, shortName: "建银国际", aliases: ["建银", "CCBI", "CCB International"] },
  { pattern: /GF Capital|GF Securities/i, shortName: "广发", aliases: ["广发证券", "GF", "GF Securities"] },
  { pattern: /ABCI/i, shortName: "农银国际", aliases: ["农银", "ABCI"] },
  { pattern: /Goldman/i, shortName: "高盛", aliases: ["Goldman Sachs"] },
  { pattern: /Morgan Stanley/i, shortName: "摩根士丹利", aliases: ["MS", "Morgan Stanley"] },
  { pattern: /CLSA|CITIC CLSA/i, shortName: "中信里昂", aliases: ["里昂", "CLSA"] },
  { pattern: /Citigroup|Citi/i, shortName: "花旗", aliases: ["Citi", "Citigroup"] },
  { pattern: /BOCI/i, shortName: "中银国际", aliases: ["中银", "BOCI"] },
  { pattern: /Merrill|BofA|Bank of America/i, shortName: "美银", aliases: ["美林", "BofA", "Bank of America", "Merrill"] },
  { pattern: /China Galaxy/i, shortName: "银河国际", aliases: ["银河", "China Galaxy"] },
  { pattern: /CMBC International/i, shortName: "民银国际", aliases: ["民银", "CMBC"] },
  { pattern: /UBS/i, shortName: "瑞银", aliases: ["UBS", "瑞銀"] },
  { pattern: /Sinolink/i, shortName: "国金", aliases: ["国金证券", "Sinolink"] },
  { pattern: /ICBC International/i, shortName: "工银国际", aliases: ["工银", "ICBC"] },
  { pattern: /HSBC|Hongkong and Shanghai Banking/i, shortName: "汇丰", aliases: ["滙豐", "汇丰银行", "HSBC"] },
  { pattern: /Shenwan Hongyuan|Shenyin Wanguo/i, shortName: "申万宏源", aliases: ["申万", "申銀萬國", "Shenwan"] },
  { pattern: /Ping An/i, shortName: "平安", aliases: ["平安证券", "Ping An"] },
  { pattern: /Deutsche/i, shortName: "德银", aliases: ["德意志银行", "Deutsche"] },
  { pattern: /Zhongtai/i, shortName: "中泰国际", aliases: ["中泰", "Zhongtai"] },
  { pattern: /Jefferies/i, shortName: "杰富瑞", aliases: ["Jefferies"] },
  { pattern: /SPDB/i, shortName: "浦银国际", aliases: ["浦银", "SPDB"] },
  { pattern: /DBS/i, shortName: "星展", aliases: ["星展银行", "DBS"] },
  { pattern: /BNP/i, shortName: "法巴", aliases: ["法国巴黎银行", "BNP", "BNP Paribas"] },
  { pattern: /BOCOM/i, shortName: "交银国际", aliases: ["交银", "BOCOM"] },
  { pattern: /China Everbright|CEB International/i, shortName: "光大国际", aliases: ["光大", "Everbright", "CEB"] },
  { pattern: /Guoyuan/i, shortName: "国元", aliases: ["Guoyuan"] },
  { pattern: /Orient Capital/i, shortName: "东方融资", aliases: ["Orient Capital"] },
  { pattern: /Rainbow/i, shortName: "Rainbow", aliases: ["Rainbow"] },
  { pattern: /Sunny Fortune/i, shortName: "Sunny", aliases: ["Sunny Fortune"] },
  { pattern: /China Industrial Securities/i, shortName: "兴证国际", aliases: ["兴证", "China Industrial Securities"] },
  { pattern: /First Shanghai/i, shortName: "第一上海", aliases: ["First Shanghai"] },
  { pattern: /Yue Xiu/i, shortName: "越秀", aliases: ["Yue Xiu"] },
  { pattern: /Alliance Capital Partners/i, shortName: "Alliance", aliases: ["Alliance"] },
  { pattern: /SDIC|Essence/i, shortName: "国投证券", aliases: ["安信", "Essence", "SDIC"] },
  { pattern: /Quam/i, shortName: "华富建业", aliases: ["Quam"] },
  { pattern: /Zero2IPO/i, shortName: "清科", aliases: ["Zero2IPO"] },
  { pattern: /South China/i, shortName: "南华", aliases: ["South China"] },
  { pattern: /Lego/i, shortName: "Lego", aliases: ["Lego"] },
  { pattern: /VBG/i, shortName: "建泉", aliases: ["VBG"] },
  { pattern: /Guosen/i, shortName: "国信", aliases: ["Guosen"] },
  { pattern: /China Renaissance/i, shortName: "华兴", aliases: ["华兴资本", "China Renaissance"] },
  { pattern: /Goldlink/i, shortName: "金联", aliases: ["Goldlink"] },
  { pattern: /Dongxing/i, shortName: "东兴", aliases: ["Dongxing"] },
  { pattern: /Macquarie/i, shortName: "麦格理", aliases: ["Macquarie"] },
  { pattern: /Altus/i, shortName: "浩德", aliases: ["Altus"] },
  { pattern: /Red Sun/i, shortName: "红日", aliases: ["Red Sun"] },
  { pattern: /Cinda/i, shortName: "信达国际", aliases: ["信达", "Cinda"] },
  { pattern: /Caitong/i, shortName: "财通国际", aliases: ["财通", "Caitong"] },
  { pattern: /Innovax/i, shortName: "创升", aliases: ["Innovax"] },
  { pattern: /Somerley/i, shortName: "新百利", aliases: ["Somerley"] },
  { pattern: /China Sunrise/i, shortName: "华升", aliases: ["China Sunrise"] }
];

const traditionalToSimplified = {
  "萬": "万", "與": "与", "專": "专", "業": "业", "東": "东", "絲": "丝", "丟": "丢", "兩": "两", "嚴": "严", "喪": "丧", "個": "个", "豐": "丰",
  "臨": "临", "為": "为", "麗": "丽", "舉": "举", "麼": "么", "義": "义", "烏": "乌", "樂": "乐", "喬": "乔", "習": "习", "鄉": "乡",
  "書": "书", "買": "买", "亂": "乱", "爭": "争", "於": "于", "虧": "亏", "雲": "云", "亞": "亚", "產": "产", "畝": "亩", "親": "亲",
  "褻": "亵", "嚲": "亸", "億": "亿", "僅": "仅", "從": "从", "侖": "仑", "倉": "仓", "儀": "仪", "們": "们", "價": "价", "眾": "众",
  "優": "优", "會": "会", "傘": "伞", "偉": "伟", "傳": "传", "傷": "伤", "倫": "伦", "偽": "伪", "佇": "伫", "體": "体", "餘": "余",
  "傭": "佣", "僉": "佥", "俠": "侠", "侶": "侣", "僥": "侥", "偵": "侦", "側": "侧", "僑": "侨", "儈": "侩", "儂": "侬", "儼": "俨",
  "儉": "俭", "債": "债", "傾": "倾", "偻": "偻", "償": "偿", "儲": "储", "兒": "儿", "兌": "兑", "內": "内", "兩": "两", "冊": "册",
  "寫": "写", "軍": "军", "農": "农", "馮": "冯", "沖": "冲", "決": "决", "況": "况", "凍": "冻", "淨": "净", "準": "准", "涼": "凉",
  "減": "减", "湊": "凑", "凜": "凛", "幾": "几", "鳳": "凤", "憑": "凭", "凱": "凯", "擊": "击", "鑿": "凿", "剎": "刹", "劑": "剂",
  "則": "则", "剛": "刚", "創": "创", "刪": "删", "別": "别", "剗": "刬", "剄": "刭", "剎": "刹", "劉": "刘", "劊": "刽", "劍": "剑",
  "剝": "剥", "劇": "剧", "勸": "劝", "辦": "办", "務": "务", "勛": "勋", "動": "动", "勵": "励", "勁": "劲", "勞": "劳", "勢": "势",
  "勻": "匀", "匭": "匦", "匯": "汇", "區": "区", "協": "协", "單": "单", "賣": "卖", "盧": "卢", "鹵": "卤", "衛": "卫", "卻": "却",
  "廠": "厂", "廳": "厅", "歷": "历", "厲": "厉", "壓": "压", "厭": "厌", "廈": "厦", "縣": "县", "參": "参", "雙": "双", "發": "发",
  "變": "变", "敘": "叙", "疊": "叠", "葉": "叶", "號": "号", "嘆": "叹", "嘰": "叽", "嚇": "吓", "嗎": "吗", "啟": "启", "吳": "吴",
  "吶": "呐", "嘔": "呕", "員": "员", "聽": "听", "嗆": "呛", "嗚": "呜", "詠": "咏", "鹹": "咸", "響": "响", "啞": "哑", "嘩": "哗",
  "噲": "哙", "喲": "哟", "嘜": "唛", "喚": "唤", "啄": "啄", "問": "问", "啓": "启", "啞": "哑", "嘖": "啧", "嘗": "尝", "嘮": "唠",
  "嘯": "啸", "嘰": "叽", "噴": "喷", "噸": "吨", "嚨": "咙", "嚐": "尝", "嚮": "向", "嚶": "嘤", "嚴": "严", "囑": "嘱", "囂": "嚣",
  "團": "团", "園": "园", "國": "国", "圖": "图", "圓": "圆", "聖": "圣", "場": "场", "壞": "坏", "塊": "块", "堅": "坚", "壇": "坛",
  "壩": "坝", "墳": "坟", "墜": "坠", "壟": "垄", "壘": "垒", "墾": "垦", "執": "执", "堯": "尧", "報": "报", "塢": "坞", "墊": "垫",
  "塵": "尘", "塹": "堑", "墮": "堕", "壯": "壮", "聲": "声", "殼": "壳", "壺": "壶", "處": "处", "備": "备", "複": "复", "夠": "够",
  "頭": "头", "誇": "夸", "夾": "夹", "奪": "夺", "奮": "奋", "奧": "奥", "妝": "妆", "婦": "妇", "媽": "妈", "嫵": "妩", "嫻": "娴",
  "嬌": "娇", "嬈": "娆", "娛": "娱", "媧": "娲", "嫗": "妪", "媼": "媪", "嬋": "婵", "嬸": "婶", "孫": "孙", "學": "学", "孿": "孪",
  "寧": "宁", "寶": "宝", "實": "实", "寵": "宠", "審": "审", "寫": "写", "寬": "宽", "賓": "宾", "寢": "寝", "對": "对", "尋": "寻",
  "導": "导", "將": "将", "爾": "尔", "塵": "尘", "嘗": "尝", "堯": "尧", "尷": "尴", "屍": "尸", "盡": "尽", "層": "层", "屜": "屉",
  "屬": "属", "岡": "冈", "島": "岛", "峽": "峡", "崗": "岗", "巋": "岿", "嶇": "岖", "嶄": "崭", "嶼": "屿", "歲": "岁", "豈": "岂",
  "嶺": "岭", "嶽": "岳", "巔": "巅", "幣": "币", "帥": "帅", "師": "师", "帳": "帐", "帶": "带", "幀": "帧", "幫": "帮", "幹": "干",
  "幾": "几", "庫": "库", "廁": "厕", "廂": "厢", "廄": "厩", "廈": "厦", "廚": "厨", "廝": "厮", "廟": "庙", "廠": "厂", "廡": "庑",
  "廢": "废", "廣": "广", "廩": "廪", "廬": "庐", "廳": "厅", "弒": "弑", "張": "张", "強": "强", "彆": "别", "彈": "弹", "彌": "弥",
  "彎": "弯", "彙": "汇", "彥": "彦", "後": "后", "徑": "径", "從": "从", "徠": "徕", "復": "复", "徵": "征", "徹": "彻", "恆": "恒",
  "恥": "耻", "悅": "悦", "悶": "闷", "惡": "恶", "惱": "恼", "惲": "恽", "愛": "爱", "愜": "惬", "愨": "悫", "愴": "怆", "愷": "恺",
  "愾": "忾", "態": "态", "慣": "惯", "慘": "惨", "慚": "惭", "慟": "恸", "慪": "怄", "慫": "怂", "慮": "虑", "慳": "悭", "慶": "庆",
  "憂": "忧", "憊": "惫", "憐": "怜", "憑": "凭", "憚": "惮", "憤": "愤", "憫": "悯", "憮": "怃", "憲": "宪", "憶": "忆", "懇": "恳",
  "應": "应", "懌": "怿", "懍": "懔", "懟": "怼", "懣": "懑", "懲": "惩", "懶": "懒", "懷": "怀", "懸": "悬", "懺": "忏", "懼": "惧",
  "懾": "慑", "戀": "恋", "戇": "戆", "戔": "戋", "戲": "戏", "戧": "戗", "戰": "战", "戩": "戬", "戶": "户", "拋": "抛", "挾": "挟",
  "捨": "舍", "掃": "扫", "掄": "抡", "掙": "挣", "掛": "挂", "採": "采", "揀": "拣", "換": "换", "揮": "挥", "損": "损", "搖": "摇",
  "搗": "捣", "搜": "搜", "搶": "抢", "摑": "掴", "摜": "掼", "摟": "搂", "摯": "挚", "摳": "抠", "摶": "抟", "撈": "捞", "撐": "撑",
  "撓": "挠", "撥": "拨", "撫": "抚", "撲": "扑", "撳": "揿", "撻": "挞", "撾": "挝", "撿": "捡", "擁": "拥", "擄": "掳", "擇": "择",
  "擊": "击", "擋": "挡", "擔": "担", "據": "据", "擠": "挤", "擬": "拟", "擯": "摈", "擰": "拧", "擱": "搁", "擲": "掷", "擴": "扩",
  "擺": "摆", "擻": "擞", "擾": "扰", "攆": "撵", "攏": "拢", "攔": "拦", "攖": "撄", "攙": "搀", "攜": "携", "攝": "摄", "攢": "攒",
  "攣": "挛", "攤": "摊", "攪": "搅", "攬": "揽", "敗": "败", "敘": "叙", "敵": "敌", "數": "数", "斂": "敛", "斃": "毙", "斕": "斓",
  "斬": "斩", "斷": "断", "於": "于", "時": "时", "晉": "晋", "晝": "昼", "暈": "晕", "暉": "晖", "暢": "畅", "暫": "暂", "曄": "晔",
  "曆": "历", "曇": "昙", "曉": "晓", "曖": "暧", "曠": "旷", "曨": "昽", "曬": "晒", "書": "书", "會": "会", "朧": "胧", "東": "东",
  "極": "极", "構": "构", "槍": "枪", "楓": "枫", "梟": "枭", "櫃": "柜", "檸": "柠", "檢": "检", "樓": "楼", "標": "标", "樞": "枢",
  "樣": "样", "樸": "朴", "樹": "树", "橋": "桥", "機": "机", "橢": "椭", "橫": "横", "檔": "档", "檯": "台", "檳": "槟", "檸": "柠",
  "櫥": "橱", "櫻": "樱", "權": "权", "欄": "栏", "欽": "钦", "歐": "欧", "殲": "歼", "殺": "杀", "殼": "壳", "毀": "毁", "毆": "殴",
  "畢": "毕", "氣": "气", "氫": "氢", "氬": "氩", "氳": "氲", "漢": "汉", "湯": "汤", "溝": "沟", "沒": "没", "淚": "泪", "淥": "渌",
  "潔": "洁", "潛": "潜", "潤": "润", "澀": "涩", "淵": "渊", "淶": "涞", "淺": "浅", "漿": "浆", "澆": "浇", "湞": "浈", "濁": "浊",
  "測": "测", "濟": "济", "瀏": "浏", "渾": "浑", "滸": "浒", "濃": "浓", "澤": "泽", "濤": "涛", "澗": "涧", "瀋": "沈", "瀘": "泸",
  "濾": "滤", "瀟": "潇", "灑": "洒", "灣": "湾", "滅": "灭", "燈": "灯", "靈": "灵", "災": "灾", "爐": "炉", "點": "点", "煉": "炼",
  "熾": "炽", "爍": "烁", "爛": "烂", "爭": "争", "爺": "爷", "牆": "墙", "牽": "牵", "犧": "牺", "狀": "状", "獨": "独", "狹": "狭",
  "獅": "狮", "獎": "奖", "獵": "猎", "豬": "猪", "貓": "猫", "現": "现", "瑋": "玮", "環": "环", "璽": "玺", "瓊": "琼", "電": "电",
  "畫": "画", "當": "当", "疇": "畴", "療": "疗", "瘡": "疮", "瘋": "疯", "瘍": "疡", "瘓": "痪", "瘞": "瘗", "瘡": "疮", "癆": "痨",
  "癇": "痫", "癉": "瘅", "癒": "愈", "癘": "疠", "癟": "瘪", "癢": "痒", "癤": "疖", "癥": "症", "癧": "疬", "癩": "癞", "癬": "癣",
  "癭": "瘿", "癮": "瘾", "癰": "痈", "癱": "瘫", "癲": "癫", "發": "发", "皚": "皑", "皰": "疱", "盜": "盗", "盞": "盏", "監": "监",
  "盤": "盘", "盧": "卢", "眥": "眦", "眾": "众", "睏": "困", "睜": "睁", "矚": "瞩", "矯": "矫", "礦": "矿", "碼": "码", "磚": "砖",
  "確": "确", "磧": "碛", "磯": "矶", "禪": "禅", "禮": "礼", "禱": "祷", "禍": "祸", "禎": "祯", "離": "离", "禿": "秃", "稅": "税",
  "穀": "谷", "穌": "稣", "積": "积", "穎": "颖", "窩": "窝", "窪": "洼", "窮": "穷", "竄": "窜", "竅": "窍", "竇": "窦", "競": "竞",
  "筆": "笔", "筍": "笋", "箋": "笺", "節": "节", "範": "范", "築": "筑", "篤": "笃", "簡": "简", "簽": "签", "簾": "帘", "籃": "篮",
  "籌": "筹", "籤": "签", "籲": "吁", "粵": "粤", "糞": "粪", "糧": "粮", "糾": "纠", "紀": "纪", "紂": "纣", "約": "约", "紅": "红",
  "紋": "纹", "納": "纳", "紐": "纽", "紓": "纾", "純": "纯", "紕": "纰", "紗": "纱", "紙": "纸", "級": "级", "紛": "纷", "紜": "纭",
  "紡": "纺", "緊": "紧", "細": "细", "紱": "绂", "紳": "绅", "紹": "绍", "紺": "绀", "終": "终", "絆": "绊", "組": "组", "絎": "绗",
  "結": "结", "絕": "绝", "絛": "绦", "絞": "绞", "絡": "络", "給": "给", "絢": "绚", "統": "统", "絲": "丝", "絳": "绛", "絹": "绢",
  "綁": "绑", "綃": "绡", "綏": "绥", "經": "经", "綜": "综", "綠": "绿", "綢": "绸", "綣": "绻", "綫": "线", "維": "维", "綱": "纲",
  "網": "网", "綴": "缀", "綵": "彩", "綸": "纶", "綹": "绺", "綺": "绮", "綻": "绽", "綽": "绰", "綾": "绫", "綿": "绵", "緄": "绲",
  "緇": "缁", "緊": "紧", "緋": "绯", "緒": "绪", "緘": "缄", "緙": "缂", "線": "线", "緝": "缉", "緞": "缎", "締": "缔", "緡": "缗",
  "緣": "缘", "編": "编", "緩": "缓", "緬": "缅", "緯": "纬", "練": "练", "緶": "缏", "緹": "缇", "緻": "致", "縈": "萦", "縉": "缙",
  "縊": "缢", "縋": "缒", "縐": "绉", "縑": "缣", "縛": "缚", "縝": "缜", "縞": "缟", "縟": "缛", "縣": "县", "縫": "缝", "縭": "缡",
  "縮": "缩", "縱": "纵", "縲": "缧", "縴": "纤", "縵": "缦", "縷": "缕", "縹": "缥", "總": "总", "績": "绩", "繃": "绷", "繅": "缫",
  "繆": "缪", "繈": "襁", "繒": "缯", "織": "织", "繕": "缮", "繚": "缭", "繞": "绕", "繡": "绣", "繢": "缋", "繩": "绳", "繪": "绘",
  "繫": "系", "繭": "茧", "繮": "缰", "繯": "缳", "繰": "缲", "繳": "缴", "繹": "绎", "繼": "继", "繽": "缤", "纈": "缬", "續": "续",
  "纏": "缠", "纓": "缨", "纖": "纤", "纜": "缆", "缽": "钵", "罈": "坛", "罌": "罂", "罰": "罚", "羅": "罗", "羆": "罴", "羈": "羁",
  "羋": "芈", "羥": "羟", "義": "义", "習": "习", "翹": "翘", "聖": "圣", "聞": "闻", "聯": "联", "聰": "聪", "聲": "声", "聳": "耸",
  "職": "职", "聶": "聂", "聾": "聋", "肅": "肃", "脅": "胁", "脈": "脉", "脛": "胫", "脫": "脱", "腎": "肾", "腫": "肿", "腳": "脚",
  "腸": "肠", "膚": "肤", "膠": "胶", "膽": "胆", "膾": "脍", "臉": "脸", "臍": "脐", "臏": "膑", "臘": "腊", "臚": "胪", "臟": "脏",
  "臠": "脔", "臢": "臜", "臨": "临", "與": "与", "興": "兴", "舉": "举", "舊": "旧", "艙": "舱", "艦": "舰", "艱": "艰", "艷": "艳",
  "藝": "艺", "節": "节", "薌": "芗", "蕪": "芜", "蘆": "芦", "蘇": "苏", "蘊": "蕴", "蘋": "苹", "藍": "蓝", "薊": "蓟", "虛": "虚",
  "蟲": "虫", "蝕": "蚀", "蟻": "蚁", "蠶": "蚕", "衆": "众", "術": "术", "衛": "卫", "衝": "冲", "袞": "衮", "補": "补", "裝": "装",
  "裡": "里", "製": "制", "複": "复", "褲": "裤", "襲": "袭", "見": "见", "觀": "观", "規": "规", "覓": "觅", "視": "视", "覘": "觇",
  "覡": "觋", "覥": "觍", "覦": "觎", "親": "亲", "覬": "觊", "覯": "觏", "覲": "觐", "覷": "觑", "覺": "觉", "覽": "览", "覿": "觌",
  "觔": "筋", "觴": "觞", "觸": "触", "訁": "讠", "訂": "订", "訃": "讣", "計": "计", "訊": "讯", "訌": "讧", "討": "讨", "訐": "讦",
  "訓": "训", "訕": "讪", "訖": "讫", "託": "托", "記": "记", "訛": "讹", "訝": "讶", "訟": "讼", "訣": "诀", "訥": "讷", "訪": "访",
  "設": "设", "許": "许", "訴": "诉", "診": "诊", "註": "注", "詁": "诂", "詆": "诋", "詎": "讵", "詐": "诈", "詒": "诒", "詔": "诏",
  "評": "评", "詛": "诅", "詞": "词", "詠": "咏", "詢": "询", "詣": "诣", "試": "试", "詩": "诗", "詫": "诧", "詬": "诟", "詭": "诡",
  "詮": "诠", "話": "话", "該": "该", "詳": "详", "詵": "诜", "詼": "诙", "誅": "诛", "誇": "夸", "誌": "志", "認": "认", "誑": "诳",
  "誒": "诶", "誕": "诞", "誘": "诱", "語": "语", "誠": "诚", "誡": "诫", "誣": "诬", "誤": "误", "誥": "诰", "誦": "诵", "誨": "诲",
  "說": "说", "誰": "谁", "課": "课", "誹": "诽", "誼": "谊", "調": "调", "諂": "谄", "諄": "谆", "談": "谈", "諉": "诿", "請": "请",
  "諍": "诤", "諏": "诹", "諑": "诼", "諒": "谅", "論": "论", "諗": "谂", "諛": "谀", "諜": "谍", "諧": "谐", "諫": "谏", "諭": "谕",
  "諮": "谘", "諱": "讳", "諳": "谙", "諶": "谌", "諷": "讽", "諸": "诸", "諺": "谚", "諾": "诺", "謀": "谋", "謁": "谒", "謂": "谓",
  "謄": "誊", "謅": "诌", "謊": "谎", "謎": "谜", "謐": "谧", "謔": "谑", "謖": "谡", "謗": "谤", "謙": "谦", "講": "讲", "謝": "谢",
  "謠": "谣", "謡": "谣", "謨": "谟", "謫": "谪", "謬": "谬", "謳": "讴", "謹": "谨", "謾": "谩", "譁": "哗", "證": "证", "譎": "谲",
  "譏": "讥", "譖": "谮", "識": "识", "譙": "谯", "譚": "谭", "譜": "谱", "警": "警", "譫": "谵", "譯": "译", "議": "议", "譴": "谴",
  "護": "护", "譽": "誉", "讀": "读", "變": "变", "讒": "谗", "讓": "让", "讕": "谰", "讖": "谶", "讚": "赞", "讜": "谠", "貝": "贝",
  "貞": "贞", "負": "负", "財": "财", "貢": "贡", "貧": "贫", "貨": "货", "販": "贩", "貪": "贪", "貫": "贯", "責": "责", "貯": "贮",
  "貴": "贵", "貶": "贬", "買": "买", "貸": "贷", "費": "费", "貼": "贴", "貽": "贻", "貿": "贸", "賀": "贺", "賁": "贲", "賂": "赂",
  "賃": "赁", "賄": "贿", "資": "资", "賈": "贾", "賊": "贼", "賑": "赈", "賒": "赊", "賓": "宾", "賕": "赇", "賙": "赒", "賚": "赉",
  "賜": "赐", "賞": "赏", "賠": "赔", "賡": "赓", "賢": "贤", "賣": "卖", "賤": "贱", "賦": "赋", "質": "质", "賬": "账", "賭": "赌",
  "賴": "赖", "賵": "赗", "賺": "赚", "購": "购", "賽": "赛", "贄": "贽", "贅": "赘", "贈": "赠", "贊": "赞", "贍": "赡", "贏": "赢",
  "贓": "赃", "贖": "赎", "贗": "赝", "贛": "赣", "趕": "赶", "趙": "赵", "趨": "趋", "躉": "趸", "躍": "跃", "躑": "踯", "躒": "跞",
  "躓": "踬", "躕": "蹰", "躚": "跹", "躡": "蹑", "躥": "蹿", "躦": "躜", "軀": "躯", "車": "车", "軋": "轧", "軌": "轨", "軍": "军",
  "軒": "轩", "軔": "轫", "軟": "软", "軤": "轷", "軫": "轸", "軲": "轱", "軸": "轴", "軹": "轵", "軺": "轺", "軻": "轲", "軼": "轶",
  "軾": "轼", "較": "较", "輅": "辂", "輇": "辁", "載": "载", "輊": "轾", "輒": "辄", "輓": "挽", "輔": "辅", "輕": "轻", "輛": "辆",
  "輜": "辎", "輝": "辉", "輞": "辋", "輟": "辍", "輥": "辊", "輦": "辇", "輩": "辈", "輪": "轮", "輯": "辑", "輸": "输", "輻": "辐",
  "輾": "辗", "輿": "舆", "轂": "毂", "轄": "辖", "轅": "辕", "轆": "辘", "轉": "转", "轍": "辙", "轎": "轿", "轔": "辚", "轟": "轰",
  "轡": "辔", "轢": "轹", "轤": "轳", "辦": "办", "辭": "辞", "辯": "辩", "農": "农", "逕": "迳", "這": "这", "連": "连", "週": "周",
  "進": "进", "遊": "游", "運": "运", "過": "过", "達": "达", "違": "违", "遙": "遥", "遜": "逊", "遞": "递", "遠": "远", "適": "适",
  "遲": "迟", "遷": "迁", "選": "选", "遺": "遗", "遼": "辽", "邁": "迈", "還": "还", "邇": "迩", "邊": "边", "邏": "逻", "鄧": "邓",
  "鄭": "郑", "鄰": "邻", "鄲": "郸", "鄴": "邺", "鄶": "郐", "鄺": "邝", "酈": "郦", "醞": "酝", "醫": "医", "醬": "酱", "釀": "酿",
  "釁": "衅", "釋": "释", "釐": "厘", "釒": "钅", "鈍": "钝", "鈔": "钞", "鐘": "钟", "鈣": "钙", "鈦": "钛", "鈞": "钧", "鈉": "钠",
  "鋼": "钢", "鉅": "钜", "鉛": "铅", "鉤": "钩", "鉑": "铂", "銀": "银", "銅": "铜", "銘": "铭", "銳": "锐", "銷": "销", "鋁": "铝",
  "鋒": "锋", "鋅": "锌", "錦": "锦", "錄": "录", "錢": "钱", "錫": "锡", "錯": "错", "錳": "锰", "錶": "表", "鍋": "锅", "鍍": "镀",
  "鍛": "锻", "鍾": "钟", "鎂": "镁", "鎮": "镇", "鏈": "链", "鏡": "镜", "鏽": "锈", "鐵": "铁", "鑄": "铸", "鑑": "鉴", "鑒": "鉴",
  "鑠": "铄", "鑣": "镳", "鑰": "钥", "鑽": "钻", "鑾": "銮", "長": "长", "門": "门", "閃": "闪", "閉": "闭", "開": "开", "閏": "闰",
  "閑": "闲", "間": "间", "閔": "闵", "閘": "闸", "閡": "阂", "閣": "阁", "閥": "阀", "閨": "闺", "閩": "闽", "閭": "闾", "閱": "阅",
  "閻": "阎", "闊": "阔", "闆": "板", "闈": "闱", "闔": "阖", "闖": "闯", "關": "关", "闞": "阚", "闡": "阐", "闢": "辟", "闥": "闼",
  "阪": "坂", "陘": "陉", "陝": "陕", "陣": "阵", "陰": "阴", "陳": "陈", "陸": "陆", "陽": "阳", "隉": "陧", "隊": "队", "階": "阶",
  "際": "际", "隨": "随", "險": "险", "隱": "隐", "隴": "陇", "隸": "隶", "雋": "隽", "雖": "虽", "雙": "双", "雜": "杂", "雞": "鸡",
  "離": "离", "難": "难", "雲": "云", "電": "电", "霧": "雾", "霽": "霁", "靂": "雳", "靄": "霭", "靈": "灵", "靚": "靓", "靜": "静",
  "頂": "顶", "頃": "顷", "項": "项", "順": "顺", "頇": "顸", "須": "须", "頊": "顼", "頌": "颂", "預": "预", "頑": "顽", "頒": "颁",
  "頓": "顿", "頗": "颇", "領": "领", "頡": "颉", "頤": "颐", "頦": "颏", "頭": "头", "頰": "颊", "頲": "颋", "頸": "颈", "頻": "频",
  "顆": "颗", "題": "题", "額": "额", "顎": "颚", "顏": "颜", "顓": "颛", "願": "愿", "顙": "颡", "顛": "颠", "類": "类", "顢": "颟",
  "顥": "颢", "顧": "顾", "顫": "颤", "顬": "颥", "顯": "显", "顰": "颦", "顱": "颅", "顳": "颞", "顴": "颧", "風": "风", "颱": "台",
  "颳": "刮", "颶": "飓", "颺": "扬", "飛": "飞", "饑": "饥", "飯": "饭", "飲": "饮", "飾": "饰", "飽": "饱", "餃": "饺", "餅": "饼",
  "養": "养", "餌": "饵", "餓": "饿", "餘": "余", "餡": "馅", "館": "馆", "饋": "馈", "饒": "饶", "饗": "飨", "饞": "馋", "饢": "馕",
  "馬": "马", "駁": "驳", "駐": "驻", "駕": "驾", "駛": "驶", "駝": "驼", "駟": "驷", "駢": "骈", "駭": "骇", "駱": "骆", "騎": "骑",
  "騙": "骗", "騷": "骚", "驅": "驱", "驚": "惊", "驗": "验", "驢": "驴", "驥": "骥", "髏": "髅", "髒": "脏", "體": "体", "鬆": "松",
  "鬍": "胡", "鬚": "须", "鬥": "斗", "鬧": "闹", "鬨": "哄", "鬱": "郁", "魎": "魉", "魘": "魇", "魚": "鱼", "魯": "鲁", "鮑": "鲍",
  "鮮": "鲜", "鯉": "鲤", "鯨": "鲸", "鯊": "鲨", "鱷": "鳄", "鳥": "鸟", "鳩": "鸠", "鳳": "凤", "鳴": "鸣", "鴻": "鸿", "鵬": "鹏",
  "鶴": "鹤", "鷗": "鸥", "鷹": "鹰", "鹼": "碱", "鹽": "盐", "麗": "丽", "麥": "麦", "黃": "黄", "點": "点", "黨": "党", "齊": "齐",
  "齒": "齿", "龍": "龙", "龐": "庞", "龔": "龚",
  "來": "来", "劃": "划", "勝": "胜", "夢": "梦", "宮": "宫", "嵐": "岚", "揚": "扬", "昇": "升", "榮": "荣", "歡": "欢",
  "滄": "沧", "滙": "汇", "滬": "沪", "潯": "浔", "濰": "潍", "濱": "滨", "瀾": "澜", "無": "无", "熱": "热", "營": "营",
  "瑤": "瑶", "礎": "础", "腦": "脑", "臥": "卧", "華": "华", "萊": "莱", "蓋": "盖", "蓮": "莲", "藥": "药", "蘭": "兰",
  "詰": "诘", "賾": "赜", "鈴": "铃", "鋪": "铺", "鋰": "锂", "鎖": "锁", "鐳": "镭", "馭": "驭", "騰": "腾", "鱘": "鲟",
  "鴿": "鸽", "麵": "面", "臺": "台", "証": "证"
};

const sponsorShortNameCache = new Map();

function sponsorShortName(name) {
  const raw = String(name || "").trim();
  if (!raw || raw === "待抽取") return raw;
  const cached = sponsorShortNameCache.get(raw);
  if (cached !== undefined) return cached;
  const registered = state.data?.meta?.sponsorEntities?.[raw];
  const matched = sponsorDisplayRules.find((rule) => rule.pattern.test(raw));
  const result = registered?.shortNameZh || matched?.shortName || raw;
  sponsorShortNameCache.set(raw, result);
  return result;
}

function sponsorSearchAliases(name) {
  const raw = String(name || "").trim();
  const matched = sponsorDisplayRules.find((rule) => rule.pattern.test(raw) || rule.shortName === raw);
  const registered = state.data?.meta?.sponsorEntities?.[raw];
  if (registered) return [registered.shortNameZh, registered.legalNameZh, registered.ce];
  return matched ? [matched.shortName, ...(matched.aliases || [])] : [];
}

function sponsorDisplayEntries(record) {
  const entries = [];
  const seen = new Set();
  for (const sponsor of record.sponsors || []) {
    const shortName = sponsorShortName(sponsor);
    if (!shortName) continue;
    const key = shortName.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({ shortName, fullName: sponsor, registered: state.data?.meta?.sponsorEntities?.[sponsor] });
  }
  return entries;
}

function sponsorLabels(record) {
  return sponsorDisplayEntries(record).map((entry) => entry.shortName);
}

function foldTraditional(value) {
  return String(value || "").replace(/[\u3400-\u9fff]/g, (char) => traditionalToSimplified[char] || char);
}

function normalizeSearchText(value) {
  return foldTraditional(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[()（）【】\[\],，.。;；:：'’"“”\-_/\\]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const HIDDEN_INTERNAL_TAGS = new Set(["已上市", "HKEX全量上市样本", "未见于最新状态表"]);

const tagDictionary = {
  "已上市": { en: "Listed", title: "Listed on HKEX / 已在港交所上市", cls: "listed-tag" },
  "密交": { en: "Confidential route", title: "保密递交上市申请 / Confidential submission of a listing application", cls: "info-tag" },
  "通知书待核": { en: "Notice pending", title: "Listed, but a source-backed CSRC filing notice is not yet matched / 已上市但尚未匹配到官方备案通知书", cls: "pending-listed-tag" },
  "官方状态冲突": { en: "Official status conflict", title: "The same latest CSRC status workbook contains different statuses for this issuer; the contradiction is preserved and no ordering is inferred / 同一份最新官方备案情况表载有不同状态，页面保留矛盾且不推断先后", cls: "outlier-tag" },
  "介绍上市": { en: "Introduction", title: "Listing by introduction; excluded from ordinary IPO duration statistics / 介绍上市，不计入普通IPO周期统计", cls: "info-tag" },
  "RTO": { en: "Reverse takeover", title: "Reverse takeover; excluded from ordinary IPO duration statistics / 反向收购，不计入普通IPO周期统计", cls: "info-tag" },
  "RTO已完成": { en: "RTO completed", title: "Official completion announcement; the completion date is separate from the original IPO date / 官方公告确认交易完成；完成日与首次IPO日分别记录", cls: "info-tag" },
  "待HKEX公开": { en: "HKEX AP not public", title: "Official CSRC notice exists, but no public HKEX AP/listing row is currently matched / 已有官方备案通知书，但暂未匹配到公开HKEX AP或上市行", cls: "info-tag" },
  "无需备案": { en: "Filing N/A", title: "No filing required for this listing event; see the applicability basis / 本次上市事项无需备案，具体依据见适用性说明", cls: "info-tag" },
  "制度前A1": { en: "Pre-regime A1", title: "All A1 cycles predate the CSRC filing regime effective date 2023-03-31 / 全部A1周期早于备案新规生效日", cls: "info-tag" },
  "A1已失效": { en: "A1 lapsed", title: "HKEX application lapsed; CSRC filing remains standing and a refiling is typical / 港交所申请已失效，备案仍然有效，通常会重新递交", cls: "inactive-tag" },
  "已撤回": { en: "Withdrawn", title: "HKEX application withdrawn / 港交所申请已撤回", cls: "inactive-tag" },
  "已拒绝": { en: "Rejected", title: "HKEX application rejected / 港交所申请被拒", cls: "inactive-tag" },
  "outlier剔除统计": { en: "Outlier excluded", title: "Excluded from headline duration statistics: no post-regime A1 cycle precedes the CSRC notice (e.g. filing completed under an earlier lapsed cycle) / 通知书早于已知的制度后A1周期，无有效统计锚点，不计入头部时长统计", cls: "outlier-tag" },
  "制度后A1锚点": { en: "Post-regime A1 anchor", title: "Earliest A1 predates the CSRC filing regime; durations are anchored to the first A1 cycle posted on/after 2023-03-31 / 最早A1早于备案新规，时长统计以制度生效后的第一次A1为锚点", cls: "info-tag" },
  "过渡期内上市": { en: "Listed in transition period", title: "主板上市日在境外上市备案制度过渡期内；招股书披露见项目详情。 / See issuer details for the prospectus disclosure.", cls: "info-tag" },
  "过渡期A1锚点": { en: "Transition cohort", title: "In-process application straddled the regime effective date (存量在审); the displayed filing clock starts at 2023-03-31 and the true A1 anchor is unobservable, so this record is excluded from headline duration statistics / 申请周期跨越制度生效日，展示时长自2023-03-31起算；真实A1锚点不可观测，不计入头部时长统计", cls: "outlier-tag" },
  "前轮A1锚点": { en: "Previous-cycle A1 anchor", title: "The selected A1 falls on the CSRC notice date, so the displayed filing clock uses the latest earlier A1 in the HKEX consolidated index; a pre-regime fallback is excluded from headline statistics / 所选A1与通知书同日，展示时长改用港交所综合索引中通知日前最近一轮A1；如该日期早于备案新规则不计入头部统计", cls: "info-tag" },
  "GEM转主板": { en: "GEM-to-Main transfer", title: "Transfer from GEM to the Main Board; filing or reporting obligations depend on the transaction / GEM转主板；备案或报告义务须根据具体交易判断", cls: "info-tag" }
};

function isStatsOutlier(record) {
  if (record.specialListingRoute) return false;
  if (record.csrcFilingRequired !== true) return false;
  if ((record.statusTags || []).includes("密交")) return false;
  if ((record.statusTags || []).includes("过渡期A1锚点")) return false;
  if (record.durationSampleEligible === false && record.a1Date && (record.noticeDate || record.csrcReceivedDate)) return true;
  if ((record.timelineFlags || []).includes("csrc_notice_before_received_chronology_conflict")) return true;
  return false;
}

function visibleStatusTags(record) {
  const tags = (record.statusTags || []).filter((tag) => !HIDDEN_INTERNAL_TAGS.has(tag));
  if (state.hkexStage === "all" && record.practicalStage === "listed") tags.unshift("已上市");
  if (isStatsOutlier(record)) tags.push("outlier剔除统计");
  return tags;
}

function renderStatusTags(record) {
  const tags = visibleStatusTags(record);
  if (!tags.length) return "";
  return `
    <span class="status-tag-list">
      ${tags.map((tag) => {
        const info = tagDictionary[tag] || {};
        const en = info.en ? `<small>${escapeHtml(info.en)}</small>` : "";
        return `<span class="${escapeHtml(info.cls || "")}" title="${escapeHtml(info.title || tag)}">${escapeHtml(tag)}${en}</span>`;
      }).join("")}
    </span>
  `;
}

function issuerDocumentSource(source) {
  if (!source) return "";
  const ap = /^https:\/\/www1\.hkexnews\.hk\/app\/(sehk|gem)\/\d{4}\/\d+\/documents\/(sehk|gem)\d+(_c)?\.pdf$/.test(source.url);
  const report = /^https:\/\/www1?\.hkexnews\.hk\/listedco\/listconews\/(sehk|gem)\/\d{4}\/\d{4}\/\d+(_c)?\.pdf$/.test(source.url);
  if (!ap && !report) return "";
  const pages = (source.pdfPages || []).filter(page => Number.isInteger(page) && page > 0);
  if (!pages.length) return "";
  const doc = {PHIP:"聆讯后资料集", AP:"申请版本", board_transfer_announcement:"转板公告", annual_results:"全年业绩公告"}[source.documentType] || "港交所文件";
  return `<a href="${escapeHtml(source.url)}#page=${pages[0]}" target="_blank" rel="noreferrer">${doc} · ${escapeHtml(source.documentDate)} · PDF 第${pages.join("、")}页</a>`;
}

function renderListingRole(record, detailed = false) {
  const role = record.listingRoleDisclosure;
  if (!role) return "";
  let label;
  if (role.kind === "sole_listing_agent" && role.legalName) {
    label = `独家上市代理 · ${role.legalName}`;
  } else if (role.kind === "chapter_9b_transfer") {
    label = "第9B章简化转板";
  } else {
    return "";
  }
  if (!detailed) return `<span>${escapeHtml(label)}</span>`;
  return `<div class="sponsor-detail"><strong>${escapeHtml(label)}</strong>${issuerDocumentSource(role.source)}</div>`;
}

function renderIssuerDisclosure(record) {
  const disclosure = record.filingScopeDisclosure;
  const incorporation = record.issuerJurisdictionEvidence;
  const filing = disclosure && record.csrcFilingApplicability === "pending"
    ? `<p>${escapeHtml(disclosure.detailZh)}<br>${escapeHtml(disclosure.detailEn)}<br>${issuerDocumentSource(disclosure.source)}</p>` : "";
  const domicile = incorporation
    ? `<p>注册地 / Incorporation · ${escapeHtml(incorporation.jurisdictionZh)} / ${escapeHtml(record.issuerJurisdiction)}<br>${issuerDocumentSource(incorporation.source)}</p>` : "";
  return filing + domicile;
}

function renderStatusBadge(record) {
  const hkexStatus = record.hkexPublicStatus || "";
  const milestones = {
    Listed: ["已上市", "Listed on HKEX"],
    Active: ["备案适用待核", "CSRC applicability pending"],
    Lapsed: ["港交所申请已失效", "HKEX application lapsed"],
    Withdrawn: ["已撤回港交所申请", "HKEX application withdrawn"],
    Rejected: ["港交所已拒绝申请", "HKEX application rejected"],
  };
  const milestone = record.status === "applicability_pending" ? milestones[hkexStatus] : null;
  const labels = milestone || [statusLabel(record.status), statusLabel(record.status, 1)];
  return `
    <span class="status-stack">
      <span class="badge ${escapeHtml(record.status)}"><b>${escapeHtml(labels[0])}</b><small>${escapeHtml(labels[1])}</small></span>
      ${renderStatusTags(record)}
    </span>
  `;
}

// Reviewed projection of overrides/public_document_facts.json. The source register
// validates the PDF bytes, issuer, signed date, stock code and operative language.
// A source citation alone never establishes the current application/offer status.
const offeringNoticeEvidence = [
  {
    "issuerId": "ganzhou hemay pharmaceutical co., ltd. - b",
    "issuerName": "Ganzhou Hemay Pharmaceutical Co., Ltd. - B",
    "applicationDate": "2026-06-08",
    "applicationId": "108622",
    "kind": "offeringPostponement",
    "stockCode": "00054",
    "date": "2026-11-04",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1104/2026110400409.pdf",
    "pages": [
      2,
      3
    ],
    "research": {
      "date": "2026-10-30",
      "offerShares": 55210000,
      "newShares": 55210000,
      "saleShares": 0,
      "postShares": 452056576,
      "hongKongShares": 5521000,
      "internationalShares": 49689000,
      "priceLow": 15.5,
      "priceHigh": 18.9,
      "priceAdjustmentLow": 14.0,
      "capitalComponents": [
        [
          "未上市股份",
          142877096
        ],
        [
          "全流通转换 H 股",
          253969480
        ],
        [
          "本轮新发 H 股",
          55210000
        ]
      ],
      "denominatorPages": [
        247,
        24
      ],
      "quantityPages": [
        2,
        291
      ],
      "partyPages": [
        77,
        78
      ],
      "structurePages": [
        291,
        292
      ],
      "mechanism": "可酌情重分配至 15%",
      "sponsors": [
        {
          "name": "SDIC Securities Corporate Finance (Hong Kong) Limited",
          "shortName": "国投证券企业融资（香港）",
          "roles": []
        }
      ],
      "cmis": [
        {
          "name": "SDIC Securities (Hong Kong) Limited",
          "shortName": "国投证券（香港）",
          "roles": [
            "保荐人整体协调人（Sponsor-OC）",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "SPDB International Capital Limited",
          "shortName": "浦银国际融资",
          "roles": [
            "整体协调人",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "China Industrial Securities International Capital Limited",
          "shortName": "兴证国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CMB International Capital Limited",
          "shortName": "招银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CCB International Capital Limited",
          "shortName": "建银国际金融",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "BOCOM International Securities Limited",
          "shortName": "交银国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Guosen Securities (HK) Brokerage Company, Limited",
          "shortName": "国信证券（香港）经纪",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "uSmart Securities Limited",
          "shortName": "盈立证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Patrons Securities Limited",
          "shortName": "Patrons Securities",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "ABCI Capital Limited",
          "shortName": "农银国际融资",
          "roles": [
            "联席账簿管理人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "ABCI Securities Company Limited",
          "shortName": "农银国际证券",
          "roles": [
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        }
      ],
      "cornerstoneStatus": "disclosed",
      "cornerstoneScenarios": [
        {
          "price": 18.9,
          "shares": 12041400
        },
        {
          "price": 15.5,
          "shares": 14682800
        }
      ],
      "cornerstonePages": [
        249,
        251,
        252,
        253,
        254,
        255,
        439,
        440
      ],
      "cornerstones": [
        {
          "name": "GF Fund Management Co., Ltd.",
          "shortName": "广发基金",
          "type": "中国内地公募基金管理人",
          "pdfPages": [
            251,
            252
          ],
          "capacity": "代表旗下数只基金全权认购",
          "profileUrl": "https://www.gffunds.com.cn/gywm/4/202609/t20260903_431076.shtml",
          "id": "gf-mainland",
          "commitmentCurrency": "USD",
          "commitmentAmount": 9500000,
          "feesIncluded": false
        },
        {
          "name": "GF International Investment Management Limited",
          "shortName": "广发国际（GF Fund HK）",
          "type": "香港持牌资管",
          "pdfPages": [
            252
          ],
          "capacity": "代表旗下一只基金全权认购",
          "id": "gf-hk",
          "commitmentCurrency": "USD",
          "commitmentAmount": 500000,
          "feesIncluded": false
        },
        {
          "name": "China Universal Asset Management Co., Ltd.",
          "shortName": "汇添富基金",
          "type": "中国内地公募基金管理人",
          "pdfPages": [
            252,
            253
          ],
          "capacity": "代表旗下数只基金全权认购",
          "id": "cuam-mainland",
          "commitmentCurrency": "USD",
          "commitmentAmount": 8000000,
          "feesIncluded": false
        },
        {
          "name": "China Universal Asset Management (Hong Kong) Company Limited",
          "shortName": "汇添富香港",
          "type": "香港持牌资管",
          "pdfPages": [
            253
          ],
          "capacity": "代表 CUAM China-Hong Kong Strategy Fund 全权认购",
          "id": "cuam-hk",
          "commitmentCurrency": "USD",
          "commitmentAmount": 1000000,
          "feesIncluded": false
        },
        {
          "name": "Fullgoal Fund Management Co., Ltd.",
          "shortName": "富国基金",
          "type": "中国内地公募基金管理人",
          "pdfPages": [
            253,
            254
          ],
          "capacity": "代表旗下数只公募基金全权认购",
          "id": "fullgoal-mainland",
          "commitmentCurrency": "USD",
          "commitmentAmount": 5372000,
          "feesIncluded": false
        },
        {
          "name": "Fullgoal Asset Management (HK) Limited",
          "shortName": "富国香港",
          "type": "香港持牌资管",
          "pdfPages": [
            254
          ],
          "capacity": "代表旗下一只基金全权认购",
          "id": "fullgoal-hk",
          "commitmentCurrency": "USD",
          "commitmentAmount": 1628000,
          "feesIncluded": false
        },
        {
          "name": "E Fund Management Co., Ltd.",
          "shortName": "易方达基金",
          "type": "中国内地公募基金管理人",
          "pdfPages": [
            254
          ],
          "capacity": "以代理身份代表旗下一只基金全权认购",
          "profileUrl": "https://www.efunds.com.cn/lm/jgd-sy/",
          "id": "efund",
          "commitmentCurrency": "USD",
          "commitmentAmount": 3000000,
          "feesIncluded": false
        }
      ],
      "announcementWording": "现时市况",
      "market": {
        "date": "2026-11-04",
        "hsiClose": 23919.5,
        "changePercent": 1.673,
        "turnoverHkd": 236896230172,
        "sourceLabel": "港交所日报",
        "sourceUrl": "https://www.hkex.com.hk/chi/stat/smstat/dayquot/d261104c.htm",
        "listedLast7Days": 0,
        "listingReportUrl": "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR2026_Eng.xlsx"
      },
      "prospectusUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1030/2026103000029.pdf",
      "prospectusSha256": "e7e3594bcd41dfe41516e274dccf857adbfe06495225b87357a8738f471780a7",
      "ocSources": [
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108622/documents/sehk26060801741.pdf",
          "date": "2026-06-08",
          "sha256": "15efda2bb2315bd390333df71f130db2e18b56a759498a3e1065cef10fde9713",
          "publishedDate": "08/06/2026"
        }
      ],
      "cornerstoneCommitmentTotal": {
        "currency": "USD",
        "amount": 29000000,
        "label": "计划认购额",
        "basis": "原指示价 HKD 15.50–18.90"
      },
      "cornerstoneGroups": [
        {
          "id": "gf",
          "name": "广发基金",
          "memberIds": [
            "gf-mainland",
            "gf-hk"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "中国内地公募基金管理人"
            },
            {
              "dimension": "认购",
              "label": "代旗下基金全权认购"
            },
            {
              "dimension": "特征",
              "label": "内地管理人及全资香港子公司"
            }
          ],
          "pdfPages": [
            251,
            252,
            254,
            439
          ],
          "ranking": {
            "metric": "非货公募规模",
            "currency": "RMB",
            "amountHundredMillion": 11209.42,
            "rank": 3,
            "asOf": "2026-06-30",
            "dataProvider": "Wind、公司统计",
            "sourceUrl": "https://static.cninfo.com.cn/finalpage/2026-08-29/1225532942.PDF#page=23",
            "sourceLabel": "广发证券半年报 p.23",
            "publicationDate": "2026-08-29"
          }
        },
        {
          "id": "cuam",
          "name": "汇添富基金",
          "memberIds": [
            "cuam-mainland",
            "cuam-hk"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "中国内地公募基金管理人"
            },
            {
              "dimension": "认购",
              "label": "代旗下基金全权认购"
            },
            {
              "dimension": "特征",
              "label": "内地管理人及全资香港子公司"
            }
          ],
          "pdfPages": [
            252,
            253,
            254,
            439
          ]
        },
        {
          "id": "fullgoal",
          "name": "富国基金",
          "memberIds": [
            "fullgoal-mainland",
            "fullgoal-hk"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "中国内地公募基金管理人"
            },
            {
              "dimension": "认购",
              "label": "代旗下基金全权认购"
            },
            {
              "dimension": "特征",
              "label": "内地公募基金及香港基金账户"
            }
          ],
          "pdfPages": [
            253,
            254,
            439
          ]
        },
        {
          "id": "efund",
          "name": "易方达基金",
          "memberIds": [
            "efund"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "中国内地公募基金管理人"
            },
            {
              "dimension": "认购",
              "label": "以代理身份代一只基金认购"
            },
            {
              "dimension": "特征",
              "label": "QDII · 全球医疗健康投资"
            }
          ],
          "pdfPages": [
            254,
            440
          ]
        }
      ],
      "plannedMarketCap": {
        "priceHkd": 17.3,
        "method": "postSharesTimesProspectusPrice",
        "priceBasis": "招股书采用价 HKD 17.30",
        "pdfPages": [
          24,
          25
        ],
        "decimals": 2,
        "amountHkd": 7820578764.8,
        "overAllotmentExercised": false
      },
      "displayName": "和美药业",
      "roundId": "offering:00054:2026-10-30",
      "reallocationPricing": "香港增至 15% 时：最终价格取 HKD 15.50 与调低后价格两者较低者"
    }
  },
  {
    "issuerId": "changzhou microintelligence co., ltd",
    "issuerName": "Changzhou Microintelligence Co., Ltd",
    "applicationDate": "2026-03-31",
    "applicationId": "108374",
    "kind": "offeringPostponement",
    "stockCode": "03275",
    "date": "2026-10-25",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1025/2026102500001.pdf",
    "pages": [
      1,
      2,
      3
    ],
    "research": {
      "date": "2026-10-20",
      "offerShares": 37275800,
      "newShares": 37275800,
      "saleShares": 0,
      "postShares": 372757356,
      "hongKongShares": 3727600,
      "internationalShares": 33548200,
      "priceLow": 16.63,
      "priceHigh": 21.46,
      "capitalComponents": [
        [
          "全流通转换 H 股",
          335481556
        ],
        [
          "本轮新发 H 股",
          37275800
        ]
      ],
      "denominatorPages": [
        232,
        23,
        119
      ],
      "quantityPages": [
        2,
        290
      ],
      "partyPages": [
        73,
        74,
        75
      ],
      "structurePages": [
        290,
        291,
        292
      ],
      "mechanism": "机制 B · 无强制回拨",
      "sponsors": [
        {
          "name": "Orient Capital (Hong Kong) Limited",
          "shortName": "东方融资（香港）",
          "roles": []
        }
      ],
      "cmis": [
        {
          "name": "Orient Securities (Hong Kong) Limited",
          "shortName": "东方证券（香港）",
          "roles": [
            "保荐人整体协调人（Sponsor-OC）",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "BOCI Asia Limited",
          "shortName": "中银国际亚洲",
          "roles": [
            "整体协调人",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "Futu Securities International (Hong Kong) Limited",
          "shortName": "富途证券国际（香港）",
          "roles": [
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "China Industrial Securities International Capital Limited",
          "shortName": "兴证国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CMBC Securities Company Limited",
          "shortName": "民银证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "First Shanghai Securities Limited",
          "shortName": "第一上海证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Huafu International Securities Limited",
          "shortName": "华福国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "ICBC International Securities Limited",
          "shortName": "工银国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Shanxi Securities International Limited",
          "shortName": "山证国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "SPDB International Capital Limited",
          "shortName": "浦银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Tiger Brokers (HK) Global Limited",
          "shortName": "老虎证券（香港）环球",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Yuet Sheung International Securities Limited",
          "shortName": "粤商国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        }
      ],
      "cornerstoneStatus": "disclosed",
      "cornerstoneScenarios": [
        {
          "price": 21.46,
          "shares": 731300
        },
        {
          "price": 16.63,
          "shares": 943700
        }
      ],
      "cornerstonePages": [
        275,
        276,
        277,
        278,
        412
      ],
      "cornerstones": [
        {
          "name": "Elbe Rhein Investment Limited",
          "shortName": "易北莱茵投资",
          "type": "私人投资及资产管理公司",
          "pdfPages": [
            278
          ],
          "capacity": "公司直接签约认购",
          "id": "elbe",
          "commitmentCurrency": "USD",
          "commitmentAmount": 2000000,
          "feesIncluded": false,
          "formerName": "Migao Corporation Limited (米高集团有限公司)"
        }
      ],
      "announcementWording": "包括当时市况在内的多项因素",
      "market": {
        "date": "2026-10-23",
        "hsiClose": 23093.37,
        "changePercent": 0.692,
        "turnoverHkd": 249783590343,
        "sourceLabel": "港交所日报",
        "sourceUrl": "https://www.hkex.com.hk/chi/stat/smstat/dayquot/d261023c.htm",
        "listedLast7Days": 0,
        "listingReportUrl": "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR2026_Eng.xlsx"
      },
      "prospectusUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1020/2026102000029.pdf",
      "prospectusSha256": "0b2da8fb140c1a13a630e3e99eb157feb7a8096a1434f306c6f3423690f69434",
      "ocSources": [
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108374/documents/sehk26033100372.pdf",
          "date": "2026-03-31",
          "sha256": "33c1a8a2df59c9ef7c8a0e30f2825320409256aa3f8c5321f8f2f5e2f224248f",
          "publishedDate": "31/03/2026"
        }
      ],
      "cornerstoneCommitmentTotal": {
        "currency": "USD",
        "amount": 2000000,
        "label": "计划认购额",
        "equivalentHkd": 15700000
      },
      "cornerstoneGroups": [
        {
          "id": "elbe",
          "name": "易北莱茵投资",
          "memberIds": [
            "elbe"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "私人投资公司全资股东"
            },
            {
              "dimension": "认购",
              "label": "透过易北莱茵投资签约"
            },
            {
              "dimension": "特征",
              "label": "科技及智能制造投资"
            }
          ],
          "pdfPages": [
            277,
            278,
            412
          ],
          "displayName": "Jonas Liu",
          "displayRole": "全资持有人",
          "ownership": "全资持有易北莱茵投资",
          "profile": "微亿基石签约方 Elbe Rhein 的全资持有人；载体从事科技及智能制造投资"
        }
      ],
      "cornerstoneFunding": {
        "label": "认购资金（招股书列示）",
        "description": "自身资金、股东资金或所管理资产；未细分本单来源",
        "pdfPages": [
          276
        ]
      },
      "plannedMarketCap": {
        "priceHkd": 19.05,
        "method": "postSharesTimesProspectusPrice",
        "priceBasis": "中位价 HKD 19.05",
        "pdfPages": [
          23,
          275
        ],
        "decimals": 2,
        "amountHkd": 7101027631.8,
        "overAllotmentExercised": false
      },
      "displayName": "常州微亿智造",
      "roundId": "offering:03275:2026-10-20"
    }
  },
  {
    "issuerId": "jiangsu slender west lake cultural tourism co. ltd",
    "issuerName": "Jiangsu Slender West Lake Cultural Tourism Co. Ltd",
    "applicationDate": "2026-03-30",
    "applicationId": "108373",
    "kind": "offeringPostponement",
    "stockCode": "06157",
    "date": "2026-10-20",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1020/2026102000564.pdf",
    "pages": [
      1,
      2,
      3
    ],
    "research": {
      "date": "2026-10-14",
      "offerShares": 44760000,
      "newShares": 44760000,
      "saleShares": 0,
      "postShares": 179025816,
      "hongKongShares": 4476000,
      "internationalShares": 40284000,
      "priceLow": 3.92,
      "priceHigh": 5.07,
      "capitalComponents": [
        [
          "原内资股",
          134265816
        ],
        [
          "本轮新发 H 股",
          44760000
        ]
      ],
      "denominatorPages": [
        215,
        18,
        97
      ],
      "quantityPages": [
        2,
        288
      ],
      "partyPages": [
        62,
        63
      ],
      "structurePages": [
        288,
        289,
        290
      ],
      "mechanism": "机制 B · 无强制回拨",
      "sponsors": [
        {
          "name": "China Everbright Capital Limited",
          "shortName": "中国光大融资",
          "roles": []
        }
      ],
      "cmis": [
        {
          "name": "China Everbright Securities (HK) Limited",
          "shortName": "中国光大证券（香港）",
          "roles": [
            "独家整体协调人",
            "独家全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "Bluestone Securities (HK) CO., Limited",
          "shortName": "Bluestone Securities (HK)",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Caitong International Securities Company Limited",
          "shortName": "财通国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "China Industrial Securities International Capital Limited",
          "shortName": "兴证国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "China Renaissance Securities (Hong Kong) Limited",
          "shortName": "华兴证券（香港）",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CMB International Capital Limited",
          "shortName": "招银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CMBC Securities Company Limited",
          "shortName": "民银证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "ICBC International Securities Limited",
          "shortName": "工银国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "South China Securities Limited",
          "shortName": "南华证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "SPDB International Capital Limited",
          "shortName": "浦银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Sunfund Securities Limited",
          "shortName": "Sunfund Securities",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Zheshang International Financial Holdings Co., Limited",
          "shortName": "浙商国际金融控股",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        }
      ],
      "cornerstoneStatus": "not_disclosed",
      "cornerstoneScenarios": [],
      "cornerstonePages": [
        440
      ],
      "cornerstones": [],
      "announcementWording": "包括当时市况在内的多项因素",
      "market": {
        "date": "2026-10-20",
        "hsiClose": 23867.74,
        "changePercent": -1.319,
        "turnoverHkd": 190454582738,
        "sourceLabel": "港交所日报",
        "sourceUrl": "https://www.hkex.com.hk/chi/stat/smstat/dayquot/d261020c.htm",
        "listedLast7Days": 1,
        "listingReportUrl": "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR2026_Eng.xlsx"
      },
      "prospectusUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1014/2026101400023.pdf",
      "prospectusSha256": "cc25588930d424e1d7b221547d07aa1dd15ed7417637dcbfc861e899bf8d3131",
      "ocSources": [
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108373/documents/sehk26100700094.pdf",
          "date": "2026-10-07",
          "sha256": "80ab64b67e2f6106fe08366c4c19c9251b31d59931a2bbb55644d0a6d4bb6a99",
          "publishedDate": "07/10/2026"
        },
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108373/documents/sehk26033100112.pdf",
          "date": "2026-03-30",
          "sha256": "17288d3b48172ee9a19d49c91f22f90f78afecfd9638efc8d664874a049d5895",
          "publishedDate": "31/03/2026"
        }
      ],
      "cornerstoneGroups": [],
      "plannedMarketCap": {
        "priceHkd": 4.5,
        "method": "postSharesTimesProspectusPrice",
        "priceBasis": "中位价 HKD 4.50",
        "pdfPages": [
          18,
          97,
          215
        ],
        "decimals": 2,
        "amountHkd": 805616172.0,
        "overAllotmentExercised": false
      },
      "displayName": "瘦西湖文旅",
      "roundId": "offering:06157:2026-10-14",
      "preIpo": {
        "kind": "equity",
        "label": "1 名股权投资者",
        "role": "上市前股权投资",
        "roundDate": "2026-10-14",
        "scenarioPriceHkd": 4.5,
        "costCurrency": "RMB",
        "hkdPerCostUnit": 1.155268022181146,
        "fxLabel": "HKD 1 = RMB 0.86560",
        "basis": "中位价 HKD 4.50 · 绿鞋前 · 不计税费及期间股息",
        "postShares": 179025816,
        "sourcePages": [
          23,
          60,
          93,
          95,
          96,
          98,
          215
        ],
        "investors": [
          {
            "displayName": "大运河（扬州）文旅基金",
            "legalName": "Jiangsu Grand Canal (Yangzhou) Cultural Tourism Development Fund (Limited Partnership)",
            "legalNameZh": "江苏省大运河（扬州）文化旅游发展基金（有限合伙）",
            "role": "上市前股权投资",
            "profile": "2019年设立的投资基金；出资人包括江苏省及扬州国资投资机构",
            "sourcePages": [
              23,
              93,
              95,
              96,
              98,
              215
            ],
            "investmentDate": "2023-03-17",
            "fullyPaidDate": "2023-06-01",
            "originalShares": 2797045,
            "currentShares": 13425816,
            "preOfferTotalShares": 134265816,
            "postOfferTotalShares": 179025816,
            "costCurrency": "RMB",
            "cost": 28557829.45,
            "adjustedCostPerShare": "2.127083333333333333333333333",
            "scenarioPriceHkd": "4.5",
            "rmbPerHkd": "0.8656",
            "id": "grand-canal-yangzhou",
            "holdingLabel": "发售前持股（资本化后）",
            "displayRole": "投资基金",
            "shares": 13425816,
            "preShares": 134265816
          }
        ],
        "roundId": "offering:06157:2026-10-14"
      }
    }
  },
  {
    "issuerId": "shenzhen forms syntron information co., ltd.",
    "issuerName": "Shenzhen Forms Syntron Information Co., Ltd.",
    "applicationDate": "2026-07-05",
    "applicationId": "108727",
    "kind": "offeringPostponement",
    "stockCode": "06700",
    "date": "2026-09-17",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0917/2026091701579.pdf",
    "pages": [
      1,
      2,
      3
    ],
    "research": {
      "date": "2026-09-14",
      "offerShares": 58961100,
      "newShares": 58961100,
      "saleShares": 0,
      "postShares": 589610375,
      "hongKongShares": 5896200,
      "internationalShares": 53064900,
      "priceLow": null,
      "priceHigh": 16.0,
      "capitalComponents": [
        [
          "原 A 股",
          530649275
        ],
        [
          "本轮新发 H 股",
          58961100
        ]
      ],
      "denominatorPages": [
        221,
        27,
        406
      ],
      "quantityPages": [
        2,
        288
      ],
      "partyPages": [
        85
      ],
      "structurePages": [
        288,
        289,
        290
      ],
      "mechanism": "机制 B · 无强制回拨",
      "sponsors": [
        {
          "name": "CMB International Capital Limited",
          "shortName": "招银国际融资",
          "roles": []
        },
        {
          "name": "Guosen Securities (HK) Capital Company Limited",
          "shortName": "国信证券（香港）融资",
          "roles": []
        }
      ],
      "cmis": [
        {
          "name": "CMB International Capital Limited",
          "shortName": "招银国际融资",
          "roles": [
            "保荐人整体协调人（Sponsor-OC）",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "Guosen Securities (HK) Capital Company Limited",
          "shortName": "国信证券（香港）融资",
          "roles": [
            "保荐人整体协调人（Sponsor-OC）",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "Victory Securities Company Limited",
          "shortName": "胜利证券",
          "roles": [
            "联席账簿管理人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Emperio Securities And Assets Management Limited",
          "shortName": "Emperio Securities and Assets Management",
          "roles": [
            "联席账簿管理人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Futu Securities International (Hong Kong) Limited",
          "shortName": "富途证券国际（香港）",
          "roles": [
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Get Nice Securities Limited",
          "shortName": "结好证券",
          "roles": [
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Harmonia Capital Limited",
          "shortName": "Harmonia Capital",
          "roles": [
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Innovax Securities Limited",
          "shortName": "建泉证券",
          "roles": [
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        }
      ],
      "cornerstoneStatus": "disclosed",
      "cornerstoneScenarios": [
        {
          "price": 16.0,
          "shares": 7431200
        }
      ],
      "cornerstonePages": [
        216,
        217,
        218,
        219,
        465
      ],
      "cornerstones": [
        {
          "name": "Mr. Cheng Chi Heng",
          "shortName": "郑志恒",
          "type": "个人投资者",
          "pdfPages": [
            218
          ],
          "id": "cheng",
          "commitmentCurrency": "HKD",
          "commitmentAmount": 40000000,
          "capacity": "个人直接认购",
          "feesIncluded": true
        },
        {
          "name": "Successful Lotus Limited",
          "shortName": "Successful Lotus",
          "type": "私人投资控股公司",
          "pdfPages": [
            218
          ],
          "capacity": "李家杰全资持有的投资控股公司",
          "id": "successful-lotus",
          "commitmentCurrency": "HKD",
          "commitmentAmount": 39600000,
          "feesIncluded": false
        },
        {
          "name": "Thalassa Capital Dynamics SPC (acting for and on behalf of Thalassa Horizon SP)",
          "shortName": "Thalassa Capital / Thalassa Horizon SP",
          "type": "股权投资载体",
          "pdfPages": [
            218,
            219
          ],
          "manager": "Seascape Synergy Group Limited",
          "id": "thalassa",
          "commitmentCurrency": "HKD",
          "commitmentAmount": 30000000,
          "capacity": "通过 Thalassa Horizon SP 认购",
          "feesIncluded": true
        },
        {
          "name": "Yeebo Alpha Limited",
          "shortName": "Yeebo Alpha",
          "type": "产业集团投资载体",
          "pdfPages": [
            219
          ],
          "capacity": "亿都（国际控股）有限公司全资投资子公司",
          "id": "yeebo-alpha",
          "commitmentCurrency": "HKD",
          "commitmentAmount": 10000000,
          "feesIncluded": false
        }
      ],
      "announcementWording": "包括当时市况在内的多项因素",
      "market": {
        "date": "2026-09-17",
        "hsiClose": 24604.29,
        "changePercent": -0.44,
        "turnoverHkd": 185586000000,
        "sourceLabel": "华富财经",
        "sourceUrl": "https://quamnet.com/post/fkXPwq8pgktJkQOyqH1mk",
        "listedLast7Days": 0,
        "listingReportUrl": "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR2026_Eng.xlsx"
      },
      "prospectusUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0914/2026091400005.pdf",
      "prospectusSha256": "af4d588ed2bcaf260f947aa695818b30e8c332b0051f0fb01ec39eef0f145251",
      "ocSources": [
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108727/documents/sehk26070500184.pdf",
          "date": "2026-07-05",
          "sha256": "1c9eb68bcc8f399e3ebc354b3225af7f125fddf919bdf1e7dfb4c765f4f4abab",
          "publishedDate": "05/07/2026"
        }
      ],
      "cornerstoneCommitmentTotal": {
        "currency": "HKD",
        "amount": 119600000,
        "label": "计划认购额"
      },
      "cornerstoneGroups": [
        {
          "id": "cheng",
          "name": "郑志恒",
          "memberIds": [
            "cheng"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "个人投资者"
            },
            {
              "dimension": "认购",
              "label": "个人直接认购"
            },
            {
              "dimension": "特征",
              "label": "周大福珠宝副主席兼执行董事"
            }
          ],
          "pdfPages": [
            217,
            218,
            465
          ],
          "displayName": "郑志恒",
          "displayRole": "直接签约",
          "profile": "周大福珠宝（01929）副主席兼执行董事（招股书当期）"
        },
        {
          "id": "successful-lotus",
          "name": "Successful Lotus",
          "memberIds": [
            "successful-lotus"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "个人投资者"
            },
            {
              "dimension": "认购",
              "label": "透过全资投资控股公司签约"
            },
            {
              "dimension": "特征",
              "label": "恒基地产主席兼董事总经理"
            }
          ],
          "pdfPages": [
            217,
            218,
            465
          ],
          "displayName": "李家杰",
          "displayRole": "全资持有人",
          "ownership": "全资持有 Successful Lotus",
          "profile": "恒基兆业地产（00012）主席兼董事总经理，创办人李兆基之子",
          "profileSources": [
            {
              "label": "恒基 · 李家杰职务",
              "url": "https://www.hld.com/tc/about-the-group/our-leadership/dr-lee-ka-kit"
            },
            {
              "label": "恒基 · 创办人资料",
              "url": "https://www.hld.com/en/about-the-group/our-leadership/dr-lee-shau-kee?is_preload=1"
            }
          ]
        },
        {
          "id": "thalassa",
          "name": "Thalassa Capital",
          "memberIds": [
            "thalassa"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "外部投资管理人"
            },
            {
              "dimension": "认购",
              "label": "管理 Thalassa Horizon SP 账户"
            },
            {
              "dimension": "特征",
              "label": "开曼 SPC · 独立投资组合"
            }
          ],
          "pdfPages": [
            217,
            218,
            219,
            465
          ],
          "displayName": "Seascape Synergy",
          "displayRole": "管理人",
          "profile": "Thalassa Horizon SP 的外部管理人"
        },
        {
          "id": "yeebo-alpha",
          "name": "Yeebo Alpha",
          "memberIds": [
            "yeebo-alpha"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "香港上市产业集团"
            },
            {
              "dimension": "认购",
              "label": "透过全资投资子公司签约"
            },
            {
              "dimension": "特征",
              "label": "显示器件及 AI 算力"
            }
          ],
          "pdfPages": [
            217,
            219,
            465
          ],
          "displayName": "亿都（00259）",
          "displayRole": "母公司",
          "ownership": "全资持有 Yeebo Alpha",
          "profile": "香港上市产业集团；显示器件及 AI 算力业务"
        }
      ],
      "cornerstoneFunding": {
        "label": "认购资金（招股书列示）",
        "description": "自身资金、股东资金或受托资产；未逐名细分",
        "pdfPages": [
          216
        ]
      },
      "plannedMarketCap": {
        "priceHkd": 16.0,
        "method": "disclosedAPlusH",
        "amountHkd": 15612030000,
        "priceBasis": "A+H · H 股最高价 HKD 16.00 情景",
        "pdfPages": [
          27
        ],
        "decimals": 2,
        "aShares": 530649275,
        "aReferencePriceRmb": 23.9,
        "hShares": 58961100,
        "hShareMarketCapHkd": 943380000,
        "overAllotmentExercised": false
      },
      "displayName": "四方精创",
      "roundId": "offering:06700:2026-09-14"
    }
  },
  {
    "issuerId": "ekh limited",
    "issuerName": "EKH Limited",
    "applicationDate": "2026-04-01",
    "applicationId": "108390",
    "kind": "offeringNotProceeding",
    "stockCode": "02523",
    "date": "2026-07-08",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0708/2026070801370.pdf",
    "pages": [
      1,
      2,
      3
    ],
    "research": {
      "date": "2026-06-30",
      "offerShares": 51600000,
      "newShares": 51600000,
      "saleShares": 0,
      "postShares": 438578285,
      "hongKongShares": 5160000,
      "internationalShares": 46440000,
      "priceLow": 2.2,
      "priceHigh": 2.68,
      "capitalComponents": [
        [
          "已发行普通股",
          285940889
        ],
        [
          "上市前可转债转换",
          80620476
        ],
        [
          "上市前股份奖励",
          20416920
        ],
        [
          "本轮新发股份",
          51600000
        ]
      ],
      "denominatorPages": [
        295,
        28,
        166
      ],
      "quantityPages": [
        2,
        370
      ],
      "partyPages": [
        93,
        94
      ],
      "structurePages": [
        370,
        371,
        372
      ],
      "mechanism": "可酌情重分配至 15%",
      "sponsors": [
        {
          "name": "Quam Capital Limited",
          "shortName": "华富建业企业融资",
          "roles": []
        },
        {
          "name": "Alliance Capital Partners Limited",
          "shortName": "同人融资",
          "roles": []
        }
      ],
      "cmis": [
        {
          "name": "Quam Securities Limited",
          "shortName": "华富建业证券",
          "roles": [
            "保荐人整体协调人（Sponsor-OC）",
            "独家全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "CEB International Capital Corporation Limited",
          "shortName": "光银国际资本",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CMB International Capital Limited",
          "shortName": "招银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Eddid Securities and Futures Limited",
          "shortName": "艾德证券期货",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Grand China Securities Limited",
          "shortName": "大中华证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Orient Securities (Hong Kong) Limited",
          "shortName": "东方证券（香港）",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "SBI E2-Capital Securities Limited",
          "shortName": "SBI E2-Capital Securities",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "SPDB International Capital Limited",
          "shortName": "浦银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "uSmart Securities Limited",
          "shortName": "盈立证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        }
      ],
      "cornerstoneStatus": "not_disclosed",
      "cornerstoneScenarios": [],
      "cornerstonePages": [
        586,
        587
      ],
      "cornerstones": [],
      "publicSubscription": "香港公开发售获超额认购",
      "market": {
        "date": "2026-07-08",
        "hsiClose": 24199.46,
        "changePercent": 2.99,
        "turnoverHkd": 375835000000,
        "sourceLabel": "新华社",
        "sourceUrl": "https://www.xinhuanet.com/20260708/2afddbbd1ea040eba7ecf7e6a798da86/c.html",
        "listedLast7Days": 6,
        "listingReportUrl": "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR2026_Eng.xlsx"
      },
      "prospectusUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000027.pdf",
      "prospectusSha256": "10cff38ca9c60fdabfe841e03ecea2a05ede66206f94732961ec6709b63017bb",
      "ocSources": [
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108390/documents/sehk26040100606.pdf",
          "date": "2026-03-31",
          "sha256": "96382b718db76c824879ed6b0ce4422167107131f0c487b854d211711a262c1c",
          "publishedDate": "01/04/2026"
        }
      ],
      "cornerstoneGroups": [],
      "plannedMarketCap": {
        "priceHkd": 2.44,
        "method": "disclosedTotal",
        "amountHkd": 1070100000,
        "priceBasis": "中位价 HKD 2.44",
        "pdfPages": [
          166
        ],
        "decimals": 1,
        "overAllotmentExercised": false
      },
      "displayName": "永康控股 EKH",
      "roundId": "offering:02523:2026-06-30",
      "preIpo": {
        "kind": "convertible",
        "label": "7 名可转债投资者",
        "role": "上市前可转债",
        "roundDate": "2026-06-30",
        "scenarioPriceHkd": 2.44,
        "costCurrency": "SGD",
        "hkdPerCostUnit": 6.06,
        "fxLabel": "SGD 1 = HKD 6.06",
        "basis": "成功上市前自动转股 · 中位价 HKD 2.44 · 绿鞋前 · 不计票息及税费",
        "postShares": 438578285,
        "totalPrincipal": 15000000,
        "totalConversionShares": 80620476,
        "interestAnnualPercent": 3,
        "sourcePages": [
          91,
          160,
          161,
          162,
          164,
          165,
          166,
          295
        ],
        "investors": [
          {
            "id": "samudera-shipping",
            "displayName": "Samudera Shipping（SGX S56）",
            "displayRole": "上市航运企业",
            "profile": "新加坡上市航运企业，经营集装箱及散货油轮运输",
            "legalName": "Samudera Shipping Line Ltd",
            "cost": 7300000.0,
            "shares": 39235298,
            "currentEquityShares": null,
            "fullyPaidDate": "2025-12-30",
            "sourcePages": [
              160,
              161,
              162,
              164
            ]
          },
          {
            "id": "aai",
            "displayName": "Barbara KWOK Sze Hang",
            "displayRole": "全资持有人",
            "profile": "AAI 全资持有人；载体经营电脑设施管理及商品批发",
            "legalName": "AAI Pte. Ltd.",
            "cost": 2000000.0,
            "shares": 10749397,
            "currentEquityShares": null,
            "fullyPaidDate": "2025-12-09",
            "sourcePages": [
              160,
              161,
              162,
              164
            ]
          },
          {
            "id": "stranda-venture",
            "displayName": "Ng Siew Yong／Shaline Gnanalingam",
            "displayRole": "共同全资持有人",
            "profile": "共同全资持有 Stranda Venture，属附生存者权利的共同持有安排",
            "legalName": "Stranda Venture Incorporated",
            "cost": 2000000.0,
            "shares": 10749397,
            "currentEquityShares": null,
            "fullyPaidDate": "2025-12-09",
            "sourcePages": [
              160,
              161,
              162,
              164
            ]
          },
          {
            "id": "hpc-investment",
            "displayName": "HPC Holdings（01742）",
            "displayRole": "全资母公司",
            "profile": "香港上市公司；透过全资投资子公司 HPC Investment 持有可转债",
            "legalName": "HPC Investment Limited",
            "cost": 1500000.0,
            "shares": 8062048,
            "currentEquityShares": null,
            "fullyPaidDate": "2025-12-09",
            "sourcePages": [
              160,
              161,
              162,
              164
            ]
          },
          {
            "id": "hb-equity",
            "displayName": "Ho Bee Capital",
            "displayRole": "持有 87%",
            "profile": "持有 HB Equity Partners 87%；该公司为其投资机构",
            "legalName": "HB Equity Partners Pte. Ltd.",
            "cost": 1000000.0,
            "shares": 5374698,
            "currentEquityShares": null,
            "fullyPaidDate": "2025-12-09",
            "sourcePages": [
              160,
              161,
              162,
              165
            ]
          },
          {
            "id": "trans-coastal",
            "displayName": "LIM Sin Sang",
            "displayRole": "全资持有人",
            "profile": "Trans-Coastal Lines 全资持有人；载体从事航运及货运代理",
            "legalName": "Trans-Coastal Lines (S) Pte Ltd",
            "cost": 800000.0,
            "shares": 4299759,
            "currentEquityShares": null,
            "fullyPaidDate": "2025-12-09",
            "sourcePages": [
              160,
              161,
              162,
              165
            ]
          },
          {
            "id": "tan-wee-hong",
            "displayName": "TAN Wee Hong",
            "displayRole": "集团高级管理层",
            "profile": "永康东南亚区域总经理，属于集团高级管理层",
            "legalName": "TAN Wee Hong",
            "cost": 400000.0,
            "shares": 2149879,
            "currentEquityShares": null,
            "fullyPaidDate": "2025-12-09",
            "sourcePages": [
              160,
              161,
              162,
              165
            ]
          }
        ],
        "roundId": "offering:02523:2026-06-30"
      },
      "reallocationPricing": "香港增至 15% 时：最终价格 HKD 2.20"
    }
  }
];

function currentOfferingNotice(record) {
  if (record.hkexListingDate || record.practicalStage === "listed" ||
      /^(listed|withdrawn|rejected|returned)$/i.test(record.hkexPublicStatus || "") ||
      /^(listed|withdrawn|rejected|returned)$/.test(record.hkexApplicationStatusGroup || "")) return null;
  const notice = offeringNoticeEvidence.find(item => item.issuerId === record.id && item.issuerName === record.issuerName);
  if (!notice || record.currentA1Date !== notice.applicationDate || notice.applicationDate > notice.date) return null;
  const applications = record.hkexPublishedApplications || [];
  const documents = applications.flatMap(item => item.documents || []);
  if (!applications.some(item => item.applicationId === notice.applicationId &&
      (item.documents || []).some(doc => /Application Proof/i.test(doc.label || "") && doc.date === notice.applicationDate))) return null;
  if (record.hkexProspectusDate > notice.date || documents.some(doc =>
      (/Application Proof/i.test(doc.label || "") && doc.date > notice.applicationDate) ||
      (/PHIP|Prospectus|Allotment|招股|配发|配發|重启|重啟|Relaunch|Resumption/i.test(doc.label || "") && doc.date > notice.date))) return null;
  const links = record.sourceLinks || [];
  const expectedLabel = notice.kind === "offeringNotProceeding"
    ? "本次发售及上市未进行 / This offering and listing did not proceed"
    : "延迟发售及上市 / Offering and listing postponed";
  if (!links.some(link => link.url === `${notice.url}#page=${notice.pages[0]}` &&
      (link.originalLabel || link.label) === `${notice.date} ${expectedLabel}`)) return null;
  // A later dated offering/allotment announcement supersedes this notice even
  // before the listing feed has caught up. Undated or unrelated links do not.
  if (links.some(link => {
    const url = String(link.url || "").split("#")[0];
    const match = url.match(/^https:\/\/www1?\.hkexnews\.hk\/listedco\/listconews\/sehk\/(\d{4})\/(\d{2})(\d{2})\/\d+\.pdf$/);
    return match && `${match[1]}-${match[2]}-${match[3]}` > notice.date &&
      /Prospectus|Allotment|招股|配发|配發|重启|重啟|Relaunch|Resumption|withdraw|撤回/i.test(link.originalLabel || link.label || "");
  })) return null;
  return notice;
}

function offeringNoticeLabels(notice) {
  return notice.kind === "offeringNotProceeding"
    ? ["本轮发售不进行", "This offering not proceeding", "本轮发售不进行"]
    : ["发售及上市延期", "Offering and listing postponed", "发售搁置"];
}

function offeringSearchText(record) {
  const notice = currentOfferingNotice(record);
  if (!notice) return "";
  const facts = notice.research || {};
  const institutions = [...(facts.sponsors || []), ...(facts.cmis || []), ...(facts.cornerstones || [])];
  return ["发售搁置 暂停 paused", ...offeringNoticeLabels(notice), notice.date, notice.stockCode,
    ...institutions.flatMap(item => [item.name, item.shortName, item.type, item.manager, item.capacity, item.formerName, ...(item.roles || [])]),
    ...(facts.cornerstoneGroups || []).flatMap(group => [group.name, group.displayName, group.displayRole, group.ownership, group.profile, ...group.tags.map(tag => tag.label), group.ranking?.metric, group.ranking?.asOf]),
    facts.displayName, facts.preIpo?.role, ...(facts.preIpo?.investors || []).flatMap(item => [item.displayName,item.legalName,item.legalNameZh,item.profile,item.displayRole])].filter(Boolean).join(" ");
}

function renderOfferingBadge(record) {
  const notice = currentOfferingNotice(record);
  if (!notice) return "";
  const labels = offeringNoticeLabels(notice);
  return `<button type="button" class="offering-badge" data-offering-id="${escapeHtml(record.id)}" title="${escapeHtml(labels[1])} · ${notice.date}">${labels[2]} ↗</button>`;
}


function offeringNumber(value, decimals = 0) {
  return Number(value).toLocaleString("en-US", {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
}

function offeringPrice(facts) {
  const high = offeringNumber(facts.priceHigh, 2);
  return facts.priceLow === null ? `最高 HKD ${high}` : `HKD ${offeringNumber(facts.priceLow, 2)}–${high}`;
}

function offeringGross(facts) {
  const high = offeringNumber(facts.offerShares * facts.priceHigh / 1000000, 1);
  return facts.priceLow === null ? `最高 HKD ${high} 百万` : `HKD ${offeringNumber(facts.offerShares * facts.priceLow / 1000000, 1)}–${high} 百万`;
}

function offeringCornerstoneRatio(facts) {
  const scenarios = facts.cornerstoneScenarios || [];
  if (!scenarios.length) return "";
  const rates = scenarios.map(item => item.shares / facts.offerShares * 100).sort((a,b) => a-b);
  return rates.length > 1
    ? `${offeringNumber(rates[0], 2)}%–${offeringNumber(rates.at(-1), 2)}%（指示价区间）`
    : `${offeringNumber(rates[0], 2)}%（按 HKD ${offeringNumber(scenarios[0].price, 2)}、股数计算）`;
}

function sponsorLookupMaps() {
  const byName = new Map();
  const byId = new Map();
  for (const row of eligibleFeeRoster()) {
    for (const inst of row.institutions || []) {
      if (!inst.sponsorId) continue;
      if (!byId.has(inst.sponsorId)) byId.set(inst.sponsorId, inst.displayName || sponsorShortName(inst.legalName));
      for (const candidate of [inst.legalName, inst.displayName, sponsorShortName(inst.legalName)]) {
        const key = String(candidate || "").trim().toLowerCase();
        if (key && !byName.has(key)) byName.set(key, inst.sponsorId);
      }
    }
  }
  return { byName, byId };
}

function sponsorIdForName(name) {
  const raw = String(name || "").trim();
  if (!raw) return "";
  const { byName } = sponsorLookupMaps();
  return byName.get(raw.toLowerCase()) || byName.get(sponsorShortName(raw).toLowerCase()) || "";
}

function sponsorDisplayById(sponsorId) {
  if (!sponsorId) return "";
  return sponsorLookupMaps().byId.get(sponsorId) || sponsorId;
}

function renderSponsorJumpChip(label, sponsorId, fullTitle = "") {
  const title = fullTitle || label;
  if (sponsorId) {
    return `<button type="button" class="sponsor-jump-link" data-global-firm="${escapeHtml(sponsorId)}" title="${escapeHtml(title)} · 查看保荐人龙虎榜">${escapeHtml(label)}</button>`;
  }
  return `<span title="${escapeHtml(title)}">${escapeHtml(label)}</span>`;
}

function txsForRecord(record) {
  if (!record?.id) return [];
  const explicitCaseIds = new Set([
    ...(Array.isArray(record.transactionCaseIds) ? record.transactionCaseIds : []),
    ...(Array.isArray(record.transactionIds) ? record.transactionIds : []),
    ...(Array.isArray(record.relatedTransactionIds) ? record.relatedTransactionIds : []),
    ...(Array.isArray(record.relatedTransactions) ? record.relatedTransactions.map(x => typeof x === "string" ? x : x?.caseId || x?.id) : [])
  ].filter(Boolean));
  return (state.transactionData?.cases || []).filter(c => {
    if (explicitCaseIds.has(c.id)) return true;
    const { records } = resolveTransactionIssuerLinks(c);
    return records.some(r => r.id === record.id);
  });
}
function txForRecord(record) {
  return txsForRecord(record)[0] || null;
}

function renderOfferingOrganizations(items, withRoles = false) {
  return `<ul class="offering-organizations">${items.map(item => {
    const spId = withRoles ? "" : sponsorIdForName(item.name) || sponsorIdForName(item.shortName);
    const nameHtml = spId
      ? `<button type="button" class="offering-org-name sponsor-jump-link" data-global-firm="${escapeHtml(spId)}" title="${escapeHtml(item.name)} · 查看保荐人龙虎榜">${escapeHtml(item.shortName)} ↗</button>`
      : `<span class="offering-org-name">${escapeHtml(item.shortName)}</span>`;
    return `<li>${nameHtml}<span class="offering-legal-name">${escapeHtml(item.name)}</span>${withRoles ? `<span class="offering-org-role">${escapeHtml(item.roles.join(" / "))}</span>` : ""}</li>`;
  }).join("")}</ul>`;
}

function offeringCornerstoneGroups(facts) {
  const byId = new Map((facts.cornerstones || []).map(item => [item.id, item]));
  const seen = new Set();
  return (facts.cornerstoneGroups || []).map(group => {
    const members = group.memberIds.map(id => byId.get(id)).filter(item => {
      if (!item) return false;
      const key = item.name.trim().toLowerCase().replace(/\s+/g, " ");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return {...group, members, amount: members.reduce((sum, item) => sum + item.commitmentAmount, 0)};
  }).filter(group => group.members.length);
}

function renderOfferingCornerstones(facts) {
  const groups = offeringCornerstoneGroups(facts);
  const heading = '<h3>基石投资者 <span>Cornerstone investors</span></h3>';
  if (!groups.length) return `${heading}<p class="offering-undisclosed">招股书未披露基石名单</p>`;
  const total = facts.cornerstoneCommitmentTotal;
  const amount = (currency, value) => `${escapeHtml(currency)} ${offeringNumber(value)}`;
  const signatories = groups.reduce((sum, group) => sum + group.members.length, 0);
  const totalAmount = groups.reduce((sum, group) => sum + group.amount, 0);
  return `${heading}<div class="offering-cornerstone-summary"><span>${groups.length} 组</span><span>${signatories} 名法律签约方</span><strong>${escapeHtml(total.label)} ${amount(total.currency, totalAmount)}</strong>${total.basis ? `<span>${escapeHtml(total.basis)}</span>` : ""}${total.equivalentHkd ? `<span>约 HKD ${offeringNumber(total.equivalentHkd)}</span>` : ""}</div>
    ${facts.cornerstoneFunding ? `<p class="offering-cornerstone-detail">${escapeHtml(facts.cornerstoneFunding.label)}：${escapeHtml(facts.cornerstoneFunding.description)}</p>` : ""}
    <ul class="offering-cornerstone-groups">${groups.map(group => {
      const one = group.members.length === 1 ? group.members[0] : null;
      const rank = group.ranking;
      const profileId = `cs:${group.id}`;
      return `<li data-cornerstone-group="${escapeHtml(group.id)}"><div class="offering-cornerstone-name"><button type="button" class="cs-inline-jump" data-open-cornerstone="${escapeHtml(profileId)}" title="查看 ${escapeHtml(group.displayName || group.name)} 基石投资人画像"><strong>${escapeHtml(group.displayName || group.name)}${group.displayRole ? ` · ${escapeHtml(group.displayRole)}` : ""}</strong><small>画像 →</small></button><span>${amount(group.members[0].commitmentCurrency, group.amount)}${one?.feesIncluded ? ' <span class="offering-fee-basis">含费用</span>' : ""}</span></div>
        ${group.profile ? `<p class="offering-cornerstone-profile">${escapeHtml(group.profile)}</p>` : ""}
        ${one ? `<p class="offering-cornerstone-legal" data-cornerstone-signatory="${escapeHtml(one.id)}">拟认购签约方：${escapeHtml(one.name)}</p>` : ""}
        <ul class="offering-cornerstone-tags">${group.tags.filter(tag => !group.profile || tag.dimension !== "特征").map(tag => `<li><span>${escapeHtml(tag.dimension)}</span>${escapeHtml(tag.label)}</li>`).join("")}</ul>
        ${group.ownership ? `<p class="offering-cornerstone-detail">持有：${escapeHtml(group.ownership)}</p>` : ""}
        ${one?.manager ? `<p class="offering-cornerstone-detail">管理人：${escapeHtml(one.manager)}</p>` : ""}
        ${rank ? `<p class="offering-cornerstone-rank">${escapeHtml(rank.metric)} ${escapeHtml(rank.currency)} ${offeringNumber(rank.amountHundredMillion, 2)} 亿元 · 行业第 ${rank.rank}<span>${escapeHtml(rank.asOf)} · ${escapeHtml(rank.dataProvider)}</span></p>` : ""}
        ${group.members.length > 1 ? `<details class="offering-disclosure"><summary>法律签约方与原额 · ${group.members.length} 名</summary><ul class="offering-cornerstone-members">${group.members.map(item => `<li data-cornerstone-signatory="${escapeHtml(item.id)}"><div><strong>${escapeHtml(item.name)}</strong><span>${amount(item.commitmentCurrency, item.commitmentAmount)}</span></div><p>${escapeHtml(item.type)} · ${escapeHtml(item.capacity)}</p></li>`).join("")}</ul></details>` : ""}
      </li>`;
    }).join("")}</ul>`;
}


function renderOfferingRange(low, high, minimum, maximum, label, axisLabels = []) {
  const span = Math.max(0.000001, maximum - minimum);
  const pct = value => (2 + Math.max(0, Math.min(1, (value - minimum) / span)) * 96).toFixed(2) + "%";
  const pointOnly = low === null;
  const marks = pointOnly
    ? `<circle class="offering-range-point" cx="${pct(high)}" cy="12" r="5"/>`
    : `<line class="offering-range-span" x1="${pct(low)}" x2="${pct(high)}" y1="12" y2="12"/><circle class="offering-range-point" cx="${pct(low)}" cy="12" r="4.5"/><circle class="offering-range-point" cx="${pct(high)}" cy="12" r="4.5"/>`;
  return `<div class="offering-range" data-range-kind="${pointOnly ? "ceiling" : "range"}" data-axis-min="${minimum}" data-axis-max="${maximum}" data-range-low="${pointOnly ? "" : low}" data-range-high="${high}"><svg role="img" aria-label="${escapeHtml(label)}"><line class="offering-range-axis" x1="2%" x2="98%" y1="12" y2="12"/>${axisLabels.length ? ["2%","50%","98%"].map(tick => `<line class="offering-range-tick" x1="${tick}" x2="${tick}" y1="7" y2="17"/>`).join("") : ""}${marks}</svg>${axisLabels.length ? `<div class="offering-axis-labels" aria-hidden="true">${axisLabels.map(text => `<span>${escapeHtml(text)}</span>`).join("")}</div>` : ""}</div>`;
}

function renderOfferingPriceRange(facts) {
  if (facts.priceLow === null) return `<div class="offering-price-point" role="img" aria-label="${escapeHtml(offeringPrice(facts))}"><i></i><strong>${offeringPrice(facts)}</strong></div>`;
  return `<div class="offering-price-chart"><strong>${offeringPrice(facts)}</strong>${renderOfferingRange(facts.priceLow,facts.priceHigh,facts.priceLow,facts.priceHigh,offeringPrice(facts))}</div>`;
}

function renderOfferingAllocation(facts) {
  const hk = facts.hongKongShares / facts.offerShares * 100;
  const international = facts.internationalShares / facts.offerShares * 100;
  return `<div class="offering-allocation"><h3>初始分配</h3><div class="offering-allocation-bar" role="img" aria-label="香港 ${offeringNumber(hk,2)}%，国际 ${offeringNumber(international,2)}%"><span class="offering-allocation-hk" style="width:${hk}%"></span><span class="offering-allocation-international" style="width:${international}%"></span></div><div class="offering-allocation-labels"><span><i class="offering-key-hk"></i>香港 ${offeringNumber(hk,2)}%<small>${offeringNumber(facts.hongKongShares)} 股</small></span><span><i class="offering-key-international"></i>国际 ${offeringNumber(international,2)}%<small>${offeringNumber(facts.internationalShares)} 股</small></span></div></div>`;
}

function offeringPreIpoScenario(profile, investor) {
  const costHkd = investor.cost * profile.hkdPerCostUnit;
  const valueHkd = investor.shares * profile.scenarioPriceHkd;
  return {costHkd, valueHkd, gainHkd: valueHkd - costHkd,
    returnPercent: (valueHkd / costHkd - 1) * 100,
    postPercent: investor.shares / profile.postShares * 100,
    prePercent: investor.preShares ? investor.shares / investor.preShares * 100 : null,
    adjustedCostPerShare: investor.cost / investor.shares};
}

function renderOfferingPreIpo(facts, defaultOpen = false) {
  const p = facts.preIpo;
  if (!p) return "";
  const n = offeringNumber, convertible = p.kind === "convertible";
  const row = (label,value) => `<div><dt>${label}</dt><dd>${value}</dd></div>`;
  const money = value => `HKD ${n(value,2)}`;
  const cnHkd = value => Math.abs(value) >= 1e8 ? `HKD ${n(value / 1e8, 3).replace(/0+$/, "").replace(/\.$/, "")}亿` : `HKD ${n(value / 1e4, 0)}万`;
  const total = convertible ? offeringPreIpoScenario(p,{cost:p.totalPrincipal,shares:p.totalConversionShares}) : null;
  const scenarios = (p.investors || []).map(inv => offeringPreIpoScenario(p, inv));
  const sumCost = total ? total.costHkd : scenarios.reduce((s, x) => s + x.costHkd, 0);
  const sumVal = total ? total.valueHkd : scenarios.reduce((s, x) => s + x.valueHkd, 0);
  const sumGain = sumVal - sumCost;
  const sumPost = total ? total.postPercent : scenarios.reduce((s, x) => s + x.postPercent, 0);
  const mult = sumCost > 0 ? sumVal / sumCost : 0;
  const costPct = sumVal > 0 ? Math.min(92, Math.max(8, sumCost / sumVal * 100)) : 50;
  const gainPct = Math.max(0, 100 - costPct);
  const visualBar = sumCost > 0 && sumVal > 0 ? `<div class="preipo-visual-card"><div class="preipo-visual-head"><span>投入成本 <strong>${cnHkd(sumCost)}</strong> → 情景市值 <strong>${cnHkd(sumVal)}</strong></span><strong class="preipo-gain-badge col-num">账面 ${n(mult, 2)}x · 浮盈 +${cnHkd(sumGain)} (+${n((mult - 1) * 100, 1)}%)</strong></div><div class="preipo-bar-track" role="img" aria-label="投入成本占比 ${n(costPct,1)}%，情景毛浮盈占比 ${n(gainPct,1)}%"><span class="preipo-bar-cost" style="width:${costPct.toFixed(1)}%"></span><span class="preipo-bar-gain" style="width:${gainPct.toFixed(1)}%"></span></div><div class="preipo-bar-legend"><span><i class="is-cost"></i>投入成本 ${n(costPct, 1)}%</span><span><i class="is-gain"></i>情景浮盈 ${n(gainPct, 1)}%</span><span>绿鞋前合计持股 ${n(sumPost, 2)}%</span></div></div>` : "";
  return `<details class="offering-section offering-preipo" id="paused-preipo" data-offer-round="${escapeHtml(p.roundId)}"${defaultOpen ? " open" : ""}><summary><strong>上市前投资者</strong><span>${escapeHtml(p.label)} · 账面 ${n(mult, 2)}x</span></summary><div class="offering-section-body"><p class="offering-scenario-basis">${escapeHtml(p.basis)}<br>${escapeHtml(p.fxLabel)}</p>
    ${visualBar}
    ${convertible ? `<dl class="offering-preipo-total">${row("已付可转债本金",`SGD ${n(p.totalPrincipal)} · 2025-12`)}${row("拟转换股份",`${n(p.totalConversionShares)} 股 · ${n(total.postPercent,2)}%`)}${row("票面年利率",`${n(p.interestAnnualPercent)}%`)}${row("情景毛账面盈亏",`${money(total.gainHkd)} · +${n(total.returnPercent,2)}%`)}</dl>` : ""}
    <div class="offering-preipo-investors">${p.investors.map(investor => {
      const s = offeringPreIpoScenario(p,investor);
      const invMult = s.costHkd > 0 ? s.valueHkd / s.costHkd : 0;
      const invCostW = s.valueHkd > 0 ? Math.min(92, Math.max(8, s.costHkd / s.valueHkd * 100)) : 50;
      return `<details class="offering-investor" data-preipo-investor="${escapeHtml(investor.id)}"><summary><span><strong>${escapeHtml(investor.displayName)}</strong><span class="offering-investor-role">${escapeHtml(investor.displayRole)}</span></span><span>${escapeHtml(p.costCurrency)} ${n(investor.cost,convertible ? 0 : 2)}<span class="offering-investor-role">${convertible ? "本金" : "投资成本"} · 持股 ${n(s.postPercent,2)}% · ${n(invMult,2)}x</span></span></summary><div class="offering-investor-body"><p class="offering-cornerstone-profile">${escapeHtml(investor.profile)}</p><p class="offering-cornerstone-legal">${escapeHtml(investor.legalNameZh || investor.legalName)}${investor.legalNameZh ? `<br>${escapeHtml(investor.legalName)}` : ""}</p><div class="preipo-bar-track is-mini" aria-hidden="true"><span class="preipo-bar-cost" style="width:${invCostW.toFixed(1)}%"></span><span class="preipo-bar-gain" style="width:${Math.max(0, 100 - invCostW).toFixed(1)}%"></span></div><dl class="offering-preipo-grid">
        ${row("投资角色",escapeHtml(p.role))}${row("款项付清",investor.fullyPaidDate)}
        ${convertible ? row("发售前工具","可转债") : row("发售前持股",`${n(investor.shares)} 股 · ${n(s.prePercent,2)}%`)}
        ${row(convertible ? "成功上市拟转换" : "拟上市后持股",`${n(investor.shares)} 股 · ${n(s.postPercent,2)}%`)}
        ${row(convertible ? "每股转换本金" : "资本化后每股成本",`${escapeHtml(p.costCurrency)} ${n(s.adjustedCostPerShare,6)}`)}
        ${row("情景港元成本",money(s.costHkd))}${row("情景持股市值",money(s.valueHkd))}${row("情景毛账面盈亏",`${money(s.gainHkd)} · +${n(s.returnPercent,2)}%`)}
      </dl></div></details>`;
    }).join("")}</div></div></details>`;
}

function renderOfferingResearch(facts, notice, options = {}) {
  const n = offeringNumber;
  const openAttr = options.openPrimary ? " open" : "";
  const row = (label,value) => `<div><dt>${label}</dt><dd>${value}</dd></div>`;
  const groups = offeringCornerstoneGroups(facts);
  const ocs = facts.cmis.filter(item => item.overallCoordinator);
  const rates = (facts.cornerstoneScenarios || []).map(item => item.shares / facts.offerShares * 100).sort((a,b) => a-b);
  return `<div class="offering-detail-sections">
    <details class="offering-section" id="paused-structure"${openAttr}><summary><strong>发售结构与承销团</strong><span>${n(facts.offerShares)} 股 · ${facts.saleShares ? "含旧股" : "全部新股"} · ${ocs.length} OC / ${facts.cmis.length} CMI</span></summary><div class="offering-section-body">
      <div class="offering-research-columns"><section><h3>招股价格</h3>${renderOfferingPriceRange(facts)}<dl class="offering-facts">
        ${facts.priceAdjustmentLow ? row("最低可调招股价",`HKD ${n(facts.priceAdjustmentLow,2)}`) : ""}
        ${row("计划发售总额",offeringGross(facts))}
        ${row("计划上市市值（绿鞋前）",`HKD ${n(facts.plannedMarketCap.amountHkd / 1000000,1)} 百万 · ${escapeHtml(facts.plannedMarketCap.priceBasis)}`)}
        ${row("发售后总股本",`${n(facts.postShares)} 股`)}
        ${facts.saleShares ? row("新股 / 旧股",`${n(facts.newShares)} / ${n(facts.saleShares)} 股`) : ""}
      </dl><details class="offering-disclosure"><summary>股本构成</summary><dl class="offering-facts">${facts.capitalComponents.map(([label,shares])=>row(escapeHtml(label),`${n(shares)} 股`)).join("")}</dl></details></section>
      <section>${renderOfferingAllocation(facts)}<dl class="offering-facts">${row("分配机制",escapeHtml(facts.mechanism))}${facts.reallocationPricing ? row("重分配价格条件",escapeHtml(facts.reallocationPricing)) : ""}</dl></section></div>
      <div class="offering-research-columns offering-parties"><section><h3>保荐人 <span>Sponsors</span></h3>${renderOfferingOrganizations(facts.sponsors)}</section><section><h3>整体协调人 <span>OC · ${ocs.length} 家</span></h3>${renderOfferingOrganizations(ocs)}<details class="offering-disclosure"><summary>CMI 名单与角色（${facts.cmis.length} 家，含 OC）</summary>${renderOfferingOrganizations(facts.cmis,true)}</details></section></div>
    </div></details>
    <details class="offering-section" id="paused-cornerstones"${openAttr}><summary><strong>认购与基石</strong><span>${facts.publicSubscription ? escapeHtml(facts.publicSubscription) : groups.length ? `${groups.length} 组基石` : "基石披露"}</span></summary><div class="offering-section-body">
      ${facts.publicSubscription ? `<p class="offering-subscription">${escapeHtml(facts.publicSubscription)}</p>` : ""}
      ${rates.length ? `<div class="offering-cornerstone-ratio"><h3>基石占发售股份</h3><strong>${offeringCornerstoneRatio(facts)}</strong>${renderOfferingRange(rates.length > 1 ? rates[0] : null,rates.at(-1),0,100,`基石占发售股份 ${offeringCornerstoneRatio(facts)}`,["0%","50%","100%"] )}</div>` : ""}
      <div class="offering-cornerstones">${renderOfferingCornerstones(facts)}</div>
    </div></details>
    ${renderOfferingPreIpo(facts, Boolean(options.openPrimary))}
    ${renderOfferingFee(eligibleOfferingFees().find(fee => fee.roundId === facts.roundId), Boolean(options.openPrimary))}
  </div>`;
}

function eligibleOfferingFees() {
  if (state.feeData?.schemaVersion !== 1) return [];
  return (state.feeData.offers || []).filter(fee => {
    const record = (state.data?.records || []).find(item => item.id === fee.issuerId);
    if (!record || fee.roundId !== `offering:${fee.stockCode}:${fee.prospectusDate}`) return false;
    if (fee.kind === "paused_terms") {
      const notice = currentOfferingNotice(record);
      return notice?.stockCode === fee.stockCode && notice.research?.roundId === fee.roundId;
    }
    return fee.kind === "priced_estimate" && record.hkexListingStockCode === fee.stockCode &&
      record.hkexListingDate === fee.listingDate && record.hkexProspectusDate === fee.prospectusDate;
  });
}

function offeringFeeForRecord(record) {
  return eligibleOfferingFees().find(fee => fee.issuerId === record.id) || null;
}

function feePercent(bps) { return `${offeringNumber(bps / 100,2)}%`; }
function feeSources(sources) {
  return (sources || []).map(s => `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">PDF p.${s.page}</a>`).join(" · ");
}
function feeRateBar(fee) {
  return `<div class="fee-rate-track" role="img" aria-label="约定佣金 ${feePercent(fee.fixedBps)}，额外酌情上限 ${feePercent(fee.discretionaryCapBps)}，合计最高 ${feePercent(fee.upperBps)}" data-fixed-bps="${fee.fixedBps}" data-cap-bps="${fee.upperBps}"><span class="fee-rate-fixed" style="width:${fee.fixedBps / 450 * 100}%"></span><span class="fee-rate-discretionary" style="width:${fee.discretionaryCapBps / 450 * 100}%"></span></div>`;
}
function renderFeeContract(terms) {
  if (!terms) return "";
  const sponsor = terms.sponsorFee;
  return `<div class="fee-contract"><span>约定佣金 <strong>${feePercent(terms.fixedBps)}</strong></span><span>额外酌情上限 <strong>${feePercent(terms.discretionaryCapBps)}</strong></span>${sponsor ? `<span>约定保荐费 <strong>${escapeHtml(sponsor.unit)} ${offeringNumber(Number(sponsor.value))}</strong></span>` : ""}<span class="fee-source">${feeSources(terms.sources)}${sponsor ? ` · ${feeSources(sponsor.sources)}` : ""}</span></div>`;
}
function renderOfferingFee(fee, defaultOpen = false) {
  if (!fee) return "";
  const terms = fee.kind === "paused_terms", sponsor = fee.sponsorFee;
  const row = (label,value) => `<div><dt>${label}</dt><dd>${value}</dd></div>`;
  return `<details class="offering-section fee-disclosure" id="paused-fees" data-fee-round="${escapeHtml(fee.roundId)}"${defaultOpen ? " open" : ""}><summary><strong>发行费用条款</strong><span>${terms ? `约定佣金 ${feePercent(fee.fixedBps)}${fee.discretionaryCapBps ? ` · 合计最高 ${feePercent(fee.upperBps)}` : ""}` : `估计开支 HKD ${offeringNumber(Number(fee.estimatedExpensesHkd) / 1000000,2)} 百万`}</span></summary><div class="offering-section-body">
    <p class="fee-basis">${terms ? "本轮招股条款 · 以发售总额计" : "最终定价 · 绿鞋前 · HKD 百万"}</p>
    ${terms ? `${feeRateBar(fee)}<dl class="fee-detail-grid">${row("约定承销佣金",feePercent(fee.fixedBps))}${row("额外酌情奖励费",fee.discretionaryCapBps ? `最高 ${feePercent(fee.discretionaryCapBps)}` : "不拟支付")}${row("合计上限",feePercent(fee.upperBps))}${sponsor ? row("约定保荐费",`${sponsor.approximate ? "约 " : ""}${escapeHtml(sponsor.unit)} ${offeringNumber(Number(sponsor.value))}${sponsor.scope === "per_sponsor" ? " / 每名保荐人" : ""}<span class="fee-source">${feeSources(sponsor.sources)}</span>`) : ""}</dl>` : `<dl class="fee-detail-grid">${row("发售总额",offeringNumber(Number(fee.grossHkd)/1000000,2))}${row("估计上市开支",offeringNumber(Number(fee.estimatedExpensesHkd)/1000000,2))}${row("估计所得净额",offeringNumber(Number(fee.netHkd)/1000000,2))}${row("估计开支 / 发售总额",feePercent(fee.estimatedExpenseBps))}</dl>`}
    <div class="fee-source">${feeSources(fee.sources)}</div>${renderFeeContract(fee.contractTerms)}
  </div></details>`;
}
function renderIssuerFees(record) {
  const fee = offeringFeeForRecord(record);
  const terms = renderListingFeeTerms(record);
  return fee ? renderOfferingFee(fee) : terms;
}

// Live HKEX Global Offerings (招股中 / 待挂牌) & Post-Pause Relaunch Comparative Analytics
const LIVE_BOOKBUILDING_OFFERS = [
  {
    code: "03275",
    id: "offering:03275:2026-11-23",
    roundId: "offering:03275:2026-11-23",
    priorRoundId: "offering:03275:2026-10-20",
    isRelaunch: true,
    issuerId: "changzhou microintelligence co., ltd",
    name: "常州微亿智造",
    nameEn: "Changzhou Microintelligence Co., Ltd",
    aliases: ["Changzhou Microintelligence Co., Ltd", "常州微億智造科技股份有限公司", "常州微亿智造科技股份有限公司", "微亿智造", "微億智造"],
    route: "bookbuilding",
    stage: "bookbuilding",
    prospectusDate: "2026-11-23",
    bookWindow: "11-23 至 12-01",
    pricingDate: "2026-12-02",
    expectedListingDate: "2026-12-04",
    date: "2026-11-23",
    statusLabel: "搁置后重启招股中",
    subStatusLabel: "11-23~12-01 招股 · 预计 12-04 挂牌",
    priceRangeText: "12.07–15.69",
    downwardFloorPrice: 10.87,
    lotShares: 100,
    entryFeeHkd: 1584.82,
    offerShares: 37275800,
    postShares: 372757356,
    plannedMcapLowBn: 4.4992,
    plannedMcapHighBn: 5.8486,
    plannedMcapFloorBn: 4.0519,
    mechanism: "机制 B · 无强制回拨（可重分配至15%）",
    fixedBps: 250,
    maximumExtraBps: 150,
    upperBps: 400,
    industryTags: ["高端装备/机器人/智能制造", "制造业"],
    issuerType: "h_share",
    isAH: false,
    institutions: [
      {
        legalEntityId: "sponsor-legal:96cba9c10be8f62a",
        legalName: "Orient Capital (Hong Kong) Limited",
        role: "sponsor",
        sponsorId: "orient",
        displayName: "东方融资"
      }
    ],
    currencies: ["CNY", "HKD"],
    gross: {
      basis: "planned",
      currency: "HKD",
      lowHkd: "449918906.00",
      highHkd: "584857302.00",
      floorHkd: "405187946.00",
      source: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1123/2026112300008_c.pdf#page=23"
    },
    commissionSource: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1123/2026112300008_c.pdf#page=286",
    discretionarySource: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1123/2026112300008_c.pdf#page=286",
    sponsorFee: {
      value: "5000000",
      currency: "CNY",
      scope: "sole_sponsor",
      approximate: false,
      source: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1123/2026112300008_c.pdf#page=434"
    },
    sources: [
      "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1123/2026112300008_c.pdf#page=2",
      "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1123/2026112300004_c.pdf#page=2"
    ],
    feeStates: { fixed: "confirmed", extra: "confirmed", upper: "confirmed", sponsor: "confirmed" }
  },
  {
    code: "09941",
    id: "offering:09941:2026-11-16",
    roundId: "offering:09941:2026-11-16",
    isRelaunch: false,
    issuerId: "csrc_notice:7598251",
    name: "先通医药-B",
    nameEn: "Beijing Sinotau International Pharmaceutical Technology Co., Ltd.",
    aliases: ["北京先通國際醫藥科技股份有限公司", "北京先通国际医药科技股份有限公司", "先通醫藥-B", "先通医药", "Sinotau"],
    route: "bookbuilding",
    stage: "bookbuilding",
    prospectusDate: "2026-11-16",
    bookWindow: "11-16 至 11-19",
    pricingDate: "2026-11-20",
    expectedListingDate: "2026-11-24",
    date: "2026-11-16",
    statusLabel: "待配发挂牌（18A）",
    subStatusLabel: "11-19 截飞 · 预计 11-24 挂牌",
    priceRangeText: "52.00–68.00",
    downwardFloorPrice: null,
    lotShares: 50,
    entryFeeHkd: 3434.29,
    offerShares: 6561000,
    postShares: 65609614,
    plannedMcapLowBn: 3.4117,
    plannedMcapHighBn: 4.4615,
    plannedMcapFloorBn: null,
    mechanism: "机制 B · 无强制回拨（可重分配至15%）",
    fixedBps: 250,
    maximumExtraBps: 150,
    upperBps: 400,
    industryTags: ["医药/生物科技/医疗器械制造"],
    issuerType: "h_share",
    isAH: false,
    institutions: [
      { legalEntityId: "sponsor-legal:gf", legalName: "GF Capital (Hong Kong) Limited", role: "sponsor", sponsorId: "gf", displayName: "广发融资" },
      { legalEntityId: "sponsor-legal:cicc", legalName: "China International Capital Corporation Hong Kong Securities Limited", role: "sponsor", sponsorId: "cicc", displayName: "中金公司" },
      { legalEntityId: "sponsor-legal:citic", legalName: "CITIC Securities (Hong Kong) Limited", role: "sponsor", sponsorId: "citic", displayName: "中信证券" }
    ],
    currencies: ["USD", "HKD"],
    gross: {
      basis: "planned",
      currency: "HKD",
      lowHkd: "341172000.00",
      highHkd: "446148000.00",
      source: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1116/2026111600012_c.pdf#page=25"
    },
    commissionSource: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1116/2026111600012_c.pdf#page=318",
    discretionarySource: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1116/2026111600012_c.pdf#page=318",
    sponsorFee: {
      value: "1000000",
      currency: "USD",
      scope: "joint_aggregate",
      approximate: false,
      source: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1116/2026111600012_c.pdf#page=318"
    },
    sources: [
      "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1116/2026111600012_c.pdf#page=2",
      "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1116/2026111600010_c.pdf#page=6"
    ],
    feeStates: { fixed: "confirmed", extra: "confirmed", upper: "confirmed", sponsor: "confirmed" }
  }
];

const RELAUNCH_COMPARISONS = {
  "03275": {
    code: "03275",
    name: "常州微亿智造",
    issuerId: "changzhou microintelligence co., ltd",
    priorRoundId: "offering:03275:2026-10-20",
    liveRoundId: "offering:03275:2026-11-23",
    gapDays: 29,
    postShares: 372757356,
    offerShares: 37275800,
    ruleFloorMcapYi: 40.00,
    ruleFloorPrice: 10.73,
    round1: {
      label: "首轮招股（已延期退股款）",
      prospectusDate: "2026-10-20",
      endNote: "10-25 宣布延期并全额退款",
      priceLow: 16.63,
      priceMid: 19.05,
      priceHigh: 21.46,
      mcapLowYi: 61.99,
      mcapMidYi: 71.01,
      mcapHighYi: 79.99,
      grossLowM: 619.9,
      grossHighM: 799.9,
      netMidM: 641.5,
      expensesM: 68.6,
      entryFee: 2167.64,
      cornerstoneSummary: "易北莱茵投资 US$200万（HK$1,570万）",
      cornerstoneRatio: "占发售 1.96%–2.53%",
      syndicateCount: 12,
      prospectusUrl: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1020/2026102000030_c.pdf",
      postponeUrl: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1025/2026102500002_c.pdf"
    },
    round2: {
      label: "重启招股（正在公开建档）",
      prospectusDate: "2026-11-23",
      windowNote: "11-23 至 12-01 招股 · 12-02 定价 · 12-04 挂牌",
      priceFloor: 10.87,
      priceLow: 12.07,
      priceMid: 13.88,
      priceHigh: 15.69,
      mcapFloorYi: 40.52,
      mcapLowYi: 44.99,
      mcapMidYi: 51.74,
      mcapHighYi: 58.49,
      grossFloorM: 405.2,
      grossLowM: 449.9,
      grossHighM: 584.9,
      netMidM: 452.7,
      netFloorM: 345.0,
      expensesM: 64.7,
      entryFee: 1584.82,
      cornerstoneSummary: "取消基石配售（HK$0 · 整章移除）",
      cornerstoneRatio: "100% 市场化机构建档与公开发售",
      syndicateCount: 16,
      addedSyndicate: ["招银国际", "光银国际", "平安证券(香港)", "软库中华"],
      prospectusUrl: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1123/2026112300008_c.pdf",
      noticeUrl: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1123/2026112300004_c.pdf"
    },
    marketSeries: [
      { d: "10-20", hsi: 23867.74, hstech: 4045.91, tag: "首轮启动" },
      { d: "10-22", hsi: 22934.68, hstech: 3793.93, tag: "" },
      { d: "10-23", hsi: 23093.37, hstech: 3871.66, tag: "首轮截飞/延期" },
      { d: "10-30", hsi: 23294.42, hstech: 3754.90, tag: "" },
      { d: "11-05", hsi: 24796.98, hstech: 4154.29, tag: "反弹高点" },
      { d: "11-12", hsi: 24008.55, hstech: 3931.93, tag: "" },
      { d: "11-18", hsi: 23294.75, hstech: 3736.33, tag: "" },
      { d: "11-20", hsi: 22410.80, hstech: 3511.14, tag: "重启前收市" },
      { d: "11-23", hsi: 22075.85, hstech: 3420.37, tag: "重启招股日" }
    ]
  }
};

function liveBookbuildingOffers() {
  const listedCodes = new Set(eligibleFeeRoster().filter(r => r.route === "listed_offering").map(r => r.code));
  return LIVE_BOOKBUILDING_OFFERS.filter(item => !listedCodes.has(item.code));
}

function findAnyOfferingRound(roundId) {
  return eligibleFeeRoster().find(r => r.id === roundId) || liveBookbuildingOffers().find(r => r.id === roundId) || null;
}

function renderRelaunchComparisonPanel(codeOrRoundId = "03275", opts = {}) {
  const code = String(codeOrRoundId || "").replace(/^offering:/, "").split(":")[0];
  const d = RELAUNCH_COMPARISONS[code];
  if (!d) return "";
  const r1 = d.round1, r2 = d.round2;
  const lowCutPct = ((r2.priceLow / r1.priceLow - 1) * 100).toFixed(1);
  const highCutPct = ((r2.priceHigh / r1.priceHigh - 1) * 100).toFixed(1);
  const floorCutPct = ((r2.priceFloor / r1.priceLow - 1) * 100).toFixed(1);
  const hsiChgPct = ((d.marketSeries[7].hsi / d.marketSeries[0].hsi - 1) * 100).toFixed(1);
  const techChgPct = ((d.marketSeries[7].hstech / d.marketSeries[0].hstech - 1) * 100).toFixed(1);

  // Chart 1: Offer Price & Post-IPO Market Cap Reset Barbell SVG (HK$9.5 to HK$23.0)
  const W1 = 560, H1 = 188, pL = 22, pR = 22, minP = 9.5, maxP = 23.0;
  const xP = p => pL + ((p - minP) / (maxP - minP)) * (W1 - pL - pR);
  const ruleX = xP(d.ruleFloorPrice).toFixed(1);
  const r1x1 = xP(r1.priceLow).toFixed(1), r1x2 = xP(r1.priceHigh).toFixed(1), r1xm = xP(r1.priceMid).toFixed(1);
  const r2xf = xP(r2.priceFloor).toFixed(1), r2x1 = xP(r2.priceLow).toFixed(1), r2x2 = xP(r2.priceHigh).toFixed(1), r2xm = xP(r2.priceMid).toFixed(1);
  const priceSvg = `<svg class="relaunch-svg relaunch-price-svg" viewBox="0 0 ${W1} ${H1}" role="img" aria-label="${escapeHtml(d.name)} 搁置首轮与重启招股定价及总市值对比标尺">
    <line x1="${pL}" x2="${W1 - pR}" y1="158" y2="158" class="rl-axis" />
    ${[10, 12, 14, 16, 18, 20, 22].map(v => `<line x1="${xP(v).toFixed(1)}" x2="${xP(v).toFixed(1)}" y1="28" y2="158" class="rl-grid" /><text x="${xP(v).toFixed(1)}" y="174" text-anchor="middle" class="rl-tick">HK$${v}</text>`).join("")}
    <line x1="${ruleX}" x2="${ruleX}" y1="16" y2="158" class="rl-rule-line" />
    <text x="${(Number(ruleX) + 4).toFixed(1)}" y="25" class="rl-rule-lbl">主板8.05(3) 40亿市值底线 (HK$10.73)</text>
    <text x="${pL}" y="46" class="rl-row-tag is-muted">首轮 10-20（已搁置）</text>
    <rect x="${r1x1}" y="52" width="${(Number(r1x2) - Number(r1x1)).toFixed(1)}" height="15" rx="4" class="rl-bar-r1" />
    <circle cx="${r1xm}" cy="59.5" r="3.5" class="rl-mid-r1" />
    <text x="${r1x1}" y="46" text-anchor="middle" class="rl-val is-muted">16.63 (62.0亿)</text>
    <text x="${r1x2}" y="46" text-anchor="middle" class="rl-val is-muted">21.46 (80.0亿)</text>
    <path d="M ${r1x1} 69 L ${r2x1} 104" class="rl-delta-connector" />
    <path d="M ${r1x2} 69 L ${r2x2} 104" class="rl-delta-connector" />
    <text x="${((Number(r1x1) + Number(r2x1)) / 2 - 6).toFixed(1)}" y="88" text-anchor="end" class="rl-delta-pill">${lowCutPct}%</text>
    <text x="${((Number(r1x2) + Number(r2x2)) / 2 + 8).toFixed(1)}" y="88" text-anchor="start" class="rl-delta-pill">${highCutPct}%</text>
    <text x="${W1 - pR}" y="116" text-anchor="end" class="rl-row-tag is-live">重启 11-23（招股中）</text>
    <rect x="${r2xf}" y="106" width="${(Number(r2x1) - Number(r2xf)).toFixed(1)}" height="17" rx="3" class="rl-bar-floor" />
    <rect x="${r2x1}" y="106" width="${(Number(r2x2) - Number(r2x1)).toFixed(1)}" height="17" rx="4" class="rl-bar-r2" />
    <circle cx="${r2xm}" cy="114.5" r="3.8" class="rl-mid-r2" />
    <text x="${(Number(r2x2) + 6).toFixed(1)}" y="118" text-anchor="start" class="rl-val is-live">12.07–15.69 (45.0–58.5亿)</text>
    <text x="${r2xf}" y="142" text-anchor="start" class="rl-val is-floor">新增 -10% 下调底价 10.87 (市值 40.5亿 · ${floorCutPct}%)</text>
  </svg>`;

  // Chart 2: 29-Day Market Backdrop Sparkline (Normalized 10-20 = 100, plus valuation reset reference)
  const W2 = 520, H2 = 188, mL = 38, mR = 26, mT = 26, mB = 34;
  const pts = d.marketSeries;
  const xM = i => mL + (i / (pts.length - 1)) * (W2 - mL - mR);
  const yIdx = pct => mT + ((6 - pct) / 44) * (H2 - mT - mB); // +6% to -38%
  const hsiPoly = pts.map((p, i) => `${xM(i).toFixed(1)},${yIdx((p.hsi / pts[0].hsi - 1) * 100).toFixed(1)}`).join(" ");
  const techPoly = pts.map((p, i) => `${xM(i).toFixed(1)},${yIdx((p.hstech / pts[0].hstech - 1) * 100).toFixed(1)}`).join(" ");
  const cutY = yIdx(-27.1).toFixed(1);
  const floorY = yIdx(-34.6).toFixed(1);
  const marketSvg = `<svg class="relaunch-svg relaunch-market-svg" viewBox="0 0 ${W2} ${H2}" role="img" aria-label="10月20日首轮招股至11月23日重启期间恒指与恒科指走势对比定价折让幅度">
    ${[0, -10, -20, -30].map(v => `<line x1="${mL}" x2="${W2 - mR}" y1="${yIdx(v).toFixed(1)}" y2="${yIdx(v).toFixed(1)}" class="${v === 0 ? "rl-zero-line" : "rl-grid"}" /><text x="${mL - 5}" y="${(yIdx(v) + 3.5).toFixed(1)}" text-anchor="end" class="rl-tick">${v === 0 ? "基准0%" : v + "%"}</text>`).join("")}
    <line x1="${xM(2).toFixed(1)}" x2="${xM(2).toFixed(1)}" y1="${mT}" y2="${H2 - mB}" class="rl-event-line" />
    <text x="${(xM(2) + 4).toFixed(1)}" y="${mT + 9}" class="rl-event-lbl">10-25 延期退款</text>
    <polyline points="${hsiPoly}" fill="none" class="rl-line-hsi" />
    <polyline points="${techPoly}" fill="none" class="rl-line-tech" />
    <line x1="${xM(6).toFixed(1)}" x2="${xM(8).toFixed(1)}" y1="${cutY}" y2="${cutY}" class="rl-cut-ref" />
    <circle cx="${xM(8).toFixed(1)}" cy="${cutY}" r="4.5" class="rl-mid-r2" />
    <circle cx="${xM(8).toFixed(1)}" cy="${floorY}" r="3.8" class="rl-dot-floor" />
    <text x="${(xM(8) - 8).toFixed(1)}" y="${(Number(cutY) - 6).toFixed(1)}" text-anchor="end" class="rl-val is-live">中位调价 -27.1%（约为科指跌幅2倍）</text>
    <text x="${(xM(8) - 8).toFixed(1)}" y="${(Number(floorY) + 3.5).toFixed(1)}" text-anchor="end" class="rl-val is-floor">下调权底价 -34.6%</text>
    <text x="${(xM(8) - 2).toFixed(1)}" y="${(yIdx(Number(hsiChgPct)) - 8).toFixed(1)}" text-anchor="end" class="rl-series-lbl is-hsi">恒指 ${hsiChgPct}%</text>
    <text x="${(xM(8) - 2).toFixed(1)}" y="${(yIdx(Number(techChgPct)) + 14).toFixed(1)}" text-anchor="end" class="rl-series-lbl is-tech">恒科 ${techChgPct}%</text>
    ${[0, 2, 4, 7, 8].map(i => `<text x="${xM(i).toFixed(1)}" y="${H2 - 14}" text-anchor="${i === 0 ? "start" : i === 8 ? "end" : "middle"}" class="rl-tick">${pts[i].d}</text>`).join("")}
  </svg>`;

  const jumpBtns = opts.context === "fees"
    ? `<a class="action-link-btn" href="${escapeHtml(p0DossierUrl(d.liveRoundId))}" data-round-id="${escapeHtml(d.liveRoundId)}">打开 03275 重启招股档案 →</a><a class="text-button" href="${escapeHtml(p0DossierUrl(d.priorRoundId))}" data-round-id="${escapeHtml(d.priorRoundId)}">首轮搁置留档</a>`
    : opts.context === "paused"
      ? `<button type="button" class="action-link-btn" data-jump-relaunch="${escapeHtml(d.liveRoundId)}">前往「招股中」专席 →</button><a class="text-button" href="${escapeHtml(p0DossierUrl(d.liveRoundId))}" data-round-id="${escapeHtml(d.liveRoundId)}">重启档案 ↗</a>`
      : "";

  return `<section class="relaunch-panel${opts.compact ? " is-compact" : ""}" aria-label="${escapeHtml(d.name)} 搁置后重启招股全景对比剖析">
    <header class="relaunch-head">
      <div>
        <div class="relaunch-kicker-row">
          <span class="relaunch-badge">搁置后重启招股 · 前后轮次全景对比</span>
          <span class="relaunch-meta">相隔 ${d.gapDays} 天（10-25 延期 → 11-23 重启） · 独家保荐：东方融资</span>
        </div>
        <h3>${escapeHtml(d.name)} <span class="mono-code">${d.code}.HK</span> — 主动让利 ~27% 换取市场化建档确定性</h3>
      </div>
      <div class="relaunch-head-links">
        ${jumpBtns}
        <details class="relaunch-doc-fold"><summary>公告原件</summary><div class="relaunch-doc-menu"><a href="${escapeHtml(r1.prospectusUrl)}" target="_blank" rel="noopener noreferrer">首轮招股书 (10-20) ↗</a><a href="${escapeHtml(r1.postponeUrl)}" target="_blank" rel="noopener noreferrer">延期公告 (10-25) ↗</a><a href="${escapeHtml(r2.prospectusUrl)}" target="_blank" rel="noopener noreferrer">重启招股书 (11-23) ↗</a></div></details>
      </div>
    </header>
    <div class="relaunch-charts-grid">
      <div class="relaunch-chart-box">
        <div class="relaunch-chart-title"><strong>① 定价与总市值重设标尺</strong><span>新增 10% 发售价下调机制，底价精准锚定主板 8.05(3) 40 亿市值红线</span></div>
        ${priceSvg}
      </div>
      <div class="relaunch-chart-box">
        <div class="relaunch-chart-title"><strong>② 期间市况与折让安全垫（10-20 = 基准）</strong><span>重启前恒指 ${hsiChgPct}%、恒科指 ${techChgPct}%；估值下调幅度达科指跌幅约 2 倍</span></div>
        ${marketSvg}
      </div>
    </div>
    <div class="relaunch-pillars-grid">
      <article class="relaunch-pillar">
        <span class="rp-label">定价机制与打新门槛</span>
        <strong class="rp-main col-num">HK$16.63–21.46 → HK$12.07–15.69 <em class="is-down">(${lowCutPct}% ~ ${highCutPct}%)</em></strong>
        <p>发售股数维持 <b>3,727.58万股</b>（公开10%/国际90%，机制B）不缩股；新增 <b>-10% 下调权至 HK$10.87</b>（对应市值 40.52亿，严守主板 8.05(3) 40亿测试底线）。每手100股入场费由 HK$2,167.64 降至 <b>HK$1,584.82（-26.9%）</b>。</p>
      </article>
      <article class="relaunch-pillar">
        <span class="rp-label">基石投资者去留</span>
        <strong class="rp-main">易北莱茵 HK$1,570万 (2.2%) → <em>取消基石 (0%)</em></strong>
        <p>首轮仅引入单一私人投资载体易北莱茵（US$200万，占发售股份 1.96%–2.53%），体量较小；11-23 重启版招股书<b>整章移除「基石投资者」</b>，改为 100% 市场化机构建档，解除锁价与重签协议束缚。</p>
      </article>
      <article class="relaunch-pillar">
        <span class="rp-label">市况窗口与重启动因</span>
        <strong class="rp-main col-num">恒指 23,868 → 22,411 <em class="is-down">(${hsiChgPct}%)</em> · 恒科 <em class="is-down">${techChgPct}%</em></strong>
        <p>首轮招股期（10-20~10-23）恰逢恒科指单周急挫 -6.2%，虽公开发售获超额认购，公司仍主动退款择机；29 天后不等大盘回到前高，直接以 <b>~27% 折让 + 10% 下调权</b> 在年末窗口抢跑建档（12-01 截飞、12-04 挂牌）。</p>
      </article>
      <article class="relaunch-pillar">
        <span class="rp-label">承销银团扩容、费率与募投</span>
        <strong class="rp-main">银团 12 家 → <em>16 家 (+4家)</em> · 费率 2.5%+1.5% 不变</strong>
        <p>东方融资保荐费维持 <b>RMB 500万</b>，承销费率维持 <b>2.50%固定+1.50%酌情</b>；新增 <b>${escapeHtml(r2.addedSyndicate.join("、"))}</b> 4 家账簿管理人强化分销；中位净募资由 6.42亿调至 <b>4.53亿港元</b>，五大投向（工业VLA研发 60.3% 等）按原比例缩放。</p>
      </article>
    </div>
  </section>`;
}

// Shared round-level fee facts. Contract maxima and expense estimates stay separate.
const FEE_ROSTER_PAGE_SIZE = 18;
function eligibleFeeRoster() {
  if (state.feeRosterData?.schemaVersion !== 3) return [];
  const records = new Map((state.data?.records || []).map(r => [r.id,r]));
  const exact = new Set(eligibleOfferingFees().map(f => f.roundId));
  return [...state.feeRosterData.rows,...state.feeRosterData.paused].filter(row => {
    const r = records.get(row.issuerId);
    if (!r) return false;
    if (row.route === "paused_offer") return exact.has(row.id);
    if (r.hkexListingDate !== row.listingDate || r.hkexListingStockCode !== row.code) return false;
    return row.route !== "listed_offering" || row.id === `offering:${row.code}:${r.hkexProspectusDate}`;
  });
}
function feeInstMatches(item, inst) {
 return Boolean(inst && inst !== "all" && item && (item.sponsorId === inst || item.legalEntityId === inst));
}
function feeSponsorRoleForRow(row, inst = "all") {
 const items = Array.isArray(row?.institutions) ? row.institutions : [];
 if (!items.length) return "none";
 if (inst && inst !== "all") {
  const idx = items.findIndex(i => feeInstMatches(i, inst));
  if (idx < 0) return "none";
  return items.length === 1 ? "sole" : idx === 0 ? "joint_lead" : "joint_co";
 }
 return items.length === 1 ? "sole" : "joint";
}
function feeMatchesSponsorRole(row, inst = "all", role = "all") {
 if (!role || role === "all") return true;
 const rRole = feeSponsorRoleForRow(row, inst);
 if (inst && inst !== "all") {
  if (role === "lead_all") return rRole === "sole" || rRole === "joint_lead";
  if (role === "joint") return rRole === "joint_lead" || rRole === "joint_co";
  return rRole === role;
 }
 if (role === "sole") return rRole === "sole";
 if (role === "joint" || role === "joint_lead" || role === "joint_co") return rRole === "joint";
 if (role === "lead_all") return rRole !== "none";
 return true;
}
function feeSponsorRoleLabel(role) {
 return ({
  all: "全部角色",
  sole: "独家保荐",
  joint_lead: "牵头联席",
  joint_co: "非牵头联席",
  joint: "联席保荐",
  lead_all: "独家及牵头"
 })[role] || role;
}
function feeInstitutionLabel(inst, all = eligibleFeeRoster()) {
 if (!inst || inst === "all") return "";
 const hit = all.flatMap(r => r.institutions || []).find(i => feeInstMatches(i, inst));
 return hit?.displayName || "";
}
function p0PoolSponsorFeeMedian(rows) {
 const exactByCur = new Map(), allByCur = new Map();
 for (const r of rows) {
  const sp = p0EffectiveSponsorFee(r);
  if (!sp || sp.value == null || !Number.isFinite(Number(sp.value))) continue;
  const val = Number(sp.value);
  if (!allByCur.has(sp.currency)) allByCur.set(sp.currency, []);
  allByCur.get(sp.currency).push(val);
  if (!sp.approximate && sp.exactComparisonEligible !== false) {
   if (!exactByCur.has(sp.currency)) exactByCur.set(sp.currency, []);
   exactByCur.get(sp.currency).push(val);
  }
 }
 const srcMap = exactByCur.size ? exactByCur : allByCur;
 if (!srcMap.size) return "—";
 const [cur, vals] = [...srcMap.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))[0];
 return formatChineseUnitAmount(p0Quantile(vals, 0.5), cur);
}
const FEE_FX_TO_HKD = { HKD: 1, USD: 7.8, CNY: 1.08, RMB: 1.08 };
function p0DealSponsorFeeHkd(row) {
 if (!row) return { hkd: null, raw: null, confirmed: false };
 const sp = p0EffectiveSponsorFee(row);
 if (!sp || sp.value == null || !Number.isFinite(Number(sp.value)) || Number(sp.value) < 0) {
  return { hkd: null, raw: null, confirmed: false };
 }
 const fx = FEE_FX_TO_HKD[sp.currency] || null;
 if (!fx) return { hkd: null, raw: sp, confirmed: false };
 const instLen = Array.isArray(row.institutions) ? row.institutions.length : 0;
 let mult = null;
 if (!sp.fallback) {
  if (["sole_sponsor", "joint_aggregate", "engagement"].includes(sp.scope)) mult = 1;
  else if (sp.scope === "per_sponsor" && Number.isInteger(sp.perSponsorCount) && sp.perSponsorCount >= 1) mult = sp.perSponsorCount;
 } else if (instLen === 1) {
  mult = 1;
 }
 if (mult === null) return { hkd: null, raw: sp, confirmed: false };
 return { hkd: Number(sp.value) * mult * fx, raw: sp, confirmed: !sp.fallback };
}
function p0DealCommissionAmounts(row, basis = state.shoeBasis || "offered") {
 const sponsorCount = Math.max(1, Array.isArray(row?.institutions) ? row.institutions.length : 1);
 const spInfo = p0DealSponsorFeeHkd(row);
 if (!row) return { gross: null, fixedComm: null, extraComm: null, upperComm: null, spHkd: null, totalEconHkd: null, perSponsorCommHkd: null, perSponsorEconHkd: null, sponsorCount: 1 };
 if (row.route === "paused_offer" || row.route === "bookbuilding") {
  const g = row.gross?.highHkd != null ? Number(row.gross.highHkd) : null;
  if (!Number.isFinite(g) || g <= 0) return { gross: null, fixedComm: null, extraComm: null, upperComm: null, spHkd: spInfo.hkd, totalEconHkd: null, perSponsorCommHkd: null, perSponsorEconHkd: null, sponsorCount };
  const fixedComm = typeof row.fixedBps === "number" && Number.isFinite(row.fixedBps) ? g * (row.fixedBps / 10000) : null;
  const extraComm = typeof row.maximumExtraBps === "number" && Number.isFinite(row.maximumExtraBps) ? g * (row.maximumExtraBps / 10000) : null;
  const upperComm = typeof row.upperBps === "number" && Number.isFinite(row.upperBps) ? g * (row.upperBps / 10000) : null;
  const totalEconHkd = fixedComm !== null ? fixedComm + (spInfo.hkd || 0) : null;
  return { gross: g, fixedComm, extraComm, upperComm, spHkd: spInfo.hkd, totalEconHkd, perSponsorCommHkd: fixedComm !== null ? fixedComm / sponsorCount : null, perSponsorEconHkd: totalEconHkd !== null ? totalEconHkd / sponsorCount : null, sponsorCount };
 }
 const gross = p0FeeAmount(row, basis);
 if (gross === null || !Number.isFinite(gross) || gross <= 0) {
  return { gross: null, fixedComm: null, extraComm: null, upperComm: null, spHkd: spInfo.hkd, totalEconHkd: null, perSponsorCommHkd: null, perSponsorEconHkd: null, sponsorCount };
 }
 const phase = row[basis] || {};
 const estVal = phase.estimate?.value != null ? Number(phase.estimate.value) : NaN;
 const rateVal = phase.rate?.value != null ? Number(phase.rate.value) : NaN;
 const fixedComm = Number.isFinite(estVal)
  ? estVal
  : Number.isFinite(rateVal)
   ? gross * rateVal
   : typeof row.fixedBps === "number" && Number.isFinite(row.fixedBps)
    ? gross * (row.fixedBps / 10000)
    : null;
 const extraComm = typeof row.maximumExtraBps === "number" && Number.isFinite(row.maximumExtraBps)
  ? gross * (row.maximumExtraBps / 10000)
  : null;
 const upperComm = typeof row.upperBps === "number" && Number.isFinite(row.upperBps)
  ? (fixedComm !== null && extraComm !== null ? fixedComm + extraComm : gross * (row.upperBps / 10000))
  : null;
 const totalEconHkd = fixedComm !== null ? fixedComm + (spInfo.hkd || 0) : null;
 return {
  gross,
  fixedComm,
  extraComm,
  upperComm,
  spHkd: spInfo.hkd,
  totalEconHkd,
  perSponsorCommHkd: fixedComm !== null ? fixedComm / sponsorCount : null,
  perSponsorEconHkd: totalEconHkd !== null ? totalEconHkd / sponsorCount : null,
  sponsorCount
 };
}
function p0EffectiveCommissionStats(rows, basis = state.shoeBasis || "offered") {
 let totalGross = 0, grossN = 0;
 let fixedComm = 0, fixedGross = 0, fixedN = 0;
 let extraComm = 0, extraGross = 0, extraN = 0;
 let upperComm = 0, upperGross = 0, upperN = 0;
 for (const r of rows || []) {
  const a = p0DealCommissionAmounts(r, basis);
  if (a.gross !== null) {
   totalGross += a.gross;
   grossN += 1;
   if (a.fixedComm !== null) { fixedComm += a.fixedComm; fixedGross += a.gross; fixedN += 1; }
   if (a.extraComm !== null) { extraComm += a.extraComm; extraGross += a.gross; extraN += 1; }
   if (a.upperComm !== null) { upperComm += a.upperComm; upperGross += a.gross; upperN += 1; }
  }
 }
 return {
  totalGross,
  grossN,
  fixedComm,
  fixedGross,
  fixedN,
  effectiveFixedBps: fixedGross > 0 ? (fixedComm / fixedGross) * 10000 : null,
  medianFixedBps: median((rows || []).map(r => r?.fixedBps).filter(Number.isFinite)),
  extraComm,
  extraGross,
  extraN,
  effectiveExtraBps: extraGross > 0 ? (extraComm / extraGross) * 10000 : null,
  upperComm,
  upperGross,
  upperN,
  effectiveUpperBps: upperGross > 0 ? (upperComm / upperGross) * 10000 : null
 };
}
function feeRosterCriteria() {
 return {phase:state.feePhase,query:state.feeQuery,industry:state.feeIndustry,institution:state.feeInstitution,sponsorRole:state.feeSponsorRole,econMetric:state.feeEconMetric,econSplit:state.feeEconSplit,currency:state.feeCurrency,dateFrom:state.feeDateFrom,dateTo:state.feeDateTo,sort:state.feeSort,dir:state.feeSortDir,shoeBasis:state.shoeBasis,sizeBand:state.sizeBand,min:state.feeMin,max:state.feeMax,type:state.feeType};
}

function feeRosterSearchText(r){const record=state.data?.records.find(x=>x.id===r.issuerId);const notice=r.route==='paused_offer'&&record?currentOfferingNotice(record):null;const aCode=record?.aShareCode?`${record.aShareCode} ${record.aShareCode}.SZ ${record.aShareCode}.SH`:'';return normalizeSearchText([r.code,aCode,r.name,r.nameEn,r.issuerId,...r.aliases,...r.industryTags,...r.institutions.flatMap(i=>[i.legalName,i.displayName,i.sponsorId]),notice?'搁置 '+r.statusLabel+' '+getRecordText(record):''].join(' '));}

function filterFeeRoster(rows,c={}) {
 const phase=c.phase||'listed',q=normalizeSearchText(c.query||''),range=p0SizeRange(c),basis=c.shoeBasis||'offered',split=c.econSplit||state.feeEconSplit||'total';
 const sourceRows=phase==='bookbuilding'?(rows.some(r=>r.route==='bookbuilding')?rows:liveBookbuildingOffers()):rows;
 const isPlannedRoute=r=>r.route==='paused_offer'||r.route==='bookbuilding';
 const out=sourceRows.filter(r=>{
  const amount=p0FeeAmount(r,basis);
  return (phase==='all'||(phase==='bookbuilding'?r.route==='bookbuilding':phase==='paused'?r.route==='paused_offer':phase==='other'?['transfer','introduction'].includes(r.route):r.route==='listed_offering'))&&
   (!q||feeRosterSearchText(r).includes(q))&&(!c.basis||c.basis==='all'||r.gross?.basis===c.basis)&&(!c.industry||c.industry==='all'||r.industryTags.includes(c.industry))&&
   (!c.institution||c.institution==='all'||r.institutions.some(i=>feeInstMatches(i,c.institution)))&&
   feeMatchesSponsorRole(r,c.institution||'all',c.sponsorRole||'all')&&
   (!c.currency||c.currency==='all'||r.currencies.includes(c.currency))&&(!c.type||c.type==='all'||r.issuerType===c.type||(c.type==='a_h'&&r.isAH))&&
   (!c.dateFrom||r.date>=c.dateFrom)&&(!c.dateTo||r.date<=c.dateTo)&&(!c.exactSponsorAmountsOnly||(r.sponsorFee&&!r.sponsorFee.approximate&&r.sponsorFee.exactComparisonEligible!==false))&&
   (range.every(v=>v===null)||(isPlannedRoute(r)?((range[0]===null||r.gross.highHkd>=range[0])&&(range[1]===null||r.gross.lowHkd!==null&&r.gross.lowHkd<=range[1])):(amount!==null&&(range[0]===null||amount>=range[0])&&(range[1]===null||amount<=range[1]))));
 });
 const direction=c.dir==='asc'?1:-1;
 const mcapOf=r=>{if(Number.isFinite(Number(r.marketCapHkdBn)))return Number(r.marketCapHkdBn);if(Number.isFinite(Number(r.plannedMcapHighBn)))return Number(r.plannedMcapHighBn);const rec=state.data?.records?.find(x=>x.id===r.issuerId);return rec?.listingMarketCapSampleEligible&&Number.isFinite(Number(rec.listingMarketCapHkdBn))?Number(rec.listingMarketCapHkdBn):null;};
 const value=r=>{
  if(c.sort==='gross')return isPlannedRoute(r)?(r.gross?.highHkd==null?null:Number(r.gross.highHkd)):p0FeeAmount(r,basis);
  if(c.sort==='totalEcon'){const a=p0DealCommissionAmounts(r,basis);return split==='per_sponsor'?a.perSponsorEconHkd:a.totalEconHkd;}
  if(c.sort==='estComm'){const a=p0DealCommissionAmounts(r,basis);return split==='per_sponsor'?a.perSponsorCommHkd:a.fixedComm;}
  if(c.sort==='fixed')return r.fixedBps??null;
  if(c.sort==='extra')return r.maximumExtraBps??null;
  if(c.sort==='upper')return r.upperBps??null;
  if(c.sort==='sponsorFee')return p0DealSponsorFeeHkd(r).hkd;
  if(c.sort==='mcap')return mcapOf(r);
  return r.route==='paused_offer'?r.noticeDate:r.date;
 };
 return out.sort((a,b)=>{const av=value(a),bv=value(b);if(av===null&&bv!==null)return 1;if(bv===null&&av!==null)return-1;if(av!==null&&bv!==null&&av!==bv)return(typeof av==='number'?av-bv:String(av).localeCompare(String(bv)))*direction;return a.code.localeCompare(b.code);});
}

function feeCoverageLabel() {
  const all=eligibleFeeRoster(),live=liveBookbuildingOffers();
  return all.length ? `${all.filter(r=>r.stage === "listed").length} 宗上市${live.length?` · ${live.length} 宗招股中`:""} · ${all.filter(r=>r.stage === "paused").length} 宗搁置` : "发行费用";
}
function feeRosterUrl(row, section = "fees") {
  const p=new URLSearchParams(window.location.search);
  p.set("view","dossiers");p.set("dossierId",row.id);p.set("dossierSection",section);p.delete("dossierQuery");
  return `${window.location.pathname}?${p}`;
}
function feeRosterMillion(value) {return offeringNumber(Number(value)/1000000,1);}

function feeRosterGross(row) {
 if(row.route==='paused_offer'||row.route==='bookbuilding'){const g=row.gross;return `${g.lowHkd==null?'最高 ':feeRosterMillion(g.lowHkd)+'–'}${feeRosterMillion(g.highHkd)}`;}
 const n=p0FeeAmount(row,state.shoeBasis);return n===null?(row.route==='listed_offering'?p0ActualLabel(row):'—'):feeRosterMillion(n);
}

function feeRosterRate(value) { return value == null ? "—" : feePercent(value); }
function feeRosterSource(url, label) {
  return url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>` : "";
}
function feeRosterSourceLabel(url,label) {
  return `${label}${url?.match(/#page=(\d+)$/)?.[1] ? ` p.${url.match(/#page=(\d+)$/)[1]}` : ""}`;
}
function feeRosterOptions(items,current,all) {
  return `<option value="all">${all}</option>`+items.map(([value,label])=>`<option value="${escapeHtml(value)}"${current === value ? " selected" : ""}>${escapeHtml(label)}</option>`).join("");
}
function renderFeeRosterControls(all) {
 const root=document.getElementById('feeControls'),open=root.querySelector('details')?.open;
 const bookRows=liveBookbuildingOffers();
 const counts={listed:all.filter(r=>r.route==='listed_offering').length,bookbuilding:bookRows.length,paused:all.filter(r=>r.route==='paused_offer').length,other:all.filter(r=>['transfer','introduction'].includes(r.route)).length};
 const combinedForMeta=[...all,...bookRows];
 const industries=[...new Set(combinedForMeta.flatMap(r=>r.industryTags))].sort().map(x=>[x,x]);
 const phasePool=state.feePhase==='bookbuilding'?bookRows:all.filter(r=>state.feePhase==='paused'?r.route==='paused_offer':state.feePhase==='other'?['transfer','introduction'].includes(r.route):r.route==='listed_offering');
 const firmByKey=new Map();
 for(const r of combinedForMeta){
  for(const i of (r.institutions||[])){
   const key=i.sponsorId||i.legalEntityId;
   if(!key)continue;
   if(!firmByKey.has(key))firmByKey.set(key,{key,sponsorId:i.sponsorId||'',displayName:i.displayName,legalEntityIds:new Set(),phaseCount:0,totalCount:0});
   const entry=firmByKey.get(key);
   if(i.legalEntityId)entry.legalEntityIds.add(i.legalEntityId);
   entry.totalCount+=1;
  }
 }
 for(const r of phasePool){
  for(const i of (r.institutions||[])){
   const key=i.sponsorId||i.legalEntityId;
   if(key&&firmByKey.has(key))firmByKey.get(key).phaseCount+=1;
  }
 }
 const sortedFirms=[...firmByKey.values()].sort((a,b)=>b.phaseCount-a.phaseCount||b.totalCount-a.totalCount||a.displayName.localeCompare(b.displayName,'zh-Hans-CN'));
 const firms=sortedFirms.map(f=>[f.key,`${f.displayName}（${f.phaseCount}）`]);
 let activeFirmEntry=firmByKey.get(state.feeInstitution)||null;
 if(state.feeInstitution!=='all'&&!activeFirmEntry){
  activeFirmEntry=sortedFirms.find(f=>f.legalEntityIds.has(state.feeInstitution))||null;
  if(activeFirmEntry)firms.unshift([state.feeInstitution,`${activeFirmEntry.displayName}（指定主体）`]);
 }
 const activeInstLabel=activeFirmEntry?.displayName||'';
 const activeSponsorId=activeFirmEntry?.sponsorId||'';
 const activePhaseFirmCount=sortedFirms.filter(f=>f.phaseCount>0).length||sortedFirms.length;
 const roleBaseCriteria={...feeRosterCriteria(),sponsorRole:'all'};
 const roleBaseRows=filterFeeRoster(all,roleBaseCriteria);
 const roleTabs=[
  ['all','全部'],
  ['sole','独家保荐'],
  ['joint_lead','牵头联席'],
  ['joint_co','非牵头联席']
 ].map(([k,lbl])=>{
  const cnt=k==='all'?roleBaseRows.length:filterFeeRoster(roleBaseRows,{...roleBaseCriteria,sponsorRole:k}).length;
  const active=state.feeSponsorRole===k;
  const zero=cnt===0&&!active;
  const tip=k==='joint_lead'?'联席保荐项目 · 招股书封面首位列明（牵头）':k==='joint_co'?'联席保荐项目 · 非首位参团联席保荐人':k==='sole'?'独家保荐项目（单一保荐机构）':'全部保荐角色';
  return `<button type="button" data-fee-role="${k}" class="${zero?'is-zero':''}" aria-pressed="${active}" title="${tip}">${lbl}<span>${cnt}</span></button>`;
 }).join('');
 const quickFirmIds=['cicc','citic','huatai','gtja','ms','gs'];
 const quickFirmsHtml=state.feeInstitution==='all'&&state.feePhase==='listed'
  ? `<div class="fee-quick-firms" role="group" aria-label="头部保荐机构速选">${quickFirmIds.map(id=>firmByKey.get(id)).filter(f=>f&&f.phaseCount>0).map(f=>`<button type="button" class="fee-quick-firm-chip" data-fee-inst-quick="${escapeHtml(f.key)}">${escapeHtml(f.displayName)} <em>${f.phaseCount}</em></button>`).join('')}</div>`
  : '';
 const activeInstActions=activeInstLabel
  ? `<div class="fee-inst-active-actions">${activeSponsorId?`<button type="button" class="sponsor-jump-link" data-global-firm="${escapeHtml(activeSponsorId)}">龙虎榜档案 ↗</button>`:''}<button type="button" class="fee-inst-clear" data-clear-filter="feeInstitution" data-filter-view="fees" aria-label="清除保荐机构筛选" title="清除保荐机构筛选">清除机构 ×</button></div>`
  : '';
 const sponsorBarHtml=state.feePhase!=='other'
  ? `<div class="fee-sponsor-bar"><div class="fee-sponsor-bar-left"><label class="fee-inst-picker${activeInstLabel?' is-active':''}"><span>保荐机构</span><select data-fee-state="feeInstitution" aria-label="按保荐机构筛选">${feeRosterOptions(firms,state.feeInstitution,`全部机构（${activePhaseFirmCount}家）`)}</select></label>${activeInstActions}${quickFirmsHtml}</div><div class="fee-role-tabs" role="group" aria-label="保荐角色筛选">${roleTabs}</div></div>`
  : '';
 const select=(name,label,items,current)=>`<label>${label}<select data-fee-state="${name}">${feeRosterOptions(items,current,'全部')}</select></label>`;
 const pendingActualCount=state.feePhase==='listed'&&state.shoeBasis==='actual'?all.filter(r=>r.route==='listed_offering'&&!r.actual?.gross).length:0;
 const pendingActualHint=pendingActualCount>0?`<span class="basis-stabilising-hint">（注：东山精密 02384 等 ${pendingActualCount} 宗稳价期刚届满或待刊发绿鞋结果，切回「绿鞋前最终额」可看全量）</span>`:'';
 const liveBannerHtml=state.feePhase==='listed'&&bookRows.length>0
  ? `<div class="fee-live-banner" role="region" aria-label="当前招股与待挂牌新股"><span class="fee-live-dot"></span><strong>招股中 · ${bookRows.length} 宗</strong><div class="fee-live-items">${bookRows.map(b=>`<button type="button" class="fee-live-chip${b.isRelaunch?' is-relaunch':''}" data-fee-phase="bookbuilding"><b>${escapeHtml(b.code)} ${escapeHtml(b.name)}</b><span>${escapeHtml(b.isRelaunch?'搁置后降价~27%重启 · '+b.bookWindow+'招股':b.subStatusLabel)}</span></button>`).join('')}</div><button type="button" class="action-link-btn" data-fee-phase="bookbuilding">招股中与重启对比剖析 →</button></div>`
  : '';
 const phaseTabs=[['listed','已定价发售'],...(counts.bookbuilding>0||state.feePhase==='bookbuilding'?[['bookbuilding','招股中']]:[]),['paused','搁置发售'],['other','转板与介绍']];
 root.innerHTML=`<div class="fee-roster-toolbar"><div class="fee-phase-tabs" role="group" aria-label="发售类别">${phaseTabs.map(([k,l])=>`<button type="button" data-fee-phase="${k}" aria-pressed="${state.feePhase===k}">${l}<span>${counts[k]}</span></button>`).join('')}</div><button type="button" class="action-link-btn fee-paused-workbench-link" data-jump-view="pausedOfferings">发售搁置专题工作台 →</button></div>
 ${liveBannerHtml}
 ${sponsorBarHtml}
 <div class="fee-basis-row">${state.feePhase==='listed'?`<div class="segmented-inline" role="group" aria-label="募资口径"><button type="button" data-shoe-basis="offered" aria-pressed="${state.shoeBasis==='offered'}">绿鞋前最终额</button><button type="button" data-shoe-basis="actual" aria-pressed="${state.shoeBasis==='actual'}">绿鞋后实际额</button></div>${pendingActualHint}`:state.feePhase==='bookbuilding'?'<span class="basis-pill-note is-live">正在招股 / 待配发挂牌 · 招股价区间毛额（绿鞋前）</span>':state.feePhase==='paused'?'<span class="basis-pill-note">拟定招股区间 · 绿鞋前毛额</span>':'<span class="basis-pill-note">非公开发售上市事件</span>'}${state.feePhase!=='other'?`<div class="size-band-group" role="group" aria-label="规模档位"><button type="button" data-size-band="under500" aria-pressed="${state.sizeBand==='under500'}">&lt;5 亿</button><button type="button" data-size-band="600_900" aria-pressed="${state.sizeBand==='600_900'}">6–9 亿</button><button type="button" data-size-band="over2000" aria-pressed="${state.sizeBand==='over2000'}">&gt;20 亿</button></div><label class="range-inputs-label"><span>规模 (HKD 百万)</span><input type="number" inputmode="decimal" data-fee-state="feeMin" value="${escapeHtml(state.feeMin)}" placeholder="下限" aria-label="发售规模下限"><span>–</span><input type="number" inputmode="decimal" data-fee-state="feeMax" value="${escapeHtml(state.feeMax)}" placeholder="上限" aria-label="发售规模上限"></label>`:''}<details class="fee-filters"${open?' open':''}><summary>行业、类别与日期筛选</summary><div class="fee-filter-grid">${select('feeType','发行类别',[['h_share','H股'],['a_h','A+H'],['red_chip','红筹']],state.feeType)}${select('feeIndustry','行业',industries,state.feeIndustry)}${select('feeCurrency','保荐费币种',[['HKD','HKD'],['USD','USD'],['CNY','CNY']],state.feeCurrency)}<label>起始日<input type="date" data-fee-state="feeDateFrom" value="${escapeHtml(state.feeDateFrom)}"></label><label>截止日<input type="date" data-fee-state="feeDateTo" value="${escapeHtml(state.feeDateTo)}"></label></div></details><button type="button" class="clear-button" data-fee-reset>重置</button></div>`;
}

function renderFeeInsightStrip(all, rows = null) {
 const el=document.getElementById('feeInsightStrip');if(!el)return;
 if(state.feePhase!=='listed'){el.hidden=true;el.innerHTML='';return;}
 const listed=all.filter(r=>r.route==='listed_offering');
 if(!listed.length){el.hidden=true;el.innerHTML='';return;}
 const pool=Array.isArray(rows)&&rows.length?rows:listed;
 const narrowed=pool.length<listed.length;
 const basis=state.shoeBasis||'offered';
 const effFixed=list=>{const st=p0EffectiveCommissionStats(list,basis);return st.effectiveFixedBps!==null?feePercent(st.effectiveFixedBps):'—';};
 const sumGross=list=>{const st=p0EffectiveCommissionStats(list,basis);return st.grossN?formatChineseUnitAmount(st.totalGross,'HKD'):'—';};
 const small=pool.filter(r=>{const a=p0FeeAmount(r,basis);return a!==null&&a<500e6;});
 const mid=pool.filter(r=>{const a=p0FeeAmount(r,basis);return a!==null&&a>=500e6&&a<=2000e6;});
 const large=pool.filter(r=>{const a=p0FeeAmount(r,basis);return a!==null&&a>2000e6;});
 const ah=pool.filter(r=>r.isAH),nonAh=pool.filter(r=>!r.isAH);
 const shoeConfirmed=pool.filter(r=>r.shoe?.value&&['full_exercised','partially_exercised','not_exercised','no_option','full','partial','exercised'].includes(r.shoe.value));
 const shoeFull=shoeConfirmed.filter(r=>['full_exercised','full'].includes(r.shoe.value)).length;
 const shoePart=shoeConfirmed.filter(r=>['partially_exercised','partial','exercised'].includes(r.shoe.value)).length;
 const shoeNone=shoeConfirmed.filter(r=>r.shoe.value==='not_exercised').length;
 const shoeExRate=shoeConfirmed.length?offeringNumber((shoeFull+shoePart)/shoeConfirmed.length*100,1)+'%':'—';
 el.hidden=false;
 el.innerHTML=`<div class="stat-cell" title="各规模档位内：所有项目固定佣金总和 ÷ 发行规模总和"><span class="stat-label">${narrowed?'当前筛选 · 规模阶梯有效佣金':'规模阶梯 · 有效固定佣金率'}</span><strong class="stat-val col-num">${effFixed(small)} <small>→</small> ${effFixed(mid)} <small>→</small> ${effFixed(large)}</strong><small class="stat-sub">&lt;5亿 (${small.length}) · 5–20亿 (${mid.length}) · &gt;20亿 (${large.length}) · Σ佣金/Σ规模</small></div>
  <div class="stat-cell" title="A+H 与非 A+H 板块各自：所有项目固定佣金总和 ÷ 发行规模总和"><span class="stat-label">${narrowed?'当前筛选 · A+H vs 非A+H 有效佣金':'A+H vs 非A+H 有效佣金率'}</span><strong class="stat-val col-num">A+H ${effFixed(ah)} · 非A+H ${effFixed(nonAh)}</strong><small class="stat-sub">总募资：A+H ${sumGross(ah)} (${ah.length}宗) · 非A+H ${sumGross(nonAh)} (${nonAh.length}宗)</small></div>
  <div class="stat-cell"><span class="stat-label">${narrowed?'当前筛选 · 绿鞋行使率':'超额配股权（绿鞋）行使率'}</span><strong class="stat-val col-num">${shoeExRate}</strong><small class="stat-sub">已核实 ${shoeConfirmed.length} 宗：全额 ${shoeFull} · 部分 ${shoePart} · 未行使 ${shoeNone}</small></div>`;
}

// Exact comparisons use whole-engagement amounts in one explicitly selected currency.
// Individual-case disclosure (including approximate and per-sponsor fees) stays unchanged.
function p0SponsorComparisonCurrency() {
 return ['HKD','USD','CNY'].includes(state.feeCurrency)?state.feeCurrency:'HKD';
}
function p0ComparableSponsorFee(r,currency='HKD') {
 if(!r||r.route!=='listed_offering')return null;
 const sp=p0EffectiveSponsorFee(r);
 if(!sp||sp.currency!==currency||sp.approximate||sp.exactComparisonEligible===false)return null;
 if(sp.value===null||sp.value===undefined||String(sp.value).trim()===''||!Number.isFinite(Number(sp.value))||Number(sp.value)<0)return null;
 const source=sp.source||'',documentUrl=source.split('#')[0];
 if(!/^https:\/\//.test(source)||!(r.sources||[]).includes(documentUrl))return null;
 let multiplier=1;
 // An unreviewed tracker amount may already be an aggregate; count is not amount scope.
 if(sp.fallback)return null;
 if(sp.scope==='per_sponsor'){
  const count=sp.perSponsorCount;
  if(!Number.isInteger(count)||count<1)return null;
  multiplier=count;
 }else if(!['sole_sponsor','joint_aggregate','engagement'].includes(sp.scope))return null;
 const value=Number(sp.value)*multiplier;if(!Number.isFinite(value))return null;
 return {roundId:r.id,currency,value,scope:'engagement',originalScope:sp.scope,originalValue:Number(sp.value),multiplier,source};
}
function p0SponsorFeeBenchmark(rows,currency='HKD') {
 const samples=[...new Map(rows.map(r=>[r.id,r])).values()].map(r=>p0ComparableSponsorFee(r,currency)).filter(Boolean);
 const values=samples.map(f=>f.value).sort((a,b)=>a-b),n=values.length;
 const statistic=n>=3?'median':n===2?'range':n===1?'single':'none';
 const label={median:'中位',range:'区间',single:'单笔',none:''}[statistic];
 const amount=n>=3?formatChineseUnitAmount(p0Quantile(values,.5),currency):n===2?`${formatChineseUnitAmount(values[0],currency)}–${formatChineseUnitAmount(values[1],currency).replace(currency+' ','')}`:n===1?formatChineseUnitAmount(values[0],currency):'—';
 const compact=`${label?label+' ':''}${amount}`;
 return {currency,scope:'engagement',count:n,statistic,median:n>=3?p0Quantile(values,.5):null,samples,compact,text:`${compact} · n=${n}`};
}
let feeSponsorFirms=null,feeSponsorFirmsLoad=null;
function loadFeeSponsorFirms() {
 if(feeSponsorFirms||feeSponsorFirmsLoad||typeof fetch!=='function')return;
 feeSponsorFirmsLoad=fetch('data/sponsor_leaderboard_demo.json',{cache:'no-cache'}).then(response=>{
  if(!response.ok)throw new Error(`Sponsor metadata HTTP ${response.status}`);return response.json();
 }).then(payload=>{
  if(payload.meta?.sourceGeneratedAt!==state.data?.meta?.generatedAt||!Array.isArray(payload.firms))throw new Error('Sponsor metadata snapshot mismatch');
  feeSponsorFirms=payload.firms;
  if(state.view==='fees')renderFeeScaleCurvePanel(eligibleFeeRoster());
 }).catch(error=>console.warn('Fee sponsor grouping unavailable:',error.message));
}
function p0FeeSponsorCamps(rows,firms=feeSponsorFirms||[]) {
 const natures=new Map(firms.map(f=>[f.sponsorId,f.sponsorNature]));
 const camps=[{key:'cn',label:'全中资',rows:[]},{key:'mixed',label:'中资＋外资',rows:[]},{key:'foreign',label:'全外资',rows:[]},{key:'other',label:'港资／其他组合',rows:[]}];
 for(const row of rows){
  const values=(row.institutions||[]).map(i=>natures.get(i.sponsorId));
  const key=values.length&&values.every(v=>v==='中资')?'cn':values.length&&values.every(v=>v==='外资')?'foreign':values.includes('中资')&&values.includes('外资')&&values.every(v=>v==='中资'||v==='外资')?'mixed':'other';
  camps.find(c=>c.key===key).rows.push(row);
 }
 return camps;
}

function renderFeeBenchmarkStrip(all) {
 const el=document.getElementById('feeBenchmarkStrip');if(!el)return;
 if(state.feePhase==='other'){el.hidden=true;el.innerHTML='';return;}
 const baseCriteria={...feeRosterCriteria(),sizeBand:'all',min:'',max:''};
 if(state.feePhase==='bookbuilding'){
  const live=filterFeeRoster(all,baseCriteria);
  const lowSum=live.reduce((s,r)=>s+Number(r.gross?.lowHkd||0),0);
  const highSum=live.reduce((s,r)=>s+Number(r.gross?.highHkd||0),0);
  const relaunchN=live.filter(r=>r.isRelaunch).length;
  el.hidden=false;
  el.innerHTML=`<div class="stat-cell"><span class="stat-label">正在招股 / 待挂牌新股</span><strong class="stat-val col-num">${live.length} 宗</strong><small class="stat-sub">${relaunchN?`含搁置调价重启 ${relaunchN} 宗（03275 微亿智造）`:'已刊发全球发售招股章程'}</small></div>
   <div class="stat-cell"><span class="stat-label">合计拟募资区间（绿鞋前）</span><strong class="stat-val col-num">HKD ${offeringNumber(lowSum/1e8,2)}–${offeringNumber(highSum/1e8,2)}亿</strong><small class="stat-sub">按招股章程指导价区间计算</small></div>
   <div class="stat-cell"><span class="stat-label">约定承销费率基准</span><strong class="stat-val col-num">固定 2.50% · 上限 4.00%</strong><small class="stat-sub">含额外酌情奖励上限 1.50%</small></div>`;
  return;
 }
 if(state.feePhase==='paused'){
  const paused=filterFeeRoster(all,baseCriteria);
  const pst=p0EffectiveCommissionStats(paused,'offered');
  el.hidden=false;
  el.innerHTML=`<div class="stat-cell"><span class="stat-label">搁置发售轮次</span><strong class="stat-val col-num">${paused.length} 宗</strong><small class="stat-sub">延期发售或本轮不进行 · 招股条款与基石档案</small></div>
   <div class="stat-cell"><span class="stat-label">约定有效固定佣金率</span><strong class="stat-val col-num">${pst.effectiveFixedBps!==null?feePercent(pst.effectiveFixedBps):'—'}</strong><small class="stat-sub">有效合计上限 ${pst.effectiveUpperBps!==null?feePercent(pst.effectiveUpperBps):'—'} · 按拟募上限加权</small></div>
   <button type="button" class="stat-cell is-clickable" data-jump-view="pausedOfferings"><span class="stat-label">专题对比工作台</span><strong class="stat-val">5 宗并排拆解 →</strong><small class="stat-sub">机制 B 占比 · 基石名单 · 承销团矩阵</small></button>`;
  return;
 }
 const pool=filterFeeRoster(all,baseCriteria),basis=state.shoeBasis||'offered';
 const tiers=[
  {key:'all',label:'全部已定价',filter:()=>true},
  {key:'under500',label:'<5 亿港元',filter:r=>{const a=p0FeeAmount(r,basis);return a!==null&&a<=500e6;}},
  {key:'600_900',label:'6–9 亿港元',filter:r=>{const a=p0FeeAmount(r,basis);return a!==null&&a>=600e6&&a<=900e6;}},
  {key:'over2000',label:'>20 亿港元',filter:r=>{const a=p0FeeAmount(r,basis);return a!==null&&a>=2000e6;}}
 ];
 el.hidden=false;
 el.innerHTML=tiers.map(t=>{
  const subset=pool.filter(t.filter);
  const st=p0EffectiveCommissionStats(subset,basis);
  const sponsorBenchmark=p0SponsorFeeBenchmark(subset,p0SponsorComparisonCurrency());
  const active=(t.key==='all'&&state.sizeBand==='all'&&!state.feeMin&&!state.feeMax)||(t.key!=='all'&&state.sizeBand===t.key&&!state.feeMin&&!state.feeMax);
  const subVolume=st.fixedN?`佣金 ${formatChineseUnitAmount(st.fixedComm,'HKD')} / 募资 ${formatChineseUnitAmount(st.fixedGross,'HKD')}`:(st.grossN?`总募资 ${formatChineseUnitAmount(st.totalGross,'HKD')}`:'—');
  return `<button type="button" class="stat-cell is-clickable fee-tier-card${active?' is-active':''}" data-fee-tier="${t.key}" aria-pressed="${active}" title="有效佣金率 = 该档位所有项目佣金总和 ÷ 发行规模总和"><span class="stat-label">${t.label} <em>${subset.length} 宗</em></span><strong class="stat-val col-num">${st.effectiveFixedBps!==null?feePercent(st.effectiveFixedBps):'—'} <small>有效固定 · 上限 ${st.effectiveUpperBps!==null?feePercent(st.effectiveUpperBps):'—'}</small></strong><small class="stat-sub">${escapeHtml(subVolume)} · ${escapeHtml(sponsorBenchmark.currency)} 整单保荐费 ${escapeHtml(sponsorBenchmark.text)}</small></button>`;
 }).join('');
}

let feeCurveExpanded = null;
let lastFeeCurvePts = [];
const FEE_CURVE_STAGE = { W: 620, H: 228 };

function renderFeeScaleCurvePanel(all, rows = null) {
 const panel = document.getElementById("feeScaleCurvePanel");
 if (!panel) return;
 if (panel.innerHTML && typeof panel.open === "boolean") feeCurveExpanded = panel.open;
 if (state.feePhase !== "listed") {
  panel.hidden = true;
  panel.innerHTML = "";
  lastFeeCurvePts = [];
  return;
 }
 loadFeeSponsorFirms();
 const currency = p0SponsorComparisonCurrency();
 const basis = state.shoeBasis || "offered";
 const listed = all.filter(r => r.route === "listed_offering");
 const activeRows = Array.isArray(rows) ? rows : filterFeeRoster(all, feeRosterCriteria());
 const matchedIds = new Set(activeRows.map(r => r.id));
 const hasInstFilter = state.feeInstitution !== "all";
 const hasActiveFilter = Boolean(
  hasInstFilter ||
  state.feeSponsorRole !== "all" ||
  state.sizeBand !== "all" ||
  state.feeMin !== "" ||
  state.feeMax !== "" ||
  state.feeIndustry !== "all" ||
  state.feeCurrency !== "all" ||
  state.feeType !== "all" ||
  String(state.feeQuery || "").trim() !== "" ||
  state.feeDateFrom !== "" ||
  state.feeDateTo !== ""
 );
 const activeInstName = hasInstFilter ? feeInstitutionLabel(state.feeInstitution, all) : "";
 const W = FEE_CURVE_STAGE.W, H = FEE_CURVE_STAGE.H, padL = 44, padR = 16, padT = 18, padB = 34;
 const minLog = Math.log10(80), maxLog = Math.log10(60000);
 const rawPts = listed.map(r => {
  const gross = p0FeeAmount(r, basis);
  if (gross === null || gross <= 0 || typeof r.fixedBps !== "number" || !Number.isFinite(r.fixedBps)) return null;
  const matched = matchedIds.has(r.id);
  const instRole = hasInstFilter ? feeSponsorRoleForRow(r, state.feeInstitution) : (r.institutions.length === 1 ? "sole" : "joint");
  return { r, grossM: gross / 1e6, gross, fixedPct: r.fixedBps / 100, matched, instRole };
 }).filter(Boolean);
 if (!rawPts.length) {
  panel.hidden = true;
  panel.innerHTML = "";
  lastFeeCurvePts = [];
  return;
 }
 const maxPct = Math.max(4.2, Math.min(6, Math.ceil(Math.max(...rawPts.map(p => p.fixedPct)) * 2) / 2));
 const xOf = m => padL + (Math.min(maxLog, Math.max(minLog, Math.log10(m))) - minLog) / (maxLog - minLog) * (W - padL - padR);
 const yOf = pct => padT + (1 - Math.min(maxPct, Math.max(0, pct)) / maxPct) * (H - padT - padB);
 const pts = rawPts.map(p => ({ ...p, cx: xOf(p.grossM), cy: yOf(p.fixedPct) }));
 lastFeeCurvePts = pts;
 const xTicks = [[100, "1亿"], [300, "3亿"], [1000, "10亿"], [3000, "30亿"], [10000, "100亿"], [50000, "500亿"]];
 const yTicks = [0, 1, 2, 3, 4].filter(t => t <= maxPct + 0.01);
 const bandDefs = [
  { mid: 280, list: pts.filter(p => p.grossM < 500) },
  { mid: 720, list: pts.filter(p => p.grossM >= 500 && p.grossM < 1000) },
  { mid: 1600, list: pts.filter(p => p.grossM >= 1000 && p.grossM < 2500) },
  { mid: 6500, list: pts.filter(p => p.grossM >= 2500) }
 ];
 const bandEffPct = list => {
  const st = p0EffectiveCommissionStats(list.map(p => p.r), basis);
  return st.effectiveFixedBps !== null ? st.effectiveFixedBps / 100 : null;
 };
 const trendPts = bandDefs.filter(b => b.list.length >= 3).map(b => {
  const ep = bandEffPct(b.list);
  return ep !== null ? `${xOf(b.mid).toFixed(1)},${yOf(ep).toFixed(1)}` : "";
 }).filter(Boolean);
 const gridSvg = yTicks.map(t => `<line class="fee-curve-grid" x1="${padL}" x2="${W - padR}" y1="${yOf(t).toFixed(1)}" y2="${yOf(t).toFixed(1)}" /><text class="fee-curve-axis-label" x="${padL - 7}" y="${(yOf(t) + 3.5).toFixed(1)}" text-anchor="end">${t}%</text>`).join("")
  + xTicks.map(([v, label]) => `<line class="fee-curve-grid is-x" x1="${xOf(v).toFixed(1)}" x2="${xOf(v).toFixed(1)}" y1="${padT}" y2="${H - padB}" /><text class="fee-curve-axis-label" x="${xOf(v).toFixed(1)}" y="${H - 12}" text-anchor="middle">${label}</text>`).join("");
 const trendSvg = trendPts.length >= 2 ? `<polyline class="fee-curve-trend${hasActiveFilter ? " is-backdrop" : ""}" points="${trendPts.join(" ")}" fill="none" />` : "";

 const litPts = hasActiveFilter ? pts.filter(p => p.matched) : pts;
 const dimPts = hasActiveFilter ? pts.filter(p => !p.matched) : [];

 const buildDotAria = p => {
  const roleNote = hasInstFilter && p.instRole !== "none"
   ? ` · ${activeInstName}：${feeSponsorRoleLabel(p.instRole)}`
   : ` · ${p.r.institutions.length === 1 ? "独家保荐" : `联席保荐(${p.r.institutions[0]?.displayName || ""}牵头)`}`;
  return `${p.r.name} (${p.r.code}.HK)${roleNote} · 募资 ${formatChineseUnitAmount(p.gross, "HKD")} · 固定佣金 ${feePercent(p.r.fixedBps)}`;
 };

 let dotsSvg = "";
 let subGuideSvg = "";
 if (!hasActiveFilter) {
  dotsSvg = pts.map(p => {
   const cx = p.cx.toFixed(1), cy = p.cy.toFixed(1);
   return `<circle class="fee-curve-dot ${p.r.isAH ? "is-ah" : "is-nonah"}" cx="${cx}" cy="${cy}" r="4.3" data-fee-dot-round="${escapeHtml(p.r.id)}" tabindex="0" role="button" aria-label="${escapeHtml(buildDotAria(p))}"></circle>`;
  }).join("");
 } else {
  const backdropSvg = dimPts.map(p => {
   const cx = p.cx.toFixed(1), cy = p.cy.toFixed(1);
   return `<circle class="fee-curve-dot is-dimmed ${p.r.isAH ? "is-ah" : "is-nonah"}" cx="${cx}" cy="${cy}" r="3.3" data-fee-dot-round="${escapeHtml(p.r.id)}" tabindex="-1" aria-label="${escapeHtml(buildDotAria(p))}"></circle>`;
  }).join("");
  const litEff = p0EffectiveCommissionStats(activeRows, basis);
  if (litPts.length >= 1 && litEff.effectiveFixedBps !== null) {
   const effPct = litEff.effectiveFixedBps / 100;
   const my = yOf(effPct);
   const lblY = my > padT + 15 ? (my - 5).toFixed(1) : (my + 12).toFixed(1);
   subGuideSvg = `<g class="fee-curve-sub-guide" pointer-events="none"><line class="fee-curve-sub-median" x1="${padL}" x2="${W - padR}" y1="${my.toFixed(1)}" y2="${my.toFixed(1)}" /><text class="fee-curve-sub-label" x="${W - padR - 2}" y="${lblY}" text-anchor="end">有效佣金率 ${effPct.toFixed(2)}%</text></g>`;
  }
  const activeSvg = litPts.map(p => {
   const cx = p.cx.toFixed(1), cy = p.cy.toFixed(1);
   const roleCls = hasInstFilter
    ? (p.instRole === "sole" ? "is-role-sole" : p.instRole === "joint_lead" ? "is-role-lead" : "is-role-co")
    : (p.r.isAH ? "is-ah" : "is-nonah");
   return `<g class="fee-dot-lit-group"><circle class="fee-curve-halo ${roleCls}" cx="${cx}" cy="${cy}" r="8.4" pointer-events="none" /><circle class="fee-curve-dot is-highlighted ${roleCls}" cx="${cx}" cy="${cy}" r="5.5" data-fee-dot-round="${escapeHtml(p.r.id)}" tabindex="0" role="button" aria-label="${escapeHtml(buildDotAria(p))}"></circle></g>`;
  }).join("");
  dotsSvg = `<g class="fee-dots-backdrop">${backdropSvg}</g>${subGuideSvg}<g class="fee-dots-active">${activeSvg}</g>`;
 }

 let legendHtml = "";
 if (!hasActiveFilter) {
  const ahCount = pts.filter(p => p.r.isAH).length;
  const nonAhCount = pts.length - ahCount;
  legendHtml = `<span><i class="is-ah"></i>A+H (${ahCount})</span>
   <span><i class="is-nonah"></i>H股 / 红筹 (${nonAhCount})</span>
   <span><i class="is-trend"></i>分档有效佣金率</span>`;
 } else if (hasInstFilter) {
  const litSole = litPts.filter(p => p.instRole === "sole").length;
  const litLead = litPts.filter(p => p.instRole === "joint_lead").length;
  const litCo = litPts.filter(p => p.instRole === "joint_co").length;
  legendHtml = `<span><i class="is-role-sole"></i>独家保荐 (${litSole})</span>
   <span><i class="is-role-lead"></i>牵头联席 (${litLead})</span>
   <span><i class="is-role-co"></i>非牵头联席 (${litCo})</span>
   <span><i class="is-dimmed-dot"></i>其他市场样本 (${dimPts.length})</span>
   <span><i class="is-trend is-dashed"></i>市场分档基准</span>`;
 } else {
  const litAh = litPts.filter(p => p.r.isAH).length;
  const litNonAh = litPts.length - litAh;
  legendHtml = `<span><i class="is-ah"></i>命中 A+H (${litAh})</span>
   <span><i class="is-nonah"></i>命中 H股/红筹 (${litNonAh})</span>
   <span><i class="is-dimmed-dot"></i>其他市场样本 (${dimPts.length})</span>
   <span><i class="is-trend is-dashed"></i>市场分档基准</span>`;
 }

 const renderBreakdownRow = (label, subset, opts = {}) => {
  const { roleKey = "", campKey = "", dotCls = "" } = opts;
  const st = p0EffectiveCommissionStats(subset, basis);
  const effFix = st.effectiveFixedBps;
  const barW = effFix != null ? Math.min(100, Math.max(8, effFix / 320 * 100)) : 0;
  const sponsorBenchmark = p0SponsorFeeBenchmark(subset, currency);
  const isRoleActive = Boolean(roleKey && state.feeSponsorRole === roleKey);
  const rowAttrs = [
   campKey ? `data-fee-camp="${escapeHtml(campKey)}"` : "",
   roleKey ? `data-fee-role="${escapeHtml(roleKey)}" tabindex="0" role="button" aria-pressed="${isRoleActive}"` : "",
   `class="fee-camp-row${roleKey ? " is-clickable" : ""}${isRoleActive ? " is-active" : ""}${roleKey && !subset.length ? " is-zero" : ""}"`
  ].filter(Boolean).join(" ");
  return `<tr ${rowAttrs}>
   <th scope="row"><div class="fee-camp-row-title">${dotCls ? `<i class="fee-camp-dot ${dotCls}"></i>` : ""}<strong>${escapeHtml(label)}</strong></div><small>${subset.length} 宗 · 总募资 ${st.grossN ? formatChineseUnitAmount(st.totalGross, "HKD") : "—"}</small></th>
   <td class="col-num"><div class="fee-camp-bar-cell"><strong>${effFix != null ? feePercent(effFix) : "—"}</strong>${st.fixedN ? `<small class="fee-camp-comm-sub">佣金 ${escapeHtml(formatChineseUnitAmount(st.fixedComm, "HKD"))}</small>` : ""}<span class="fee-camp-bar" aria-hidden="true"><i class="${dotCls}" style="width:${barW.toFixed(1)}%"></i></span></div></td>
   <td class="col-num"><span class="fee-camp-sp">${escapeHtml(sponsorBenchmark.compact)}</span><small class="fee-camp-sample">n=${sponsorBenchmark.count}</small></td>
  </tr>`;
 };

 let rightPanelTitle = "";
 let rightHeadCol = "";
 let campTbodyHtml = "";
 if (hasInstFilter) {
  const instBaseCriteria = { ...feeRosterCriteria(), sponsorRole: "all" };
  const instPool = filterFeeRoster(all, instBaseCriteria);
  const soleRows = instPool.filter(r => feeSponsorRoleForRow(r, state.feeInstitution) === "sole");
  const leadRows = instPool.filter(r => feeSponsorRoleForRow(r, state.feeInstitution) === "joint_lead");
  const coRows = instPool.filter(r => feeSponsorRoleForRow(r, state.feeInstitution) === "joint_co");
  rightPanelTitle = `${activeInstName || "已选机构"} · 保荐角色 · ${currency} 整单明确金额`;
  rightHeadCol = "机构角色 / 总募资";
  campTbodyHtml = [
   renderBreakdownRow("独家保荐", soleRows, { roleKey: "sole", dotCls: "is-role-sole" }),
   renderBreakdownRow("牵头联席（首位）", leadRows, { roleKey: "joint_lead", dotCls: "is-role-lead" }),
   renderBreakdownRow("非牵头联席", coRows, { roleKey: "joint_co", dotCls: "is-role-co" }),
   renderBreakdownRow("该机构合计", instPool, { roleKey: "all" })
  ].join("");
 } else {
  const camps = p0FeeSponsorCamps(listed);
  rightPanelTitle = `保荐阵营 · ${currency} 整单明确金额`;
  rightHeadCol = "保荐阵营 / 总募资";
  campTbodyHtml = feeSponsorFirms
   ? camps.map(c => renderBreakdownRow(c.label, c.rows, { campKey: c.key })).join("")
   : '<tr><td colspan="3">机构分类待载入</td></tr>';
 }

 const filterSummaryTags = [];
 if (activeInstName) filterSummaryTags.push(activeInstName);
 if (state.feeSponsorRole !== "all") filterSummaryTags.push(feeSponsorRoleLabel(state.feeSponsorRole));
 if (state.sizeBand !== "all") filterSummaryTags.push(({ under500: "<5亿", "600_900": "6–9亿", over2000: ">20亿" })[state.sizeBand] || state.sizeBand);
 if (state.feeType !== "all") filterSummaryTags.push(({ h_share: "H股", a_h: "A+H", red_chip: "红筹" })[state.feeType] || state.feeType);
 if (state.feeIndustry !== "all") filterSummaryTags.push(state.feeIndustry);
 if (String(state.feeQuery || "").trim()) filterSummaryTags.push(`“${String(state.feeQuery).trim()}”`);
 const unplottedMatched = Math.max(0, activeRows.length - litPts.length);
 const summaryMeta = hasActiveFilter
  ? `点亮 ${litPts.length} / ${pts.length} 宗散点${filterSummaryTags.length ? `（${escapeHtml(filterSummaryTags.join(" · "))}）` : ""}${unplottedMatched ? ` · 另 ${unplottedMatched} 宗待核/条件费率` : ""}`
  : `${pts.length} 宗定价样本 · 悬浮散点看项目详情 · 点击直达档案`;

 const isOpen = feeCurveExpanded ?? (hasActiveFilter || !window.matchMedia?.("(max-width: 767px)").matches);
 panel.hidden = false;
 panel.open = Boolean(isOpen);
 panel.classList.toggle("is-filtered", hasActiveFilter);
 panel.innerHTML = `<summary><span>${hasInstFilter ? `2026 新股规模—费率分布 · ${escapeHtml(activeInstName)} 高亮对照` : "2026 新股规模—费率实证分布与有效佣金率对照"}</span><small class="col-num">${summaryMeta}</small></summary>
  <div class="fee-curve-body">
   <div class="fee-curve-chart-wrap" id="feeCurveChartWrap">
    <div class="fee-curve-legend">${legendHtml}</div>
    <svg class="fee-curve-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="2026 港股新股发行规模与固定承销佣金率散点分布">${gridSvg}${trendSvg}${dotsSvg}</svg>
    <div class="fee-dot-popover" id="feeDotPopover" role="tooltip" hidden></div>
   </div>
   <div class="fee-camp-panel">
    <h4>${escapeHtml(rightPanelTitle)}</h4>
    <table class="fee-camp-table">
     <thead><tr><th scope="col">${escapeHtml(rightHeadCol)}</th><th scope="col" class="col-num">有效佣金率 (Σ佣/Σ募)</th><th scope="col" class="col-num">整单保荐费</th></tr></thead>
     <tbody>${campTbodyHtml}</tbody>
    </table>
   </div>
  </div>`;
}

function showFeeDotPopover(dotEl, pinned = false) {
 const pop = document.getElementById("feeDotPopover");
 const wrap = document.getElementById("feeCurveChartWrap");
 const svg = wrap?.querySelector?.(".fee-curve-svg");
 if (!pop || !wrap || !svg || !dotEl) return;
 const roundId = dotEl.dataset?.feeDotRound || dotEl.getAttribute?.("data-fee-dot-round");
 const pt = lastFeeCurvePts.find(p => p.r.id === roundId);
 if (!pt) return;
 const r = pt.r;
 const basis = state.shoeBasis || "offered";
 const dc = p0DealCommissionAmounts(r, basis);
 const sp = p0EffectiveSponsorFee(r);
 const typeLabel = r.isAH ? "A+H" : r.issuerType === "h_share" ? "H股" : "红筹/其他";
 const instHtml = (r.institutions || []).map((inst, idx) => {
  const roleTxt = r.institutions.length === 1 ? "独家" : idx === 0 ? "牵头" : "联席";
  const isAct = feeInstMatches(inst, state.feeInstitution);
  return `<span class="fdp-inst${isAct ? " is-active" : ""}">${escapeHtml(inst.displayName)}<em>${roleTxt}</em></span>`;
 }).join("");
 const coLocated = lastFeeCurvePts.filter(o => o.r.id !== r.id && Math.hypot(o.cx - pt.cx, o.cy - pt.cy) < 5.5);
 const overlapNote = coLocated.length
  ? `<div class="fdp-overlap">同坐标邻近：${coLocated.slice(0, 3).map(o => `${escapeHtml(o.r.name)} (${o.r.code})`).join(" · ")}${coLocated.length > 3 ? ` 等${coLocated.length}宗` : ""}</div>`
  : "";
 const spText = sp && sp.value != null ? formatChineseUnitAmount(sp.value, sp.currency, Boolean(sp.approximate)) : "未单列";
 const econTotalStr = dc.totalEconHkd !== null ? formatChineseUnitAmount(dc.totalEconHkd, "HKD") : "—";
 const econPerStr = dc.perSponsorEconHkd !== null && dc.sponsorCount > 1 ? ` · 平分 ${formatChineseUnitAmount(dc.perSponsorEconHkd, "HKD")}/家` : "";
 pop.classList.toggle("is-pinned", Boolean(pinned));
 pop.dataset.pinnedRound = pinned ? r.id : "";
 pop.innerHTML = `<div class="fdp-head"><div><strong>${escapeHtml(r.name)}</strong> <span class="mono-code">${r.code}.HK</span></div><span class="fdp-badge">${typeLabel} · ${r.listingDate || r.date}</span></div>
  <div class="fdp-sponsors">${instHtml}</div>
  <dl class="fdp-grid">
   <div><dt>发行规模</dt><dd class="col-num">${escapeHtml(formatChineseUnitAmount(pt.gross, "HKD"))}</dd></div>
   <div><dt>固定佣金</dt><dd class="col-num"><strong>${feePercent(r.fixedBps)}</strong>${dc.fixedComm !== null ? ` <em>(${escapeHtml(formatChineseUnitAmount(dc.fixedComm, "HKD"))})</em>` : ""}</dd></div>
   <div><dt>项目总经济</dt><dd class="col-num">${escapeHtml(econTotalStr)}${escapeHtml(econPerStr)}</dd></div>
   <div><dt>上限 / 保荐费</dt><dd class="col-num">${r.upperBps != null ? feePercent(r.upperBps) : "—"} · ${escapeHtml(spText)}</dd></div>
  </dl>
  ${overlapNote}
  ${pinned ? `<button type="button" class="fdp-open-btn" data-round-id="${escapeHtml(r.id)}">查看新股完整档案 →</button>` : `<div class="fdp-foot">点击圆点直达新股档案 →</div>`}`;
 pop.hidden = false;

 const wrapRect = wrap.getBoundingClientRect?.();
 const svgRect = svg.getBoundingClientRect?.();
 if (wrapRect && svgRect && svgRect.width > 0 && svgRect.height > 0) {
  const pxX = (svgRect.left - wrapRect.left) + (pt.cx / FEE_CURVE_STAGE.W) * svgRect.width;
  const pxY = (svgRect.top - wrapRect.top) + (pt.cy / FEE_CURVE_STAGE.H) * svgRect.height;
  const popW = Math.min(296, Math.max(224, wrapRect.width - 16));
  pop.style.width = `${popW}px`;
  const popH = pop.offsetHeight || 176;
  const placeLeft = pt.cx > FEE_CURVE_STAGE.W * 0.54;
  let left = placeLeft ? pxX - popW - 12 : pxX + 12;
  left = Math.max(6, Math.min(wrapRect.width - popW - 6, left));
  let top = pxY > wrapRect.height * 0.58 ? pxY - popH - 8 : pxY - 36;
  top = Math.max(6, Math.min(Math.max(6, wrapRect.height - popH - 6), top));
  pop.style.left = `${left.toFixed(0)}px`;
  pop.style.top = `${top.toFixed(0)}px`;
 }
}

function hideFeeDotPopover(force = false) {
 const pop = document.getElementById("feeDotPopover");
 if (!pop) return;
 if (!force && pop.classList.contains("is-pinned")) return;
 pop.hidden = true;
 pop.classList.remove("is-pinned");
}

function renderFeeDealRankLane(all, rows) {
 const lane = document.getElementById("feeDealRankLane");
 if (!lane) return;
 if (state.feePhase !== "listed" || !rows.length) {
  lane.hidden = true;
  lane.innerHTML = "";
  return;
 }
 const basis = state.shoeBasis || "offered";
 const metric = state.feeEconMetric === "estComm" ? "estComm" : "totalEcon";
 const split = state.feeEconSplit === "per_sponsor" ? "per_sponsor" : "total";
 const scored = rows.map(r => {
  const dc = p0DealCommissionAmounts(r, basis);
  const val = metric === "estComm"
   ? (split === "per_sponsor" ? dc.perSponsorCommHkd : dc.fixedComm)
   : (split === "per_sponsor" ? dc.perSponsorEconHkd : dc.totalEconHkd);
  return val !== null && Number.isFinite(val) && val > 0 ? { r, dc, val } : null;
 }).filter(Boolean).sort((a, b) => b.val - a.val || a.r.code.localeCompare(b.r.code));

 if (!scored.length) {
  lane.hidden = true;
  lane.innerHTML = "";
  return;
 }
 const top5 = scored.slice(0, 5);
 const maxVal = top5[0].val || 1;
 const activeInstName = state.feeInstitution !== "all" ? feeInstitutionLabel(state.feeInstitution, all) : "";
 const laneTitle = activeInstName
  ? `${activeInstName}${state.feeSponsorRole !== "all" ? ` · ${feeSponsorRoleLabel(state.feeSponsorRole)}` : ""} · 最赚钱项目 Top ${top5.length}`
  : `项目创收榜 · 最赚钱 IPO Top ${top5.length}`;
 const tableSynced = state.feeSort === metric;

 const cardsHtml = top5.map((item, idx) => {
  const { r, dc, val } = item;
  const pct = Math.max(10, Math.min(100, (val / maxVal) * 100));
  const valStr = `${formatChineseUnitAmount(val, "HKD")}${split === "per_sponsor" ? "/家" : ""}`;
  const spSub = dc.spHkd ? `保荐费 ${formatChineseUnitAmount(dc.spHkd, "HKD")}` : "未单列保荐费";
  const subStr = split === "per_sponsor"
   ? (dc.sponsorCount === 1 ? `独家独享 · 估佣 ${formatChineseUnitAmount(dc.fixedComm, "HKD")}` : `整单 ${formatChineseUnitAmount(metric === "estComm" ? dc.fixedComm : dc.totalEconHkd, "HKD")} ÷ ${dc.sponsorCount}家`)
   : (metric === "totalEcon" ? `估佣 ${formatChineseUnitAmount(dc.fixedComm, "HKD")} · ${spSub}` : `募资 ${formatChineseUnitAmount(dc.gross, "HKD")} × ${feePercent(r.fixedBps)}`);
  const roleBadge = dc.sponsorCount === 1
   ? `<span class="fel-split-tag is-sole">独家</span>`
   : `<span class="fel-split-tag">${dc.sponsorCount}家联席</span>`;
  return `<button type="button" class="fel-card" data-round-id="${escapeHtml(r.id)}" title="点击查看 ${escapeHtml(r.name)} (${r.code}.HK) 发行档案">
   <div class="fel-card-top"><span class="fel-rank">#${idx + 1}</span><span class="fel-name">${escapeHtml(r.name)}</span><span class="mono-code">${r.code}</span>${roleBadge}</div>
   <div class="fel-card-val col-num"><strong>${escapeHtml(valStr)}</strong></div>
   <span class="fel-bar" aria-hidden="true"><i style="width:${pct.toFixed(1)}%"></i></span>
   <small class="fel-sub col-num">${escapeHtml(subStr)}</small>
  </button>`;
 }).join("");

 lane.hidden = false;
 lane.innerHTML = `<div class="fel-head">
   <div class="fel-title-group">
    <h4>${escapeHtml(laneTitle)}</h4>
    <span>总经济 = 固定估佣 + 已核实整单保荐费（USD 按 7.80 折算）</span>
   </div>
   <div class="fel-controls">
    <div class="segmented-inline" role="group" aria-label="创收口径">
     <button type="button" data-fee-econ-metric="totalEcon" aria-pressed="${metric === "totalEcon"}">总经济</button>
     <button type="button" data-fee-econ-metric="estComm" aria-pressed="${metric === "estComm"}">固定估佣</button>
    </div>
    <div class="segmented-inline" role="group" aria-label="分配口径">
     <button type="button" data-fee-econ-split="total" aria-pressed="${split === "total"}">整单总计</button>
     <button type="button" data-fee-econ-split="per_sponsor" aria-pressed="${split === "per_sponsor"}">保荐人平分</button>
    </div>
    <button type="button" class="fel-sort-sync${tableSynced ? " is-active" : ""}" data-fee-apply-econ-sort aria-pressed="${tableSynced}">${tableSynced ? "列表已按此排序 ↓" : "列表按此排序 ↓"}</button>
   </div>
  </div>
  <div class="fel-grid">${cardsHtml}</div>`;
}

function listingDebutClose(record, round) {
 const date=round?.listingDate, code=round?.code;
 if(!record || round?.route!=="listed_offering" || record.id!==round.issuerId ||
    !/^\d{5}$/.test(code||"") || record.hkexListingStockCode!==code ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date||"") || record.hkexListingDate!==date ||
    (round.prospectusDate && record.hkexProspectusDate!==round.prospectusDate) ||
    round.offered?.currency!=="HKD")return null;
 const validPrice=v=>/^(?:\d+)(?:\.\d+)?$/.test(String(v??"")) && Number.isFinite(Number(v)) && Number(v)>0;
 const priced=q=>q?.priceDate===date && q?.priceCurrency==="HKD" && validPrice(q.price);
 const kinds=new Set(["official_close","unadjusted_vendor_close"]);
 const https=url=>typeof url==="string" && /^https:\/\//i.test(url);
 const direct=record.hkListingSessionClose;
 if(priced(direct)&&kinds.has(direct.priceKind)&&https(direct.sourceUrl))return direct;
 const provenance=record.listingMarketCapProvenance;
 if(provenance?.status!=="verified" || provenance?.policy!=="ah_components_ex_treasury" || provenance?.anchorDate!==date)return null;
 const legs=Array.isArray(provenance.components)?provenance.components.filter(c=>c?.class==="H"&&c.securityCode===code):[];
 if(legs.length!==1)return null;
 const leg=legs[0], evidence=leg.priceEvidence, facts=evidence?.facts;
 if(leg.priceStatus!=="verified" || !priced(leg) || !kinds.has(leg.priceKind) || !https(evidence?.sourceUrl) ||
    facts?.class!=="H" || facts.securityCode!==code || facts.priceDate!==date || facts.priceCurrency!=="HKD" ||
    facts.priceKind!==leg.priceKind || !validPrice(facts.price) || Number(facts.price)!==Number(leg.price))return null;
 return {price:leg.price,priceDate:leg.priceDate,priceCurrency:leg.priceCurrency,priceKind:leg.priceKind,sourceUrl:evidence.sourceUrl};
}

function renderFeeRosterRow(r) {
 const n=p0FeeAmount(r,state.shoeBasis),sponsor=p0SponsorFeeHtml(r,false);
 const isPaused=state.feePhase==='paused',isBook=state.feePhase==='bookbuilding'||r.route==='bookbuilding',isNonOffer=r.route==='transfer'||r.route==='introduction';
 const rec=state.data?.records?.find(x=>x.id===r.issuerId);
 const instCount=(r.institutions||[]).length;
 const names=(r.institutions||[]).map((i,idx)=>{
  const matched=feeInstMatches(i,state.feeInstitution);
  const chip=renderSponsorJumpChip(i.displayName,i.sponsorId,i.legalName);
  const roleTag=instCount===1
   ? `<span class="fee-role-tag is-sole${matched?' is-active':''}">独家</span>`
   : idx===0
    ? `<span class="fee-role-tag is-lead${matched?' is-active':''}">牵头</span>`
    : matched
     ? `<span class="fee-role-tag is-co is-active">非牵头</span>`
     : '';
  return matched?`<span class="fee-inst-match">${chip}${roleTag}</span>`:`${chip}${roleTag}`;
 }).join(' · ');
 const url=p0DossierUrl(r.id);
 const typeLabel=r.isAH?`A+H${rec?.aShareCode?` (${rec.aShareCode})`:''}`:r.issuerType==='h_share'?'H股':r.route==='transfer'?'GEM转主板':r.route==='introduction'?'介绍上市':'红筹/其他';
 const rateCell=k=>isNonOffer?'<span class="data-missing">不适用</span>':p0FeeRate(r,k);
 const spCell=isNonOffer?'<span class="data-missing">不适用</span>':sponsor;
 const mcapBn=Number.isFinite(Number(r.marketCapHkdBn))?Number(r.marketCapHkdBn):(rec?.listingMarketCapSampleEligible&&Number.isFinite(Number(rec.listingMarketCapHkdBn))?Number(rec.listingMarketCapHkdBn):null);
 const closeQ=listingDebutClose(rec,r),offerPrice=Number(r.offered?.price?.value);
 let closeHint='';
 if(closeQ&&Number.isFinite(Number(closeQ.price))&&Number.isFinite(offerPrice)&&offerPrice>0){
  const rawChg=(Number(closeQ.price)/offerPrice-1)*100,chg=Math.abs(rawChg)<0.05?0:rawChg;
  closeHint=`<small class="debut-chg ${chg>0?'is-up':chg<0?'is-down':''}" title="首日收盘 HK$${escapeHtml(closeQ.price)} (${escapeHtml(closeQ.priceDate||'')})">首日 ${chg>0?'+':''}${offeringNumber(chg,1)}%</small>`;
 }
 const mcapTd=isPaused
  ? ''
  : isBook
   ? `<td class="col-num fee-mcap" data-label="拟上市总市值">${Number.isFinite(r.plannedMcapLowBn)&&Number.isFinite(r.plannedMcapHighBn)?`<span>HKD ${(r.plannedMcapLowBn*10).toFixed(1)}–${(r.plannedMcapHighBn*10).toFixed(1)}亿</span>${r.plannedMcapFloorBn?`<small class="relaunch-floor-note">下调底价 ${(r.plannedMcapFloorBn*10).toFixed(1)}亿</small>`:''}`:'<span class="data-missing">—</span>'}</td>`
   : `<td class="col-num fee-mcap" data-label="上市总市值">${mcapBn!==null?`<span title="HKD ${offeringNumber(mcapBn*1e9,0)}">HKD ${rmbYiFormatter.format(mcapBn*10)}亿</span>${closeHint}`:'<span class="data-missing">—</span>'}</td>`;
 let econTd='';
 if(isBook){
  econTd=`<td class="col-num fee-econ-col" data-label="招股价区间"><strong>HK$${escapeHtml(r.priceRangeText||'—')}</strong><small>${r.downwardFloorPrice?`含-10%下调权至 HK$${r.downwardFloorPrice}`:`每手${r.lotShares||100}股 · HK$${offeringNumber(r.entryFeeHkd||0,0)}`}</small></td>`;
 }else if(!isPaused){
  if(isNonOffer){
   econTd='<td class="col-num fee-econ-col" data-label="总经济 / 估佣"><span class="data-missing">不适用</span></td>';
  }else{
   const dc=p0DealCommissionAmounts(r,state.shoeBasis);
   const showEstOnly=state.feeSort==='estComm'||state.feeEconMetric==='estComm';
   const perMode=state.feeEconSplit==='per_sponsor';
   const mainVal=showEstOnly?(perMode?dc.perSponsorCommHkd:dc.fixedComm):(perMode?dc.perSponsorEconHkd:dc.totalEconHkd);
   if(mainVal===null){
    econTd=`<td class="col-num fee-econ-col" data-label="总经济 / 估佣">${p0Missing(r.feeStates?.fixed)}</td>`;
   }else{
    const mainTxt=`${formatChineseUnitAmount(mainVal,'HKD')}${perMode?'/家':''}`;
    const subTxt=perMode
     ?(dc.sponsorCount===1?'独家独享':`整单 ${formatChineseUnitAmount(showEstOnly?dc.fixedComm:dc.totalEconHkd,'HKD')} ÷ ${dc.sponsorCount}`)
     :(showEstOnly?(dc.sponsorCount>1?`平分 ${formatChineseUnitAmount(dc.perSponsorCommHkd,'HKD')}/家`:'独家保荐'):`估佣 ${formatChineseUnitAmount(dc.fixedComm,'HKD')}${dc.sponsorCount>1?` · 平分 ${formatChineseUnitAmount(dc.perSponsorEconHkd,'HKD')}`:''}`);
    econTd=`<td class="col-num fee-econ-col" data-label="总经济 / 估佣"><strong>${escapeHtml(mainTxt)}</strong><small>${escapeHtml(subTxt)}</small></td>`;
   }
  }
 }
 const relaunchInfo=RELAUNCH_COMPARISONS[r.code];
 const pausedRelaunchBadge=r.route==='paused_offer'&&relaunchInfo
  ? `<button type="button" class="relaunch-jump-pill" data-jump-relaunch="${escapeHtml(relaunchInfo.liveRoundId)}">已于 11-23 调价重启招股 ↗</button>`
  : '';
 const subDate=isBook
  ? `<span class="bookbuilding-state-tag${r.isRelaunch?' is-relaunch':''}">${escapeHtml(r.statusLabel)}</span><small>${escapeHtml(r.subStatusLabel||'')}</small>`
  : r.route==='paused_offer'
   ? `<span class="paused-state-tag">${escapeHtml(r.statusLabel)}</span>${pausedRelaunchBadge}`
   : `<small>${p0ShoeLabel(r)}</small>`;
 return `<tr data-fee-round="${escapeHtml(r.id)}" tabindex="0" class="fee-clickable-row${state.feeRoundId===r.id?' is-selected':''}"><th scope="row"><div class="fee-company-choice"><a class="fee-company" href="${escapeHtml(url)}" data-round-id="${escapeHtml(r.id)}">${escapeHtml(r.name)}</a>${p0FeeCompareButton(r)}</div><small class="fee-roster-meta"><span class="mono-code">${r.code}</span> · ${typeLabel}${names?' · ':''}<span class="institution-label">${names}</span></small></th><td class="fee-date" data-label="${isBook?'招股日 / 进度':r.route==='paused_offer'?'公告日':'挂牌日'}"><span class="date-val">${r.noticeDate||r.date}</span>${subDate}</td><td class="col-num fee-gross" data-label="${isBook||r.route==='paused_offer'?'计划发售 (HKD百万)':'规模 (HKD百万)'}" title="${n===null?'':`HKD ${offeringNumber(n,2)}`}">${isNonOffer?'<span class="data-missing">无公开发售</span>':`<span>${feeRosterGross(r)}</span>`}</td>${econTd}<td class="col-num" data-label="固定佣金">${rateCell('fixed')}</td><td class="col-num" data-label="酌情上限">${rateCell('extra')}</td><td class="col-num fee-upper" data-label="合计上限">${rateCell('upper')}</td><td class="col-num fee-sponsor-amount" data-label="保荐费">${spCell}</td>${mcapTd}</tr>`;
}

function renderFeeRosterSelection(row) {
  const root=document.getElementById("feeSelection");
  if (!row) {root.innerHTML="";return;}
  const exact=eligibleOfferingFees().find(f=>f.roundId===row.id);
  const d=eligibleOfferingDossiers().find(d=>d.roundId===row.id);
  const sp=p0EffectiveSponsorFee(row);
  const links=new Map();
  for (const [url,label] of [[row.gross?.source,"规模"],[row.commissionSource,"佣金"],[row.discretionarySource,"酌情费"],[sp?.source,"保荐费"]]) {
    if (url) links.set(url,links.has(url)?links.get(url)+" / "+label:label);
  }
  const sources=[...links].map(([url,label])=>feeRosterSource(url,feeRosterSourceLabel(url,label))).join(" · ") || row.sources.map((url,i)=>feeRosterSource(url,`原件 ${i+1}`)).join(" · ");
  const facts=`<dl class="fee-selection-facts"><div><dt>${row.route === "paused_offer" ? "计划发售总额" : row.gross?.basis === "offered" ? "基础发售总额" : "最终发售总额"} · 百万港元</dt><dd>${feeRosterGross(row)}</dd></div><div><dt>保荐机构</dt><dd>${row.institutions.map(i=>escapeHtml(i.legalName)).join("<br>") || "—"}</dd></div></dl>`;
  const rates=`<dl class="fee-detail-grid"><div><dt>固定承销佣金</dt><dd>${feeRosterRate(row.fixedBps)}</dd></div><div><dt>额外酌情上限</dt><dd>${feeRosterRate(row.maximumExtraBps)}</dd></div><div><dt>合计上限</dt><dd>${feeRosterRate(row.upperBps)}</dd></div>${sp?`<div><dt>${sp.scope === "joint_aggregate" ? "联席保荐费 · 合计" : "约定保荐费"}</dt><dd>${escapeHtml(sp.currency)} ${offeringNumber(Number(sp.value))}</dd></div>`:""}</dl>`;
  let body=exact ? renderOfferingFee(exact).replace('<details class=', '<details open class=') : rates;
  if (row.route !== "listed_offering" && row.route !== "paused_offer") body="";
  root.innerHTML=`<article class="fee-selection" tabindex="-1"><header><div><p>${row.code} · ${row.date}</p><h2>${escapeHtml(row.name)}</h2></div><button type="button" class="text-button" data-fee-close aria-label="关闭发行费用详情">收起</button></header>${facts}${body}<div class="fee-selection-sources">${sources}</div><footer>${d?`<a href="${escapeHtml(feeRosterUrl(row))}" data-fee-dossier="${escapeHtml(row.id)}">发行人档案 ↗</a>`:`<button type="button" class="text-button" data-fee-issuer="${escapeHtml(row.issuerId)}">发行人详情 ↗</button>`}</footer></article>`;
}
function renderFeeComparison() {
 const root=document.getElementById('feeComparison');if(!root)return;
 const all=eligibleFeeRoster(),rows=filterFeeRoster(all,feeRosterCriteria());const pages=Math.max(1,Math.ceil(rows.length/FEE_ROSTER_PAGE_SIZE));state.feePage=Math.max(1,Math.min(pages,Number(state.feePage)||1));
 document.getElementById('feeSearch').value=state.feeQuery;renderFeeRosterControls(all);
 renderFeeInsightStrip(all,rows);
 renderFeeBenchmarkStrip(all);
 renderFeeScaleCurvePanel(all,rows);
 renderFeeDealRankLane(all,rows);
 const isBook=state.feePhase==='bookbuilding',isPaused=state.feePhase==='paused';
 document.getElementById('feeCount').textContent=isBook?`${rows.length} 宗招股 / 待挂牌`:`${rows.length} 宗 · 上市记录至 ${state.feeRosterData?.listingCutoff||'—'}`;
 document.getElementById('feeSummary').innerHTML=state.feePhase==='other'?'':p0FeeSummary(rows);
 p0RenderFeeCompareSelection(all);
 const sortArrow=k=>state.feeSort===k?(state.feeSortDir==='desc'?' ↓':' ↑'):'';
 const econHeadHtml=`<div class="th-econ-dual"><button type="button" data-fee-sort="totalEcon" class="${state.feeSort==='totalEcon'?'is-active':''}">总经济${sortArrow('totalEcon')}</button><span class="th-sep">/</span><button type="button" data-fee-sort="estComm" class="${state.feeSort==='estComm'?'is-active':''}">估佣${sortArrow('estComm')}</button><button type="button" class="th-split-chip" data-fee-split-toggle title="切换整单总计 / 保荐人平分">${state.feeEconSplit==='per_sponsor'?'平分':'总计'}</button></div>`;
 const headers=[
  ['发行人 / 保荐机构','','',false],
  [isBook?'招股日 / 进度':isPaused?'公告日':'挂牌日','date','',false],
  [isBook||isPaused?'计划发售 (HKD 百万)':state.shoeBasis==='actual'?'实际额 (HKD 百万)':'发行规模 (HKD 百万)','gross',isBook||isPaused?'计划发售 (HKDm)':'',false],
  ...(isPaused?[]:isBook?[['招股价 / 机制','','',false]]:[[econHeadHtml,'','',true]]),
  ['固定佣金','fixed','',false],
  ['酌情上限','extra','',false],
  ['合计上限','upper','',false],
  ['保荐费 (原币)','sponsorFee','',false],
  ...(isPaused?[]:[[isBook?'拟上市市值 (HKD 亿)':'上市总市值 (HKD 亿)','mcap','',false]])
 ];
 const relaunchVizHtml=isBook?rows.filter(r=>RELAUNCH_COMPARISONS[r.code]).map(r=>renderRelaunchComparisonPanel(r.code,{context:'fees'})).join(''):'';
 const emptyTotal=isBook?liveBookbuildingOffers().length:all.filter(r=>isPaused?r.route==='paused_offer':state.feePhase==='other'?r.route!=='listed_offering'&&r.route!=='paused_offer':r.route==='listed_offering').length;
 root.innerHTML=rows.length?`<div class="fee-table-wrap"><table class="fee-roster-table"><thead><tr>${headers.map(([label,key,spec,rawHtml],i)=>`<th scope="col" class="${i>1?'col-num':''}${key==='mcap'?' col-mcap-head':''}"${spec?` data-col-spec="${spec}"`:''}>${rawHtml?label:key?`<button type="button" data-fee-sort="${key}" class="${state.feeSort===key?'is-active':''}"${(isPaused||isBook)&&key==='gross'?' aria-label="按计划发售上限排序"':''}>${label}${sortArrow(key)}</button>`:label}</th>`).join('')}</tr></thead><tbody>${rows.slice((state.feePage-1)*FEE_ROSTER_PAGE_SIZE,state.feePage*FEE_ROSTER_PAGE_SIZE).map(renderFeeRosterRow).join('')}</tbody></table></div>${relaunchVizHtml}`:p0EmptyState('fees',emptyTotal);
 document.getElementById('feePagination').innerHTML=pages>1?`<button type="button" data-fee-page="${state.feePage-1}"${state.feePage===1?' disabled':''}>上一页</button><span>${state.feePage} / ${pages}</span><button type="button" data-fee-page="${state.feePage+1}"${state.feePage===pages?' disabled':''}>下一页</button>`:'';
}

function handleFeeRosterChange(event) {
 const key=event.target.dataset.feeState;if(!['feeType','feeMin','feeMax','feeIndustry','feeInstitution','feeSponsorRole','feeCurrency','feeDateFrom','feeDateTo'].includes(key))return;
 state[key]=event.target.value;
 if(key==='feeInstitution'&&state.feeInstitution==='all'&&['joint_lead','joint_co'].includes(state.feeSponsorRole))state.feeSponsorRole='all';
 if(['feeMin','feeMax'].includes(key))state.sizeBand='all';
 state.feePage=1;renderFeeComparison();syncUrl();document.querySelector(`[data-fee-state="${key}"]`)?.focus();
}

function handleFeeRosterClick(event) {
 const dot=event.target.closest?.('[data-fee-dot-round]');
 if(dot?.dataset?.feeDotRound){
  const pop=document.getElementById('feeDotPopover');
  const isTouchUi=event.pointerType==='touch'||Boolean(window.matchMedia?.('(hover: none), (max-width: 767px)')?.matches);
  if(isTouchUi&&!(pop&&!pop.hidden&&pop.classList.contains('is-pinned')&&pop.dataset.pinnedRound===dot.dataset.feeDotRound)){
   event.preventDefault?.();
   showFeeDotPopover(dot,true);
   return;
  }
  openOfferingDossier(dot.dataset.feeDotRound);
  return;
 }
 if(!event.target.closest?.('#feeDotPopover'))hideFeeDotPopover(true);
 const roleEl=event.target.closest?.('[data-fee-role]');
 if(roleEl?.dataset?.feeRole){
  const r=roleEl.dataset.feeRole;
  state.feeSponsorRole=r==='all'?'all':(state.feeSponsorRole===r?'all':r);
  state.feePage=1;renderFeeComparison();syncUrl();
  document.querySelector(`.fee-role-tabs [data-fee-role="${state.feeSponsorRole}"]`)?.focus({preventScroll:true});
  return;
 }
 const el=event.target.closest?.('button,a,summary,select,input,label');
 if(!el){
  const card=event.target.closest?.('tr[data-fee-round],article[data-fee-compare-round]');
  const roundId=card?.dataset?.feeRound||card?.dataset?.feeCompareRound;
  if(roundId){const link=card.querySelector?.('[data-round-id]');link?.focus?.({preventScroll:true});openOfferingDossier(roundId);}
  return;
 }
 if(el.tagName==='SUMMARY'||el.tagName==='SELECT'||el.tagName==='INPUT'||el.tagName==='LABEL')return;
 if(el.dataset.globalFirm||el.dataset.jumpView||el.dataset.clearFilter)return;
 if(el.dataset.roundId){if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();openOfferingDossier(el.dataset.roundId);return;}
 if(p0HandleFeeCompareClick(el))return;
 if(el.dataset.feeEconMetric){
  state.feeEconMetric=el.dataset.feeEconMetric;
  if(state.feeSort==='totalEcon'||state.feeSort==='estComm'){state.feeSort=state.feeEconMetric;state.feeSortDir='desc';state.feePage=1;}
 }
 else if(el.dataset.feeEconSplit){
  state.feeEconSplit=el.dataset.feeEconSplit;
  if(state.feeSort==='totalEcon'||state.feeSort==='estComm')state.feePage=1;
 }
 else if(el.hasAttribute('data-fee-split-toggle')){
  state.feeEconSplit=state.feeEconSplit==='per_sponsor'?'total':'per_sponsor';
  if(state.feeSort!=='totalEcon'&&state.feeSort!=='estComm'){state.feeSort=state.feeEconMetric||'totalEcon';state.feeSortDir='desc';}
  state.feePage=1;
 }
 else if(el.hasAttribute('data-fee-apply-econ-sort')){
  state.feeSort=state.feeEconMetric||'totalEcon';
  state.feeSortDir='desc';
  state.feePage=1;
 }
 else if(el.dataset.feeInstQuick){state.feeInstitution=state.feeInstitution===el.dataset.feeInstQuick?'all':el.dataset.feeInstQuick;state.feePage=1;}
 else if(el.dataset.feePhase){state.feePhase=el.dataset.feePhase;state.feePage=1;}
 else if(el.dataset.feeTier){state.sizeBand=el.dataset.feeTier==='all'?'all':(state.sizeBand===el.dataset.feeTier?'all':el.dataset.feeTier);state.feeMin='';state.feeMax='';state.feePage=1;}
 else if(el.dataset.feeSort){
  state.feeSortDir=state.feeSort===el.dataset.feeSort&&state.feeSortDir==='desc'?'asc':'desc';
  state.feeSort=el.dataset.feeSort;
  if(el.dataset.feeSort==='totalEcon'||el.dataset.feeSort==='estComm')state.feeEconMetric=el.dataset.feeSort;
  state.feePage=1;
 }
 else if(el.dataset.shoeBasis){state.shoeBasis=el.dataset.shoeBasis;state.feePage=1;}
 else if(el.dataset.sizeBand){state.sizeBand=state.sizeBand===el.dataset.sizeBand?'all':el.dataset.sizeBand;state.feeMin='';state.feeMax='';state.feePage=1;}
 else if(el.hasAttribute('data-fee-reset')){p0Reset('fees');return;}
 else if(el.dataset.feePage){state.feePage=Number(el.dataset.feePage);}
 else return;
 const focus=el.dataset.feeInstQuick?'[data-fee-state="feeInstitution"]':el.dataset.feeSort?`[data-fee-sort="${el.dataset.feeSort}"]`:el.dataset.shoeBasis?`[data-shoe-basis="${el.dataset.shoeBasis}"]`:el.dataset.feePhase?`[data-fee-phase="${el.dataset.feePhase}"]`:el.dataset.feeTier?`[data-fee-tier="${el.dataset.feeTier}"]`:null;
 renderFeeComparison();syncUrl();if(focus)document.querySelector(focus)?.focus({preventScroll:true});
}

if (typeof window !== "undefined") {
  window.YingSightOfferingFees=Object.freeze({schemaVersion:3,
    getRows:()=>structuredClone(eligibleFeeRoster()),
    select:criteria=>structuredClone(filterFeeRoster(eligibleFeeRoster(),criteria)),
    getDisclosure:roundId=>structuredClone(eligibleOfferingFees().find(f=>f.roundId===roundId)||null),
    getRound:roundId=>structuredClone(eligibleFeeRoster().find(r=>r.id===roundId)||null),
    getComparableSponsorFee:(roundId,currency='HKD')=>structuredClone(p0ComparableSponsorFee(eligibleFeeRoster().find(r=>r.id===roundId),currency)),
    summarizeSponsorFees:(roundIds,currency='HKD')=>structuredClone(p0SponsorFeeBenchmark(eligibleFeeRoster().filter(r=>roundIds.includes(r.id)),currency))});
}

function eligibleOfferingDossiers() {
  if (state.dossierData?.schemaVersion !== 1) return [];
  const fees = eligibleOfferingFees(), roster = eligibleFeeRoster();
  return (state.dossierData.offers || []).filter(d => {
    const record = (state.data?.records || []).find(r => r.id === d.issuerId);
    return d.roundId === `offering:${d.code}:${d.prospectusDate}` && record?.hkexListingStockCode === d.code &&
      record.hkexListingDate === d.listingDate && record.hkexProspectusDate === d.prospectusDate &&
      (d.disclosureStates ? roster.some(r => r.id === d.roundId && r.issuerId === d.issuerId && r.route === "listed_offering" && r.listingDate === d.listingDate && r.prospectusDate === d.prospectusDate) : fees.some(f => f.roundId === d.roundId && f.issuerId === d.issuerId));
  });
}
function renderDossier(d) {
 const row=eligibleFeeRoster().find(r=>r.id===d.roundId),f=eligibleOfferingFees().find(f=>f.roundId===d.roundId),o=d.offer,fl=d.float;
 const money=n=>`<span title="HKD ${offeringNumber(Number(n),2)}">${feeRosterMillion(n)}</span>`;
 const src=(url,p,label='p.')=>feeRosterSource(`${url}#page=${p}`,`${label}${p}`);
 const stat=(name,value)=>`<div><dt>${name}</dt><dd>${value}</dd></div>`;
 const exactRow=(label,shares,hkd)=>`<tr><th scope="row">${label}</th><td class="col-num" title="${offeringNumber(shares)} 股">${offeringNumber(shares/1e6,1)}</td><td class="col-num">${money(hkd)}</td></tr>`;
 const spCur=f.contractTerms.sponsorFee?.currency||'HKD',spVal=Number(f.contractTerms.sponsorFee?.value);
 const spDisplay=`<span title="${escapeHtml(spCur)} ${offeringNumber(spVal)}">${escapeHtml(formatChineseUnitAmount(spVal,spCur))}</span>`;
 const execPages=[...new Set(d.execution.flatMap(x=>x.pages||[]))];
 const rosterSponsorId=row?.institutions?.[0]?.sponsorId||'';
 const sponsorLineHtml=d.sponsors.map((s,idx)=>{
  const spId=(row?.institutions?.[idx]?.sponsorId)||sponsorIdForName(s.name)||rosterSponsorId;
  return spId
   ? `<button type="button" class="sponsor-jump-link" data-global-firm="${escapeHtml(spId)}" title="${escapeHtml(s.name)} · 查看保荐人龙虎榜">${escapeHtml(s.role)}：${escapeHtml(s.name)} ↗</button>`
   : `<span title="${escapeHtml(s.name)}">${escapeHtml(s.role)}：${escapeHtml(s.name)}</span>`;
 }).join(' · ');
 const unlockedOfPub = fl.officialPublicShares ? fl.unlockedShares / fl.officialPublicShares * 100 : 0;
 const adjustedOfPub = fl.officialPublicShares ? fl.adjustedShares / fl.officialPublicShares * 100 : 0;
 const floatWaterfallHtml = `<div class="float-waterfall" role="img" aria-label="港交所公众持股至上市无禁售公众股，再扣现有股东及关联承配后余量三阶瀑布">
  <div class="float-wf-row is-official">
   <div class="float-wf-meta"><strong>① 港交所公众持股</strong><span class="col-num">${offeringNumber(fl.officialPublicShares / 1e8, 2)}亿股 · 占总股本 ${offeringNumber(fl.officialPublicRatio, 2)}%</span></div>
   <div class="float-wf-track"><i style="width:100%"></i></div>
  </div>
  <div class="float-wf-row is-unlocked">
   <div class="float-wf-meta"><strong>② 上市无禁售公众股</strong><span class="col-num">${offeringNumber(fl.unlockedShares / 1e4, 0)}万股 · HKD ${offeringNumber(fl.unlockedHkd / 1e8, 2)}亿（占公众股 ${offeringNumber(unlockedOfPub, 1)}%）</span></div>
   <div class="float-wf-track"><i style="width:${Math.max(7, unlockedOfPub).toFixed(1)}%"></i></div>
  </div>
  <div class="float-wf-row is-adjusted">
   <div class="float-wf-meta"><strong>③ 扣现有股东及关联承配余量</strong><span class="col-num">${offeringNumber(fl.adjustedShares / 1e4, 0)}万股 · HKD ${offeringNumber(fl.adjustedHkd / 1e8, 2)}亿（占公众股 ${offeringNumber(adjustedOfPub, 1)}%）</span></div>
   <div class="float-wf-track"><i style="width:${Math.max(5, adjustedOfPub).toFixed(1)}%"></i></div>
  </div>
 </div>`;
 return `<article class="deal-sheet" data-dossier-round="${escapeHtml(d.roundId)}"><header class="deal-header"><div><p><span class="deal-status-pill is-listed">已上市 ${d.listingDate}</span> · ${d.code}.HK · ${escapeHtml(d.issuerType)}${p0ShoeLabel(row)?' · '+p0ShoeLabel(row):''}</p><h2>${escapeHtml(d.issuer)}</h2></div><div class="deal-header-meta"><div class="deal-sponsors-line">${sponsorLineHtml}</div></div></header>
 <dl class="deal-kpis">${stat('发行规模（绿鞋前 · HKD 百万）',money(o.gross))}${stat('最终发售价（HKD／股）',`${offeringNumber(o.final,2)}<small>${offeringNumber(o.low,2)}–${offeringNumber(o.high,2)} · ${o.final===o.low?'下限定价':o.final===o.high?'上限定价':'区间内定价'}</small>`)}${stat('估计所得净额（HKD 百万）',money(f.netHkd))}${stat('发行价总市值（HKD 百万）',`${money(o.postShares*o.final)}<small>发售比例 ${offeringNumber(o.shares/o.postShares*100,2)}%</small>`)}</dl>
 <nav class="deal-anchors"><a href="#allocation">配售与流通</a><a href="#fees">费用条款</a><a href="#execution">执行参考与监管</a></nav>
 <section class="deal-section" id="allocation"><header><h3>配售与上市时流通结构</h3></header><div class="deal-columns"><div><dl class="deal-facts">${stat('香港公开发售',`${offeringNumber(o.publicShares)} 股 · ${offeringNumber(o.publicShares/o.shares*100,2)}%`)}${stat('公开发售认购',`${offeringNumber(o.publicSubscription,2)} 倍`)}${stat('国际配售认购',`${offeringNumber(o.internationalSubscription,2)} 倍`)}${stat('港交所公众持股',`${offeringNumber(fl.officialPublicShares)} 股 · ${offeringNumber(fl.officialPublicRatio,2)}%`)}</dl><h4>基石获配</h4><div class="deal-allocation-list">${d.cornerstones.map((c,i)=>`<div><button type="button" class="cs-inline-jump" data-open-cornerstone="cs:${d.code}-cs-${i}">${escapeHtml(c.name)} <small>画像 →</small></button><strong class="col-num">${offeringNumber(c.shares)} 股</strong></div>`).join('')}</div></div><div>${floatWaterfallHtml}<table class="deal-float-table"><thead><tr><th>流通拆解</th><th class="col-num">百万股</th><th class="col-num">HKD 百万</th></tr></thead><tbody>${exactRow('基础发售',o.shares,o.gross)}${exactRow('− 基石禁售',-o.cornerstoneShares,-o.cornerstoneShares*o.final)}${exactRow('上市时无禁售',fl.unlockedShares,fl.unlockedHkd)}${exactRow('− 现有股东及关联客户',-(fl.unlockedShares-fl.adjustedShares),-(fl.unlockedHkd-fl.adjustedHkd))}${exactRow('追瑞调整后余量',fl.adjustedShares,fl.adjustedHkd)}</tbody></table></div></div>
 <div class="deal-account-list">${fl.accounts.map((a,i)=>`<article id="account-${a.id.replace(':','-')}"><h4><button type="button" class="cs-inline-jump" data-open-cornerstone="cs:${d.code}-acct-${i}">${escapeHtml(a.displayName)} · ${escapeHtml(a.structure)} <small>画像 →</small></button><span>${offeringNumber(a.shares)} 股</span></h4><p>法律获配：${escapeHtml(a.legalHolder)} · ${a.fund?'账户：'+escapeHtml(a.fund):'经济敞口：'+escapeHtml(a.economicParty)}</p><p>${escapeHtml(a.ownershipFact)}${a.fundingFact?' · '+escapeHtml(a.fundingFact):''}${a.rightsFact?' · '+escapeHtml(a.rightsFact):''}</p></article>`).join('')}</div>
 <details class="deal-light-detail"><summary>其他获配及配售条件</summary>${fl.deductions.filter(x=>x.kind==='existing_shareholder_or_close_associate').map(x=>`<p>${escapeHtml(x.name)} · ${offeringNumber(x.shares)} 股</p>`).join('')}<p>上市规则 10.04、附录 F1 第 1C(1) 及 1C(2) 段的豁免或同意。</p></details></section>
 <section class="deal-section" id="fees"><header><h3>发行费用与合同条款</h3><button type="button" class="action-link-btn" data-same-size="${escapeHtml(d.roundId)}">${p0HasFeeOrigin()?'← 返回原费用筛选':'同规模费用横比 →'}</button></header><div class="deal-columns"><div><h4>承销与保荐合同</h4><dl class="deal-facts">${stat('固定承销佣金',feePercent(f.contractTerms.fixedBps))}${stat('额外酌情上限',feePercent(f.contractTerms.discretionaryCapBps))}${stat('承销合计上限',feePercent(f.contractTerms.upperBps))}${stat('约定保荐费 · 整单',spDisplay)}</dl></div><div class="deal-expenses"><h4>估计上市总开支</h4><dl class="deal-facts">${stat('估计总开支（HKD 百万）',money(f.estimatedExpensesHkd))}${stat('占发售总额',feePercent(f.estimatedExpenseBps))}${stat('估计净募资（HKD 百万）',money(f.netHkd))}</dl></div></div></section>
 <section class="deal-section" id="execution"><header><h3>执行参考与监管</h3><button type="button" class="action-link-btn" data-open-regulatory="${escapeHtml(d.issuerId)}">同案监管进度 →</button></header>${p0RegulatoryTimeline(d.issuerId)}${d.execution.map(x=>`<article class="deal-execution"><div class="deal-exec-head"><h4><span class="exec-ref-tag">执行参考</span>${escapeHtml(x.title)}</h4><button type="button" class="exec-ref-search-btn" data-exec-search="${escapeHtml(x.title)}">检索执行先例 ⌕</button></div><p>${escapeHtml(x.fact)}</p><p class="deal-execution-action">${escapeHtml(x.action)}</p></article>`).join('')}</section>
 <details class="deal-sources-fold" id="sources"><summary><span>公告与招股章程原件</span><small>展开备查链接</small></summary><div class="deal-sources-fold-body"><div class="consolidated-source-grid"><div class="consolidated-doc-row"><strong>招股章程（${d.prospectusDate}）</strong><div class="consolidated-page-links">${feeRosterSource(d.prospectusUrl,'招股书全文 ↗')}${src(d.prospectusUrl,291,'承销佣金 p.')}${src(d.prospectusUrl,292,'保荐费 p.')}${execPages.map(p=>src(d.prospectusUrl,p,'合规与执行 p.')).join('')}</div></div><div class="consolidated-doc-row"><strong>定价及配发结果公告</strong><div class="consolidated-page-links">${feeRosterSource(d.allotmentUrl,'配发结果全文 ↗')}${src(d.allotmentUrl,3,'净额与认购 p.')}${src(d.allotmentUrl,6,'基石获配 p.')}${src(d.allotmentUrl,7,'关连豁免 p.')}${src(d.allotmentUrl,12,'获配名单 p.')}${src(d.allotmentUrl,14,'TRS 结构 p.')}${src(d.allotmentUrl,16,'公众流通 p.')}${feeRosterSource('https://www.hkexnews.hk/homeccasssearch.html','港交所 CCASS ↗')}</div></div></div></div></details></article>`;
}

function renderDossiers() {
 const root=document.getElementById('dossierCards');if(!root)return;
 const round=state.roundId||state.dossierId,row=findAnyOfferingRound(round),full=eligibleOfferingDossiers().find(d=>d.roundId===round);
 document.querySelector('#dossiersView .offering-toolbar').hidden=true;document.querySelector('#dossiersView .offering-toolbar').style.display='none';document.getElementById('dossierCount').hidden=true;
 const info=p0FromUrlInfo();
 const validOrigin=Boolean(info&&info.view!=='dossiers');
 const backLabel=validOrigin
  ?(info.view==='directory'?'← 返回项目总录（已保留筛选）'
    :info.view==='pausedOfferings'?'← 返回发售搁置工作台'
    :info.view==='cornerstones'?'← 返回基石画像'
    :info.view==='tracker'?'← 返回监管节奏'
    :info.view==='sponsorLeaderboard'||info.view==='sponsorPk'?'← 返回保荐人榜单'
    :'← 返回新股与费用（已保留筛选）')
  :(row?.route==='paused_offer'?'← 返回发售搁置工作台':'← 返回新股与费用');
 document.getElementById('dossierReturn').innerHTML=`<button type="button" data-return-context>${backLabel}</button><span>${row?`本轮招股 ${row.prospectusDate||'—'}`:''}</span>`;
 root.innerHTML=full&&!full.disclosureStates?renderDossier(full):row?p0StandardDossier(row):eligibleCornerstoneCoverage().some(o=>o.roundId===round)?p0CornerstoneOnlyDossier(eligibleCornerstoneCoverage().find(o=>o.roundId===round)):'<div class="empty-state-row">未找到该发行轮次。<button type="button" data-return-context>返回发行总表</button></div>';
}

function openOfferingDossier(roundId, section="") {
  if(!findAnyOfferingRound(roundId)&&!eligibleCornerstoneCoverage().some(o=>o.roundId===roundId))return false;
  state.roundId=roundId;state.dossierId=roundId;state.dossierSection=section;state.peek='';
  closeDetail(false);switchView('dossiers');
  document.querySelector('#dossierReturn button')?.focus({preventScroll:true});return true;
}

const HEMEI_VALUATION_LADDER = {
  roundId: "offering:00054:2026-10-30",
  prospectusPages: [124, 127],
  points: [
    { label: "A轮", val: 2.0, note: "", proposed: false },
    { label: "B轮", val: 12.0, note: "", proposed: false },
    { label: "C轮", val: 25.0, note: "", proposed: false },
    { label: "D轮", val: 33.0, note: "年化 13.4%", proposed: false },
    { label: "D+轮", val: 35.0, note: "年化 14.1%", proposed: false },
    { label: "E轮", val: 39.0, note: "年化 24.4%", proposed: false },
    { label: "拟发行", val: 66.96, note: "较末轮 +71.7%", proposed: true }
  ]
};

function renderHemeiValuationLadder(facts, defaultOpen = false) {
  if (facts.roundId !== HEMEI_VALUATION_LADDER.roundId) return "";
  const pts = HEMEI_VALUATION_LADDER.points;
  const W = 680, H = 196, padL = 48, padR = 38, padT = 28, padB = 50, maxV = 75;
  const xOf = idx => padL + (idx / (pts.length - 1)) * (W - padL - padR);
  const yOf = val => padT + (1 - val / maxV) * (H - padT - padB);
  const grid = [0, 20, 40, 60].map(v => `<line class="val-ladder-grid" x1="${padL}" x2="${W - padR}" y1="${yOf(v).toFixed(1)}" y2="${yOf(v).toFixed(1)}" /><text class="val-ladder-y" x="${padL - 8}" y="${(yOf(v) + 3.5).toFixed(1)}" text-anchor="end">${v}</text>`).join("");
  const solidPts = pts.slice(0, -1).map((p, i) => `${xOf(i).toFixed(1)},${yOf(p.val).toFixed(1)}`).join(" ");
  const lastPrivate = pts.length - 2;
  const proposedLine = `<line class="val-ladder-proposed-line" x1="${xOf(lastPrivate).toFixed(1)}" y1="${yOf(pts[lastPrivate].val).toFixed(1)}" x2="${xOf(pts.length - 1).toFixed(1)}" y2="${yOf(pts[pts.length - 1].val).toFixed(1)}" />`;
  const nodesSvg = pts.map((p, i) => {
    const cx = xOf(i).toFixed(1), cy = yOf(p.val).toFixed(1);
    const valStr = p.proposed ? p.val.toFixed(2) : p.val.toFixed(1);
    return `<g class="val-ladder-pt${p.proposed ? " is-proposed" : ""}">
      <circle cx="${cx}" cy="${cy}" r="${p.proposed ? "5.5" : "4.5"}" />
      <text class="val-ladder-val" x="${cx}" y="${(Number(cy) - 10).toFixed(1)}" text-anchor="middle">${valStr}</text>
      <text class="val-ladder-lbl" x="${cx}" y="${H - 28}" text-anchor="middle">${p.proposed ? "○ " : ""}${escapeHtml(p.label)}</text>
      ${p.note ? `<text class="val-ladder-note" x="${cx}" y="${H - 12}" text-anchor="middle">${escapeHtml(p.note)}</text>` : ""}
    </g>`;
  }).join("");
  return `<details class="offering-section offering-valuation-ladder" id="paused-valuation"${defaultOpen ? " open" : ""}>
    <summary><strong>历轮投后估值阶梯与账面年化</strong><span>A 轮 RMB 2.0 亿 → E 轮 39.0 亿 → 拟发行 66.96 亿（较末轮 +71.7%）</span></summary>
    <div class="offering-section-body">
      <div class="val-ladder-head">
        <span class="val-ladder-unit">单位：RMB 亿元（投后估值）</span>
        <span class="val-ladder-legend"><i class="is-solid"></i>历史实缴融资轮次　<i class="is-hollow"></i>拟发行估值（空心点 · 招股书 p.124 / p.127）</span>
      </div>
      <svg class="val-ladder-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="和美药业 A轮至E轮及拟发行投后估值阶梯图">${grid}<polyline class="val-ladder-line" points="${solidPts}" fill="none" />${proposedLine}${nodesSvg}</svg>
    </div>
  </details>`;
}

function renderOfferingSources(facts, notice, fee = null) {
  const link = (url,label) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
  const pdf = (label,pages) => (pages&&pages.length) ? `<div><b>${label}</b><div class="source-page-pills">${pages.map(page => link(`${facts.prospectusUrl}#page=${page}`, `p.${page}`)).join("")}</div></div>` : "";
  const feePages = fee ? [...new Set([...(fee.sources||[]), ...(fee.sponsorFee?.sources||[])].map(s=>s.page).filter(Boolean))] : [];
  return `<details class="deal-sources-fold offering-sources" id="sources"><summary><span>公告与招股章程原件</span><div class="consolidated-page-links">${link(notice.url, `延期公告 (${notice.date}) ↗`)}${link(facts.prospectusUrl, `招股章程 (${facts.date}) ↗`)}</div></summary><div class="deal-sources-fold-body"><div class="offering-source-list">
    <div><b>发售公告页码</b><div class="source-page-pills">${notice.pages.map(page => link(`${notice.url}#page=${page}`,`p.${page}`)).join("")}</div></div>
    ${pdf("招股书核心条款",[2])}${pdf("股本构成",facts.denominatorPages)}${facts.plannedMarketCap ? pdf("计划上市市值",facts.plannedMarketCap.pdfPages) : ""}${pdf("发售结构",facts.structurePages)}${pdf("保荐人 / CMI",facts.partyPages)}${pdf("基石投资者",facts.cornerstonePages)}${feePages.length ? pdf("佣金与保荐费",feePages) : ""}
    ${facts.roundId === HEMEI_VALUATION_LADDER.roundId ? pdf("历轮融资与估值", HEMEI_VALUATION_LADDER.prospectusPages) : ""}
    <div><b>OC 委任公告</b><div class="source-page-pills">${facts.ocSources.map(source => link(`${source.url}#page=3`,`${source.date} p.3`)).join("")}</div></div>
    ${facts.preIpo ? pdf("上市前投资者",facts.preIpo.sourcePages) : ""}
    ${facts.market?.sourceUrl ? `<div><b>发行窗口行情</b><div class="source-page-pills">${link(facts.market.sourceUrl, `${facts.market.sourceLabel || "市场日报"} (${facts.market.date}) ↗`)}</div></div>` : ""}
    ${(facts.cornerstones || []).filter(item => item.profileUrl).map(item => `<div><b>机构背景</b><div class="source-page-pills">${link(item.profileUrl,item.shortName + " ↗")}</div></div>`).join("")}
    ${(facts.cornerstoneGroups || []).filter(group => group.ranking).map(group => `<div><b>规模及排名出处</b><div class="source-page-pills">${link(group.ranking.sourceUrl,group.ranking.sourceLabel + " ↗")}</div></div>`).join("")}
    ${(facts.cornerstoneGroups || []).flatMap(group => group.profileSources || []).map(source => `<div><b>人物身份出处</b><div class="source-page-pills">${link(source.url,source.label + " ↗")}</div></div>`).join("")}
  </div></div></details>`;
}

function renderOfferings() {
  const root = document.getElementById("offeringCards");
  if (!root) return;
  const all = (state.data?.records || []).map(record => ({record, notice: currentOfferingNotice(record)}))
    .filter(item => item.notice).sort((a,b) => b.notice.date.localeCompare(a.notice.date));
  const feeByRound = new Map(eligibleOfferingFees().map(f => [f.roundId, f]));
  const rosterByRound = new Map(eligibleFeeRoster().map(r => [r.id, r]));
  const query = normalizeSearchText(state.offeringQuery);
  const rows = all.filter(({record}) => !query || getRecordText(record).includes(query));
  const postponed = all.filter(item => item.notice.kind === "offeringPostponement").length;
  document.getElementById("offeringCount").textContent = `${rows.length} / ${all.length} 宗 · ${postponed} 宗延期 · ${all.length - postponed} 宗本轮不进行`;
  document.getElementById("offeringSearch").value = state.offeringQuery;

  // Top ECM Insight Strip
  const insightEl = document.getElementById("pausedInsightStrip");
  if (insightEl) {
    let lowSum = 0, highSum = 0, mechB = 0, withCs = 0, withPreIpo = 0;
    const csRates = [], cmiCounts = [];
    for (const {notice} of all) {
      const f = notice.research;
      const hi = f.offerShares * f.priceHigh;
      const lo = f.priceLow == null ? hi : f.offerShares * f.priceLow;
      lowSum += lo; highSum += hi;
      if (/机制\s*B/.test(f.mechanism || "")) mechB++;
      const groups = offeringCornerstoneGroups(f);
      if (groups.length) withCs++;
      for (const s of (f.cornerstoneScenarios || [])) csRates.push(s.shares / f.offerShares * 100);
      cmiCounts.push((f.cmis || []).length);
      if (f.preIpo) withPreIpo++;
    }
    const minRate = csRates.length ? offeringNumber(Math.min(...csRates), 1) : "—";
    const maxRate = csRates.length ? offeringNumber(Math.max(...csRates), 1) : "—";
    const minCmi = cmiCounts.length ? Math.min(...cmiCounts) : 0;
    const maxCmi = cmiCounts.length ? Math.max(...cmiCounts) : 0;
    insightEl.innerHTML = `
      <div class="stat-cell"><span class="stat-label">本轮搁置样本</span><strong class="stat-val col-num">${all.length} 宗</strong><small class="stat-sub">${postponed} 宗延期发售 · ${all.length - postponed} 宗本轮不进行</small></div>
      <div class="stat-cell"><span class="stat-label">合计计划募资（绿鞋前）</span><strong class="stat-val col-num">HKD ${offeringNumber(lowSum / 1e8, 1)}–${offeringNumber(highSum / 1e8, 1)}亿</strong><small class="stat-sub">按招股价区间 / 最高发售价汇总</small></div>
      <div class="stat-cell"><span class="stat-label">分配机制 · 机制 B 占比</span><strong class="stat-val col-num">${mechB} / ${all.length} 宗 (${Math.round(mechB / Math.max(1, all.length) * 100)}%)</strong><small class="stat-sub">无强制回拨机制 B · 另 ${all.length - mechB} 宗可重分配至 15%</small></div>
      <div class="stat-cell"><span class="stat-label">已披露基石覆盖率</span><strong class="stat-val col-num">${withCs} / ${all.length} 宗 · ${minRate}%–${maxRate}%</strong><small class="stat-sub">基石认购占发售股份比例区间</small></div>
      <div class="stat-cell"><span class="stat-label">承销团与 Pre-IPO</span><strong class="stat-val col-num">${minCmi}–${maxCmi} 家 CMI</strong><small class="stat-sub">${withPreIpo} 宗含上市前投资 / 可转债情景披露</small></div>
    `;
  }

  // Side-by-Side Comparison Matrix Table (clicking any row opens full Tear Sheet Dossier)
  const matrixWrap = document.getElementById("pausedMatrixWrap");
  if (matrixWrap) {
    matrixWrap.innerHTML = rows.length ? `<div class="table-wrap paused-matrix-wrap"><table class="paused-matrix-table">
      <thead><tr>
        <th scope="col">公司 / 公告状态</th>
        <th scope="col" class="col-num">计划募资 · 招股价</th>
        <th scope="col">分配机制</th>
        <th scope="col">保荐人 · 承销团</th>
        <th scope="col">基石与上市前投资</th>
        <th scope="col" class="col-num">约定佣金 · 保荐费</th>
        <th scope="col">发行窗口与认购披露</th>
      </tr></thead>
      <tbody>${rows.map(({record, notice}) => {
        const f = notice.research, labels = offeringNoticeLabels(notice);
        const fee = feeByRound.get(f.roundId), rosterRow = rosterByRound.get(f.roundId);
        const ocs = (f.cmis || []).filter(c => c.overallCoordinator).length;
        const groups = offeringCornerstoneGroups(f);
        const ratio = offeringCornerstoneRatio(f);
        const spHtml = (rosterRow?.institutions?.length ? rosterRow.institutions.map(i => renderSponsorJumpChip(i.displayName, i.sponsorId, i.legalName)) : f.sponsors.map(s => renderSponsorJumpChip(s.shortName, sponsorIdForName(s.name), s.name))).join(" · ");
        const csChips = groups.length
          ? groups.slice(0, 3).map(g => `<button type="button" class="cs-mini-chip" data-open-cornerstone="cs:${escapeHtml(g.id)}">${escapeHtml(g.displayName || g.name)}</button>`).join("") + (groups.length > 3 ? `<span class="cs-more-count">+${groups.length - 3}</span>` : "")
          : "";
        let preIpoHint = "";
        if (f.preIpo) {
          const p = f.preIpo;
          const totalS = p.kind === "convertible" ? offeringPreIpoScenario(p, { cost: p.totalPrincipal, shares: p.totalConversionShares }) : offeringPreIpoScenario(p, p.investors[0]);
          const mult = totalS.costHkd > 0 ? totalS.valueHkd / totalS.costHkd : 0;
          const gainTxt = formatChineseUnitAmount(totalS.gainHkd, "HKD");
          preIpoHint = `<small class="paused-preipo-pill">${p.kind === "convertible" ? `7 笔可转债 · 账面 ${offeringNumber(mult, 2)}x` : `${escapeHtml(p.investors[0].displayName.replace(/（.*）/, ""))} ${offeringNumber(totalS.postPercent, 2)}%`} · 浮盈 ${escapeHtml(gainTxt)}</small>`;
        }
        const csCellHtml = `${ratio ? `<strong class="cs-ratio-line">${escapeHtml(ratio.replace(/（.*）/, ""))}</strong>` : ""}${csChips ? `<div class="cs-chip-row">${csChips}</div>` : (!preIpoHint ? '<span class="data-missing">未披露基石</span>' : "")}${preIpoHint}`;
        const feeText = fee ? `${feePercent(fee.fixedBps)} / 上限 ${feePercent(fee.upperBps)}` : "—";
        const spFeeText = rosterRow?.sponsorFee ? formatChineseUnitAmount(rosterRow.sponsorFee.value, rosterRow.sponsorFee.currency, Boolean(rosterRow.sponsorFee.approximate)) : "—";
        const m = f.market;
        const mChg = m ? Number(m.changePercent) : null;
        const mChgStr = mChg !== null ? `${mChg > 0 ? "+" : ""}${offeringNumber(mChg, 2)}%` : "";
        const marketCellHtml = m
          ? `<div class="paused-window-cell"><strong class="col-num">恒指 ${offeringNumber(m.hsiClose, 0)} <em class="${mChg > 0 ? "is-up" : mChg < 0 ? "is-down" : ""}">(${mChgStr})</em></strong><small class="col-num">大市 HKD ${offeringNumber(m.turnoverHkd / 1e8, 0)}亿 · 近7日新股 ${m.listedLast7Days} 宗</small><div class="paused-window-tags">${f.publicSubscription ? `<span class="paused-sub-pill">${escapeHtml(f.publicSubscription)}</span>` : ""}<span class="badge ${escapeHtml(record.status)}"><b>${escapeHtml(statusLabel(record.status))}</b></span></div></div>`
          : `<span class="badge ${escapeHtml(record.status)}"><b>${escapeHtml(statusLabel(record.status))}</b></span><small>A1 ${notice.applicationDate}</small>`;
        const rlInfo = RELAUNCH_COMPARISONS[notice.stockCode];
        const rlBadge = rlInfo ? ` <button type="button" class="relaunch-jump-pill" data-jump-relaunch="${escapeHtml(rlInfo.liveRoundId)}">已于 11-23 调价重启招股 ↗</button>` : "";
        return `<tr class="paused-matrix-row" data-paused-round="${escapeHtml(f.roundId)}" tabindex="0" role="button" aria-label="打开 ${escapeHtml(f.displayName)} 完整发售档案">
          <th scope="row"><div class="paused-company-line"><a href="${escapeHtml(p0DossierUrl(f.roundId))}" data-round-id="${escapeHtml(f.roundId)}"><strong>${escapeHtml(f.displayName)}</strong></a><span class="mono-code">${notice.stockCode}.HK</span></div><small class="paused-sub-line"><span class="paused-state-tag">${escapeHtml(labels[0])}</span> · ${notice.date}${rlBadge}</small></th>
          <td class="col-num"><strong>${escapeHtml(offeringGross(f).replace(/ 百万/g, "百万"))}</strong><small>${escapeHtml(offeringPrice(f))}</small></td>
          <td><span class="mech-label">${escapeHtml(f.mechanism)}</span><small>发售 ${offeringNumber(f.offerShares / f.postShares * 100, 1)}% · 市值 HKD ${offeringNumber(f.plannedMarketCap.amountHkd / 1e8, 1)}亿</small></td>
          <td><div class="paused-sponsors-cell">${spHtml}</div><small>${ocs} OC · ${(f.cmis || []).length} CMI</small></td>
          <td>${csCellHtml}</td>
          <td class="col-num"><strong>${escapeHtml(feeText)}</strong><small>保荐费 ${escapeHtml(spFeeText)}</small></td>
          <td>${marketCellHtml}</td>
        </tr>`;
      }).join("")}</tbody></table></div>` : "";
  }

  root.innerHTML = rows.map(({record, notice}) => {
    const names = nameParts(record), labels = offeringNoticeLabels(notice), f = notice.research;
    const high = f.offerShares * f.priceHigh / 1000000;
    const low = f.priceLow === null ? null : f.offerShares * f.priceLow / 1000000;
    const cap = f.plannedMarketCap;
    const fee = feeByRound.get(f.roundId);
    const groups = offeringCornerstoneGroups(f);
    const m = f.market;
    const mChg = m ? Number(m.changePercent) : null;
    const marketLine = m ? `<div class="paused-card-market"><span class="col-num">发行窗口 (${m.date})：恒指 ${offeringNumber(m.hsiClose, 0)} (${mChg > 0 ? "+" : ""}${offeringNumber(mChg, 2)}%) · 大市成交 HKD ${offeringNumber(m.turnoverHkd / 1e8, 0)}亿 · 近7日新挂牌 ${m.listedLast7Days} 宗</span>${f.publicSubscription ? `<span class="paused-sub-pill">${escapeHtml(f.publicSubscription)}</span>` : ""}</div>` : "";
    let preIpoCardTag = "";
    if (f.preIpo) {
      const p = f.preIpo;
      const tot = p.kind === "convertible" ? offeringPreIpoScenario(p, { cost: p.totalPrincipal, shares: p.totalConversionShares }) : offeringPreIpoScenario(p, p.investors[0]);
      const mult = tot.costHkd > 0 ? tot.valueHkd / tot.costHkd : 0;
      preIpoCardTag = ` · 上市前投资 ${offeringNumber(mult, 2)}x（浮盈 ${formatChineseUnitAmount(tot.gainHkd, "HKD")}）`;
    }
    const rlCardInfo = RELAUNCH_COMPARISONS[notice.stockCode];
    const rlCardPill = rlCardInfo ? `<button type="button" class="relaunch-jump-pill" data-jump-relaunch="${escapeHtml(rlCardInfo.liveRoundId)}">已于 11-23 调价重启招股 · 对比剖析 ↗</button>` : "";
    return `<article class="offering-card paused-brief-card" data-offering-card="${escapeHtml(record.id)}" data-offer-round="${escapeHtml(f.roundId)}" tabindex="0" role="button">
      <div class="offering-overview">
        <div class="offering-overview-company">
          <h3 title="${escapeHtml(foldTraditional(names.primary))}">${escapeHtml(f.displayName)} <span class="mono-code">${notice.stockCode}.HK</span></h3>
          <div class="offering-status" title="${escapeHtml(labels[1])}"><span class="paused-state-tag">${labels[0]}</span><time datetime="${notice.date}">${notice.date}</time>${rlCardPill}</div>
          <p class="offering-reason-line">招股书 ${f.date} · 公告措辞：${escapeHtml(f.announcementWording || "现时市况")}</p>
        </div>
        <div class="offering-overview-gross"><span class="offering-mobile-label">计划发售总额 · HKD 百万</span><strong>${low === null ? `最高 ${offeringNumber(high, 1)}` : `${offeringNumber(low, 1)}–${offeringNumber(high, 1)}`}</strong>${renderOfferingRange(low,high,0,1100,offeringGross(f),["0","550","1,100"])}</div>
        <div class="offering-overview-cap"><span class="offering-mobile-label">计划上市市值</span><strong>HKD ${offeringNumber(cap.amountHkd / 1e8, 1)}亿</strong><span class="offering-cap-basis">${escapeHtml(cap.priceBasis)}</span></div>
        <div class="offering-overview-ratio"><span class="offering-mobile-label">发售比例 / 佣金</span><strong>${offeringNumber(f.offerShares / f.postShares * 100, 2)}%</strong><span class="offering-cap-basis">${fee ? `佣金 ${feePercent(fee.fixedBps)} · 上限 ${feePercent(fee.upperBps)}` : ""}</span></div>
      </div>
      ${marketLine}
      <div class="paused-card-foot">
        <span class="paused-card-meta">${escapeHtml(f.mechanism)} · ${groups.length ? `${groups.length} 组基石` : "未披露基石"}${preIpoCardTag}</span>
        <div class="paused-card-actions">
          <button type="button" class="text-button" data-offering-detail="${escapeHtml(record.id)}">监管档案</button>
          <a class="action-link-btn" href="${escapeHtml(p0DossierUrl(f.roundId))}" data-round-id="${escapeHtml(f.roundId)}">完整发售档案 →</a>
        </div>
      </div>
      <details class="offering-expand"><summary>快速展开条款 <span>${rlCardInfo ? "重启对比剖析 · " : ""}结构 · 认购与基石${f.preIpo ? " · 上市前投资者" : ""}</span></summary><div class="offering-expanded-body">
        ${rlCardInfo ? renderRelaunchComparisonPanel(notice.stockCode, { compact: true, context: "paused" }) : ""}
        ${renderOfferingResearch(f, notice)}
        ${renderOfferingSources(f, notice, fee)}
      </div></details>
    </article>`;
  }).join("") || '<p class="muted empty-state-row">没有匹配的搁置发售项目</p>';
}

// ============================================================
// 基石与机构投资者画像 (Cornerstone & Institutional Profiles)
// ============================================================
function classifyCornerstoneArchetype(tagsText, roleText = "") {
  const txt = `${tagsText} ${roleText}`;
  if (/公募|QDII/i.test(txt)) return { key: "public_fund", label: "内地公募 / QDII" };
  if (/个人|家族|恒基|周大福|私人投资/i.test(txt)) return { key: "hk_family", label: "港资家族 / 个人基石" };
  if (/产业|上市.*集团|新能源|光伏|制造|显示器件|工业/i.test(txt)) return { key: "strategic", label: "产业战投" };
  return { key: "asset_mgmt", label: "跨境私募 / 资管" };
}

function eligibleCornerstoneCoverage() {
  const coverage=state.dossierData?.cornerstoneCoverage;
  if(coverage?.schemaVersion!==1)return [];
  const rows=new Map(eligibleFeeRoster().filter(r=>r.route==='listed_offering').map(r=>[r.id,r]));
  return (coverage.offers||[]).filter(o=>{const r=rows.get(o.roundId);return r?r.issuerId===o.issuerId&&r.code===o.code&&r.listingDate===o.listingDate&&r.prospectusDate===o.prospectusDate:o.board==='GEM'&&o.issuerId===null&&o.roundId===`offering:${o.code}:${o.prospectusDate}`&&Boolean(o.listingSource)&&Boolean(o.documents?.length);});
}
function selectCornerstoneOfferings(criteria={}) {
 const boards=criteria.boards||[], industries=criteria.industries||[];
 return [...new Map(eligibleCornerstoneCoverage().filter(o=>(!boards.length||boards.includes(o.board))&&(!criteria.from||o.listingDate>=criteria.from)&&(!criteria.to||o.listingDate<=criteria.to)&&(!industries.length||industries.some(tag=>(o.industryTags||[]).includes(tag)))).map(o=>[o.roundId,o])).values()];
}
function summarizeCornerstoneOfferings(criteria={}) {
 const offers=selectCornerstoneOfferings(criteria),allocations=offers.flatMap(o=>o.allocations),cutoff=state.dossierData?.cornerstoneCoverage?.listingCutoff;
 const money=values=>{const cents=values.reduce((n,v)=>{const [whole,fraction='']=String(v||'0').split('.');return n+BigInt(whole)*100n+BigInt((fraction+'00').slice(0,2));},0n);return `${cents/100n}.${String(cents%100n).padStart(2,'0')}`;};
 return {listingCutoff:cutoff,outsideCutoff:Boolean(criteria.from&&criteria.from>cutoff),offeringCount:offers.length,disclosedCount:offers.filter(o=>o.status==='known').length,notDisclosedCount:offers.filter(o=>o.status==='confirmed_zero').length,unknownCount:offers.filter(o=>o.status==='unknown').length,allocationCount:allocations.length,offeringAmountHkd:money(offers.map(o=>o.amountHkd)),allocationAmountHkd:money(allocations.map(a=>a.amountHkd))};
}
function cornerstoneProfileMatch(profile,id){return profile.id===id||(profile.aliases||[]).includes(id);}
function cornerstoneUnit(unit){return unit==='HDR'?'份 HDR':'股';}
function p0CornerstoneOnlyDossier(offer){
 if(!offer)return '';
 return `<article class="deal-sheet" data-dossier-round="${escapeHtml(offer.roundId)}"><header class="deal-header"><div><p><span class="deal-status-pill is-listed">已上市 ${offer.listingDate}</span> · ${offer.code}.HK · ${escapeHtml(offer.board)}</p><h2>${escapeHtml(offer.issuer)}</h2></div></header><dl class="deal-kpis"><div><dt>最终发售价（HKD／${offer.unit==='HDR'?'HDR':'股'}）</dt><dd>${offeringNumber(offer.priceHkd,2)}</dd></div></dl>${p0CornerstoneCoverageSection({id:offer.roundId})}<section class="deal-section deal-sources-index" id="sources"><header><h3>披露原件与页码索引</h3></header><div class="consolidated-page-links">${[...new Set([offer.listingSource,...offer.documents])].map(u=>feeRosterSource(u,'发行原件 ↗')).join('')}</div></section></article>`;
}
function p0CornerstoneCoverageSection(row){
 const offer=eligibleCornerstoneCoverage().find(o=>o.roundId===row.id);
 if(!offer||offer.status==='unknown')return '';
 const sources=offer.sources.map(u=>feeRosterSource(u,'原件 ↗')).join(' ');
 if(offer.status==='confirmed_zero')return `<section class="deal-section" id="cornerstone-allocation"><header><h3>基石配售</h3></header><p>未披露基石配售</p><div class="consolidated-page-links">${sources}</div></section>`;
 const profiles=buildCornerstoneProfiles().filter(p=>p.allocationIds?.length&&p.deals.some(d=>d.roundId===row.id));
 return `<section class="deal-section" id="cornerstone-allocation"><header><h3>基石获配 · ${offeringNumber(offer.quantity)} ${cornerstoneUnit(offer.unit)}</h3></header><dl class="deal-facts"><div><dt>${offer.allocations.length?'按最终发售价':'仅发行总额'}</dt><dd>HKD ${feeRosterMillion(offer.amountHkd)} 百万</dd></div></dl>${offer.offerStructure?`<dl class="deal-facts"><div><dt>发售结构</dt><dd>股东出售 · ${offeringNumber(offer.offerStructure.offeredQuantity)} ${cornerstoneUnit(offer.unit)}</dd></div><div><dt>发行人所得</dt><dd>HKD ${offeringNumber(offer.offerStructure.issuerGrossHkd,2)} ${feeRosterSource(offer.offerStructure.source,'原件 ↗')}</dd></div></dl>`:''}${profiles.length?`<div class="deal-allocation-list">${profiles.map(p=>`<div><button type="button" class="cs-inline-jump" data-open-cornerstone="${escapeHtml(p.id)}">${escapeHtml(p.name)} <small>画像 →</small></button><strong class="col-num">${escapeHtml(p.deals.find(d=>d.roundId===row.id).commitmentText)}</strong></div>`).join('')}</div>`:''}<div class="consolidated-page-links">${sources}</div></section>`;
}

const publicCornerstoneRegistry = [{"id":"transsion","name":"传音控股","type":"strategic","label":"产业投资","description":"A+H上市公司 · 智能终端与移动互联网（688036.SH／02636.HK）；传音国际经深圳市泰衡诺科技有限公司持有。","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/1104/2026110402294_c.pdf","contextSource":"https://www.transsion.com/zh-CN/about","names":["Shenzhen Transsion Holdings Co., Ltd.","深圳传音控股股份有限公司","深圳傳音控股股份有限公司"],"exactAllocations":["offering:02681:2026-10-30:cornerstone:3"]},{"id":"gf-fund","name":"广发基金","type":"public_fund","label":"内地公募管理人","description":"广发基金管理有限公司 · 旗下境内及香港管理实体","source":"https://www.gffunds.com.cn/gywm/gsjj/","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1030/2026103000027.pdf#page=271","names":["GF Fund Management Co., Ltd.","GF International Investment Management Limited","廣發基金管理有限公司","广发基金管理有限公司","廣發國際資產管理有限公司","广发国际资产管理有限公司"],"displayAliases":["GF Fund","GF Fund HK","GF Fund Management","GF Fund Management (Hong Kong) Co., Limited"],"exactAllocations":["offering:09856:2026-09-14:cornerstone:16"]},{"id":"fullgoal","name":"富国基金","type":"public_fund","label":"内地公募管理人","description":"富国基金管理有限公司 · 富国香港为其全资子公司","source":"https://www.fullgoal.com.cn/main/AboutFuguo/CompanyProfile/index.html","contextSource":"https://www.fullgoal.com.hk/hken/enAboutUs/index.html","names":["Fullgoal Fund Management Co., Ltd.","Fullgoal Fund Management Company Limited","Fullgoal Asset Management (HK) Limited","富國基金管理有限公司","富国基金管理有限公司","富國資產管理（香港）有限公司","富国资产管理（香港）有限公司"]},{"id":"e-fund","name":"易方达基金","type":"public_fund","label":"内地公募管理人","description":"易方达基金管理有限公司 · 旗下境内及香港管理实体","source":"https://www.efunds.com.hk/sc/aboutus/","contextSource":"https://www.efunds.com.hk/uploadfiles/files/2026_02_13/_61WakUfaMo.pdf","names":["E Fund Management Co., Ltd.","E Fund Management (Hong Kong) Co., Ltd.","E Fund Management (Hong Kong) Co., Limited","易方達基金管理有限公司","易方达基金管理有限公司","易方達資產管理（香港）有限公司","易方达资产管理（香港）有限公司"],"displayAliases":["E Fund","易方达"]},{"id":"ubs-am-sg","name":"瑞银资产管理","type":"international","label":"国际资产管理","description":"新加坡签约管理实体为 UBS Asset Management (Singapore) Ltd.，由 UBS Asset Management AG 全资持有。逐宗保留招股书披露的基金、专户和管理角色。","source":"https://eservices.mas.gov.sg/fid/institution/detail/773-UBS-ASSET-MANAGEMENT-SINGAPORE-LTD","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0130/12005367/2026013000021.pdf","names":["UBS Asset Management (Singapore) Ltd."],"displayAliases":["UBS Asset Management","瑞银资产管理（新加坡）","UBS AM Singapore"]},{"id":"icbc-wealth","name":"工银理财","type":"bank_wm","label":"银行理财","description":"中国工商银行全资理财子公司。","source":"https://www.icbc.com.cn/icbc/gxk_1/12861.htm","contextSource":"https://www.icbc.com.cn/icbc/%E9%87%8D%E8%A6%81%E5%85%AC%E5%91%8A/%E5%85%B3%E4%BA%8E%E5%8F%98%E6%9B%B4%E9%83%A8%E5%88%86%E7%90%86%E8%B4%A2%E4%BA%A7%E5%93%81%E7%AE%A1%E7%90%86%E4%BA%BA%E7%9A%84%E5%85%AC%E5%91%8A.htm","names":["ICBC Wealth Management Co., Ltd.","工银理财有限责任公司","工銀理財有限責任公司"]},{"id":"gic","name":"GIC（新加坡政府投资公司）","type":"sovereign","label":"主权财富管理机构","description":"新加坡政府全资拥有，受托管理新加坡外汇储备。","source":"https://www.gic.com.sg/who-we-are/faqs/","contextSource":"https://www.gic.com.sg/who-we-are/our-governance/","names":["GIC Private Limited"]},{"id":"taikang-life","name":"泰康人寿","type":"insurance","label":"保险机构","description":"泰康保险集团全资寿险子公司。","source":"https://images.taikang.com/informationFile/2025/01/15/ff74c243-e42d-43ca-9310-94d25f7dfdda.pdf","contextSource":"https://www.taikang.com/about/company-introduction","names":["Taikang Life Insurance Co., Ltd","Taikang Life Insurance Co., Ltd.","泰康人寿保险有限责任公司"]},{"id":"taikang-group","name":"泰康保险集团","type":"insurance","label":"保险集团","description":"业务涵盖保险、资产管理、医养，旗下泰康人寿为全资寿险子公司。","source":"https://www.taikang.com/about/company-introduction","contextSource":"https://images.taikang.com/informationFile/2025/01/15/ff74c243-e42d-43ca-9310-94d25f7dfdda.pdf","names":["Taikang Insurance Group Inc.","泰康保险集团股份有限公司"]},{"id":"hhlra","name":"高瓴","type":"asset_mgmt","label":"私募资产管理","description":"HHLR Advisors 与 Hillhouse Investment Management 由同一方控制。各发行的基金及专户按原件分别列示。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0227/2026022700015.pdf","contextSource":"https://reports.adviserinfo.sec.gov/reports/ADV/166112/PDF/166112.pdf","names":["HHLR Advisors, Ltd."]},{"id":"3w","name":"3W Fund Management","type":"asset_mgmt","label":"香港私募资管","description":"香港持牌资产管理公司，为私募基金提供投资顾问与管理服务。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0415/2026041500011.pdf","contextSource":"https://www.sec.gov/Archives/edgar/data/1700194/000092963818000308/a71439_sc13g.htm","names":["3W Fund Management Limited"]},{"id":"jpm-am-ap","name":"摩根资产管理（亚太）","type":"international","label":"国际资产管理","description":"摩根资产管理旗下亚太投资管理机构。","source":"https://am.jpmorgan.com/content/dam/jpm-am-aem/asiapacific/hk/en/literature/offering-document/offerdoc_jf.pdf","contextSource":"https://www.sfc.hk/en/regulatory-functions/corporates/takeovers-and-mergers/exempt-status/fund-managers","names":["JPMorgan Asset Management (Asia Pacific) Limited","摩根資產管理（亞太）有限公司"]},{"id":"eastspring-sg","name":"瀚亚投资（新加坡）","type":"international","label":"国际资产管理","description":"保诚集团旗下的瀚亚投资机构，获新加坡金融管理局基金管理许可。","source":"https://eservices.mas.gov.sg/fid/institution/detail/808-EASTSPRING-INVESTMENTS-SINGAPORE-LIMITED","contextSource":"https://www.eastspring.com/hkdocs/kfs/ei_asiaesgbondfund_kfs_en.pdf","names":["Eastspring Investments (Singapore) Limited"]},{"id":"eastspring-hk","name":"瀚亚投资（香港）","type":"international","label":"国际资产管理","description":"英国保诚集团全资附属公司。","source":"https://www.eastspring.com/hk/zh-cht/funddetails/eastspring-investments-asian-equity-fund-a/lu0163747925","contextSource":"https://www.eastspring.com/hk/zh-cht/funddetails/eastspring-investments-asian-equity-fund-a/lu0163747925","names":["Eastspring Investments (Hong Kong) Limited","瀚亞投資(香港)有限公司"]},{"id":"tencent","name":"腾讯控股","type":"strategic","label":"产业投资","description":"港股上市的互联网及科技集团；Huang River 为腾讯控股全资投资载体。","source":"https://www.tencent.com/zh-cn/investors/","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0120/2026012000025.pdf#page=339","names":["Tencent Holdings Limited","Huang River Investment Limited"]},{"id":"byd","name":"比亚迪","type":"strategic","label":"产业投资","description":"A+H 上市的新能源汽车产业集团；Golden Link Worldwide 经比亚迪香港由集团全资控制。","source":"https://www.byd.com/eu/blog/Hello-we-are-BYD.html","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1007/2026100700007.pdf#page=225","names":["BYD Company Limited","BYD (H.K.) Co., Limited","Golden Link Worldwide Limited"]},{"id":"longsys","name":"江波龙","type":"strategic","label":"产业投资","description":"A+H 上市的存储产品产业集团，江波龙投资有限公司为其全资子公司。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1007/2026100700007.pdf#page=215","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1030/2026103000025.pdf#page=269","names":["Shenzhen Longsys Electronics Co., Ltd.","Longsys Investment Co., Limited","深圳市江波龙电子股份有限公司"]},{"id":"greenwoods-hk","name":"香港景林","type":"asset_mgmt","label":"香港私募资管","description":"景林资产管理香港有限公司，主要投资大中华区企业；与上海景林互为关联公司，获配按对应法人及账户分列。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0409/2026040900048_c.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0409/2026040901954.pdf","names":["Greenwoods Asset Management Hong Kong Limited","景林資產管理香港有限公司","景林资产管理香港有限公司"]},{"id":"greenwoods-sh","name":"上海景林","type":"asset_mgmt","label":"内地私募资管","description":"上海景林资产管理有限公司，在中国证券投资基金业协会登记为私募基金管理人；通过掉期参与的逐笔保留交易对手和经济敞口。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0312/2026031200004_c.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0212/2026021201492.pdf","names":["Shanghai Greenwoods Asset Management Co., Ltd.","上海景林資產管理有限公司","上海景林资产管理有限公司"]},{"id":"perseverance-sg","name":"Perseverance Asset Management（新加坡）","type":"asset_mgmt","label":"私募资产管理","description":"新加坡持牌基金管理公司，与上海高毅为关联机构；认购按具名基金及独立账户披露。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/0512/2025051200005.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0409/2026040900048_c.pdf","names":["Perseverance Asset Management International (Singapore) Pte. Ltd."],"displayAliases":["Perseverance Asset Management"]},{"id":"wt-am","name":"WT Asset Management","type":"asset_mgmt","label":"香港私募资管","description":"香港持牌资产管理机构，旗下投资基金和独立管理账户逐笔列示。","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2025/0908/11833388/2025090800058_c.pdf","contextSource":"https://www.hkexnews.hk/listedco/listconews/sehk/2025/0908/11833388/2025090800058_c.pdf","names":["WT Asset Management Limited"]},{"id":"gbadfm","name":"大湾区发展基金管理","type":"asset_mgmt","label":"香港资产管理","description":"大湾区发展基金管理有限公司，招股书披露可代表独立管理账户认购；账户、管理人及出资人分开标示。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0424/2026042400053.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0424/2026042400053.pdf","names":["Greater Bay Area Development Fund Management Limited","大灣區發展基金管理有限公司","大湾区发展基金管理有限公司"]},{"id":"boyu-sg","name":"博裕投资","type":"asset_mgmt","label":"私募投资管理","description":"博裕集团管理私募投资；认购可由管理实体或旗下基金载体进行，逐笔列示。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0408/2026040800017.pdf","contextSource":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0824/12295410/2026082400054.pdf#page=2","names":["Boyu Capital Management (Singapore) Pte. Ltd.","Wildlife Willow Limited"],"exactAllocations":["offering:00625:2026-08-24:cornerstone:1"],"exactAllocationProofs":{"offering:00625:2026-08-24:cornerstone:1":{"exactLabel":"Exclusive Depot","shares":24239000,"amountHkd":"1177045840.00","legalNames":["Exclusive Depot Limited"]}}},{"id":"pinpoint-hk","name":"Pinpoint Asset Management","type":"asset_mgmt","label":"香港私募资管","description":"香港持牌独立资产管理机构，为开曼基金等提供投资顾问服务。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0203/2026020300009.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0203/12010168/2026020300025.pdf","names":["Pinpoint Asset Management Limited"]},{"id":"millennium-sg","name":"Millennium Capital Management（新加坡）","type":"asset_mgmt","label":"私募资产管理","description":"新加坡持牌的 Millennium 集团投管机构；Integrated Core Strategies (Asia) 在招股书中为该机构酌情管理的基石投资主体。","source":"https://eservices.mas.gov.sg/fid/institution/detail/1739-MILLENNIUM-CAPITAL-MANAGEMENT-SINGAPORE-PTE-LTD","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0203/2026020300009.pdf","names":["Millennium Capital Management (Singapore) Pte. Ltd.","Integrated Core Strategies (Asia) Pte. Ltd."]},{"id":"harvest","name":"嘉实基金","type":"public_fund","label":"内地公募基金集团","description":"嘉实国际资产管理有限公司为嘉实基金在香港设立的全资持牌子公司，逐笔列示签约主体。","source":"https://www.jsfund.cn/main/a/20250911/483972.shtml","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1218/2025121800031.pdf","names":["Harvest Fund Management Co., Ltd.","Harvest Global Investments Limited","嘉實基金管理有限公司","嘉实基金管理有限公司","嘉實國際資產管理有限公司","嘉实国际资产管理有限公司"]},{"id":"china-amc","name":"华夏基金","type":"public_fund","label":"内地公募基金集团","description":"华夏基金管理有限公司是内地公募基金管理人，华夏基金（香港）有限公司为其全资子公司。","source":"https://www.chinaamc.com/guanyu/gailan/index.shtml","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1029/2026102900011.pdf","names":["China Asset Management Co., Ltd.","China Asset Management (Hong Kong) Limited","華夏基金管理有限公司","华夏基金管理有限公司","華夏基金(香港)有限公司","华夏基金(香港)有限公司"]},{"id":"china-universal","name":"汇添富基金","type":"public_fund","label":"内地公募基金集团","description":"汇添富基金管理股份有限公司旗下的汇添富资产管理（香港）有限公司，为全资持牌资管子公司。","source":"https://www.99fund.com/main/gywm/gsjs/index.shtml","contextSource":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0617/12205755/2026061700067_c.pdf","names":["China Universal Asset Management Co., Ltd.","China Universal Asset Management (Hong Kong) Company Limited","匯添富基金管理股份有限公司","汇添富基金管理股份有限公司","匯添富資產管理(香港)有限公司","汇添富资产管理(香港)有限公司"]},{"id":"value-partners-hk","name":"惠理基金管理香港","type":"asset_mgmt","label":"香港资产管理","description":"惠理基金管理香港有限公司，属港股上市的惠理集团（00806.HK）。","source":"https://www.valuepartners-group.com/tc/investment-solutions/institutional-funds/value-partners-multi-asset-fund-tc/","contextSource":"https://www.hkexnews.hk/listedco/listconews/sehk/2025/0905/2025090500912.pdf","names":["Value Partners Hong Kong Limited","惠理基金管理香港有限公司"]},{"id":"value-partners-vpl","name":"惠理基金管理","type":"asset_mgmt","label":"香港资产管理","description":"惠理集团（00806.HK）旗下的独立法定管理实体，公开披露为惠理基金管理公司。","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2025/0905/2025090500912.pdf","contextSource":"https://www.valuepartners-group.com/sc/about-us-sc/overview-sc/","names":["Value Partners Limited","惠理基金管理公司"]},{"id":"dacheng","name":"大成基金","type":"public_fund","label":"内地公募基金集团","description":"大成国际为大成基金管理有限公司的全资香港持牌资管子公司，可参与公募、私募及全权委托组合；逐笔区分基金或账户。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0227/2026022700016_c.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0108/2026010801352.pdf","names":["Da Cheng International Asset Management Company Limited","Dacheng Fund Management Company Limited","大成基金管理有限公司"]},{"id":"bosera-international","name":"博时国际","type":"public_fund","label":"公募基金系香港资管","description":"博时基金及招商基金分别持股55%及45%的香港持牌管理机构。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/0430/2025043003531.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0120/2026012000025.pdf","names":["Bosera Asset Management (International) Co., Limited"]},{"id":"ivyrock-hk","name":"常春藤资产管理（香港）","type":"asset_mgmt","label":"香港私募资管","description":"香港持牌资产管理机构，在基石协议中可作为投资者的酌情资产管理人。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0415/2026041500011.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1231/2025123100037.pdf","names":["IvyRock Asset Management (HK) Limited","常春藤資產管理(香港)有限公司","常春藤资产管理(香港)有限公司"]},{"id":"temasek","name":"淡马锡","type":"sovereign","label":"政府全资投资公司","description":"新加坡政府全资持有的商业投资公司，拥有自身投资资产。太白投资为其间接全资子公司。","source":"https://www.temasek.com.sg/zh/about-us/faqs","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000097.pdf#page=265","names":["Temasek Holdings (Private) Limited","Taibai Investments Pte. Ltd."],"exactAllocations":["offering:09980:2026-01-26:cornerstone:2"],"exactAllocationProofs":{"offering:09980:2026-01-26:cornerstone:2":{"exactLabel":"Taibai Investments Pte. Ltd.","shares":1760600,"amountHkd":"436628800.00","legalNames":["Taibai Investments Pte. Ltd."]}}},{"id":"true-light-i","name":"True Light Fund I","type":"asset_mgmt","label":"私募投资基金","description":"True Light Investments H 为基金投资载体，管理人 True Light Capital 由淡马锡间接全资持有；该基金亦有其他投资者。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000097.pdf#page=266","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000097.pdf#page=482","names":["True Light Investments H Pte. Ltd."],"exactAllocations":["offering:03308:2026-07-22:cornerstone:2","offering:09980:2026-01-26:cornerstone:3"],"exactAllocationProofs":{"offering:03308:2026-07-22:cornerstone:2":{"exactLabel":"True Light","shares":473900,"amountHkd":"464422000.00","legalNames":["True Light Investments H Pte. Ltd."]},"offering:09980:2026-01-26:cornerstone:3":{"exactLabel":"True Light Investments H Pte. Ltd.","shares":440100,"amountHkd":"109144800.00","legalNames":["True Light Investments H Pte. Ltd."]}}},{"id":"psbc-wealth","name":"中邮理财","type":"bank_wm","label":"银行理财","description":"中国邮政储蓄银行全资理财子公司；如通过QDII认购，按发行文件列示对应通道。","source":"https://www.psbc.com/cn/gsfw/tyjr/tylc_801/","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0625/2026062502076.pdf#page=7","names":["PSBC Wealth Management Co., Ltd.","中郵理財有限責任公司","中邮理财有限责任公司"]},{"id":"cloudalpha","name":"CloudAlpha Capital","type":"asset_mgmt","label":"香港对冲基金管理","description":"总部在香港，管理以科技股为重点的股票多空基金。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1231/2025123100035.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300005.pdf","names":["CloudAlpha Capital Management Limited","CloudAlpha Capital"]},{"id":"mirae-securities-hk","name":"未来资产证券（香港）","type":"securities","label":"外资券商系资管","description":"韩国上市券商未来资产证券（006800.KS）的全资香港子公司，在所引机构认购中作为酌情管理人。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0420/2026042000021.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0227/2026022700015.pdf","names":["Mirae Asset Securities (HK) Limited","Mirae Asset Securities HK"]},{"id":"mirae-securities-kr","name":"未来资产证券（韩国）","type":"securities","label":"外资证券公司","description":"于韩国交易所上市的证券公司（006800.KS），香港资管子公司与韩国上市法人分别记录。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0409/2026040900025.pdf","contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0420/2026042000021.pdf","names":["Mirae Asset Securities Co., Ltd.","Mirae Asset Securities Co., Ltd"]},{"id":"ninety-one-asia","name":"晋达投资（亚洲）","type":"international","label":"国际资产管理","description":"晋达旗下在新加坡获基金管理牌照的投资管理机构。","source":"https://eservices.mas.gov.sg/fid/institution/detail/415561-NINETY-ONE-ASIA-PTE-LIMITED","contextSource":"https://ninetyone.com/zh/hong-kong/newsroom/ninety-one-appoints-andrea-ng-as-head-of-southeast-asia-advisor-business","names":["Ninety One Asia Pte. Limited"]},{"id":"first-sentier-hk","name":"首源投资（香港）","type":"international","label":"国际资产管理","description":"首源投资的香港机构，最终所属集团为三菱日联金融集团；不据此推断个别投资资金。","source":"https://www.firstsentierinvestors.com/hk/en/retail/footer/important-information.html","contextSource":"https://www.firstsentierinvestors.com/content/dam/cfsgam/uploadedFiles/Content/UploadedLiterature/manual/Asia/PdfForms/fsi-hkut-application-form.pdf","names":["First Sentier Investors (Hong Kong) Limited","首源投資（香港）有限公司","首源投资（香港）有限公司"]},{"id":"rime-capital","name":"RIME Capital","type":"asset_mgmt","label":"香港私募资管","description":"香港持牌管理机构，在招股书披露的认购中管理独立基金组合。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0409/2026040900025.pdf","contextSource":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0928/2026092801977.pdf","names":["RIME Capital Limited"]},{"id":"cpp-sma-hhlra","name":"加拿大养老基金投资公司（HHLRA 管理专户）","type":"pension","label":"养老金专户","description":"HHLRA作为CPP Investments独立账户的投资管理人。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000097.pdf#page=266","contextSource":"https://www.cppinvestments.com/wp-content/uploads/2024/12/PVPGs-2024-Nov-2024-FINAL-SIMPLIFIED-CHINESE.pdf","names":[],"exactAllocations":["offering:02475:2026-06-30:cornerstone:4","offering:03661:2026-06-17:cornerstone:13"],"exactAllocationProofs":{"offering:02475:2026-06-30:cornerstone:4":{"code":"02475","allocationId":"offering:02475:2026-06-30:cornerstone:4","exactLabel":"HHLRA (CPP Investments SMA)","shares":1857300,"amountHkd":"117529944.00","legalNames":["HHLR Advisors, Ltd."],"id":"cpp-sma-hhlra","name":"加拿大养老基金投资公司（HHLRA 管理专户）","type":"pension","label":"养老金专户","description":"HHLRA作为CPP Investments独立账户的投资管理人。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000097.pdf#page=266","contextSource":"https://www.cppinvestments.com/wp-content/uploads/2024/12/PVPGs-2024-Nov-2024-FINAL-SIMPLIFIED-CHINESE.pdf"},"offering:03661:2026-06-17:cornerstone:13":{"code":"03661","allocationId":"offering:03661:2026-06-17:cornerstone:13","exactLabel":"HHLRA (CPP Investments SMA)","shares":919500,"amountHkd":"78341400.00","legalNames":["HHLR Advisors, Ltd."],"id":"cpp-sma-hhlra","name":"加拿大养老基金投资公司（HHLRA 管理专户）","type":"pension","label":"养老金专户","description":"HHLRA作为CPP Investments独立账户的投资管理人。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0625/2026062502076.pdf#page=6","contextSource":"https://www.cppinvestments.com/wp-content/uploads/2024/12/PVPGs-2024-Nov-2024-FINAL-SIMPLIFIED-CHINESE.pdf"}}},{"id":"cpf","name":"正大食品（Charoen Pokphand Foods）","type":"strategic","label":"产业投资","description":"泰国上市综合农牧食品集团（SET: CPF）。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0129/2026012900023.pdf","names":["Charoen Pokphand Foods Public Company Limited"]},{"id":"jsc-qizhi","name":"环泉启智","type":"asset_mgmt","label":"国资背景私募基金","description":"环泉启智（北京）股权投资基金间接全资持有认购载体；普通合伙人由北京金融控股集团控制。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1230/2025123000017.pdf#page=302","names":["JSC International Investment Fund SPC (acting for and on behalf of Qizhi SP)"]},{"id":"aspex-master","name":"Aspex Master Fund","type":"asset_mgmt","label":"香港管理的私募基金","description":"开曼基金，由获香港证监会第9类牌照的 Aspex Management (HK) Limited 全权管理。","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0203/12010169/2026020300037_c.pdf","names":["Aspex Master Fund","Aspex Management (HK) Limited"]},{"id":"qia-rayyan","name":"卡塔尔投资局","type":"sovereign","label":"主权投资机构","description":"Al-Rayyan Holding LLC 为卡塔尔投资局间接持有的投资载体。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0126/2026012600003.pdf#page=329","names":["Al-Rayyan Holding LLC"]},{"id":"blackrock-managed-03308","name":"贝莱德管理体系 · 联合获配","type":"international","label":"国际资产管理","description":"相关基金、机构或账户按该发行轮次合列。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=290","names":[],"exactAllocations":["offering:03308:2026-07-22:cornerstone:6"]},{"id":"blackrock-managed-07666","name":"贝莱德管理体系 · 联合获配","type":"international","label":"国际资产管理","description":"相关基金、机构或账户按该发行轮次合列。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0505/2026050500020_c.pdf#page=242","names":[],"exactAllocations":["offering:07666:2026-05-05:cornerstone:1"]},{"id":"tiger-global","name":"老虎环球基金（Tiger Global）","type":"asset_mgmt","label":"私募投资管理","description":"Internet Fund IIIA 的最终控股股东是 Tiger Global Singapore。","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0824/12295410/2026082400054.pdf#page=3","names":[],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0831/2026083102409.pdf#page=6","exactAllocations":["offering:00625:2026-08-24:cornerstone:2"],"exactAllocationProofs":{"offering:00625:2026-08-24:cornerstone:2":{"exactLabel":"Internet Fund IIIA","shares":8564400,"amountHkd":"415887264.00","legalNames":["Internet Fund IIIA Pte. Ltd."]}}},{"id":"general-atlantic","name":"泛大西洋投资集团（General Atlantic）","type":"asset_mgmt","label":"成长型私募投资","description":"General Atlantic 新加坡基金全资持有本轮签约载体。","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0824/12295410/2026082400054.pdf#page=3","names":[],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0831/2026083102409.pdf#page=6","exactAllocations":["offering:00625:2026-08-24:cornerstone:3"],"exactAllocationProofs":{"offering:00625:2026-08-24:cornerstone:3":{"exactLabel":"General Atlantic","shares":8079600,"amountHkd":"392345376.00","legalNames":["General Atlantic Singapore EDL Pte. Ltd."]}}},{"id":"jpm-imi-us","name":"摩根资产管理（美国）","type":"international","label":"国际资产管理","description":"J.P. Morgan Investment Management Inc. 为基金及独立委托账户提供投资管理。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0130/12005367/2026013000021.pdf","names":["J.P. Morgan Investment Management Inc."],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=289","exactAllocations":["offering:03308:2026-07-22:cornerstone:4"],"exactAllocationProofs":{"offering:03308:2026-07-22:cornerstone:4":{"exactLabel":"JPMIMI","shares":1212400,"amountHkd":"1188152000.00","legalNames":[]}}},{"id":"fidelity-hk","name":"富达国际（香港）","type":"international","label":"国际资产管理","description":"FIL Investment Management (Hong Kong) Limited 为富达国际的香港主体；资金及账户安排按各轮披露。","source":"https://www.sfc.hk/en/Regulatory-functions/Products/List-of-Eligible-Collective-Investment-Schemes-under-new-CIES","names":["FIL Investment Management (Hong Kong) Limited"],"contextSource":"https://www.fidelityinternational.com/legal/documents/FF2/HK-en/pr.ff2.HK-en.HK.pdf"},{"id":"yonggang-fairshore-swap","name":"江苏永钢（Aurora SF／Fairshore）","type":"swap","label":"产业资金 · 掉期安排","description":"江苏永钢为 Aurora SF 最终经济敞口客户；Fairshore 管理，OCBC 参与掉期。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1020/2026102000017.pdf#page=290","names":[],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1027/2026102701391.pdf#page=7","exactAllocations":["offering:02384:2026-10-20:cornerstone:1"],"exactAllocationProofs":{"offering:02384:2026-10-20:cornerstone:1":{"exactLabel":"Aurora SF","shares":13562000,"amountHkd":"1177181600.00","legalNames":["Aurora SF (sub-fund of EasternGate Investments VCC)"]}}},{"id":"adia","name":"阿布扎比投资局（ADIA）","type":"sovereign","label":"主权投资机构","description":"由阿布扎比政府设立的独立投资机构。","source":"https://www.adia.ae/en/investments/governance","names":["Abu Dhabi Investment Authority"]},{"id":"schroders","name":"施罗德投资","type":"international","label":"国际资产管理","description":"施罗德旗下香港和新加坡分别持牌的投管主体；联合获配保留两名法律主体及披露总量。","source":"https://api.schroders.com/document-store/SISF-PRS-SGEN-2025-04-08.pdf","contextSource":"https://www.schroders.com/en-hk/hk/institutional/about-us/schroders-in-hong-kong/","names":["Schroder Investment Management (Singapore) Ltd","Schroder Investment Management (Singapore) Limited","Schroder Investment Management (Hong Kong) Limited"]},{"id":"janchor","name":"Janchor Partners","type":"asset_mgmt","label":"私募资产管理","description":"Janchor Partners Limited 管理其泛亚洲基金；获配主体及管理身份逐笔保留。","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300005.pdf#page=188","names":["Janchor Partners Limited","Janchor Partners Pan-Asian Master Fund"]},{"id":"cpe-gof2","name":"CPE Global Opportunities Fund II","type":"asset_mgmt","label":"私募基金","description":"基金旗下认购载体单列；其报价和获配以各轮披露为准。","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300005.pdf#page=188","names":["CPE Rosewood Investment Limited","CPE Global Opportunities Fund II, L.P."]},{"id":"xiamen-advanced","name":"厦门先进制造业基金","type":"asset_mgmt","label":"国资背景产业基金","description":"厦门先进制造业股权投资基金全资持有本轮认购载体；普通合伙人包括厦门海翼投资。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0320/2026032000029.pdf#page=217","names":[],"exactAllocations":["offering:02726:2026-03-20:cornerstone:1"],"exactAllocationProofs":{"offering:02726:2026-03-20:cornerstone:1":{"exactLabel":"Xiamen Advanced Intelligent Manufacturing Industry Investment Limited","shares":10058500,"amountHkd":"767061210.00","legalNames":["Xiamen Advanced Intelligent Manufacturing Industry Investment Limited"]}}},{"id":"victory-giant","name":"胜宏科技","type":"strategic","label":"产业投资","description":"印制电路板企业（300476.SZ／02476.HK）；全资附属公司宏兴国际为本轮认购载体。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0129/2026012900019.pdf#page=319","contextSource":"https://static.cninfo.com.cn/finalpage/2026-05-18/1225314110.PDF","names":[],"exactAllocations":["offering:03200:2026-01-29:cornerstone:1"],"exactAllocationProofs":{"offering:03200:2026-01-29:cornerstone:1":{"exactLabel":"Hongxing International Technology Limited","shares":4884200,"amountHkd":"467906360.00","legalNames":["Hongxing International Technology Limited"]}}},{"id":"baillie-gifford","name":"柏基投资（Baillie Gifford）","type":"international","label":"国际资产管理","description":"英国持牌酌情管理机构，代表具名基金及投资信托参与；保留不同法律主体。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0824/2026082400017.pdf#page=248","names":["Baillie Gifford Overseas Limited","Baillie Gifford & Co"]},{"id":"ngs-super","name":"NGS Super","type":"pension","label":"澳洲养老金基金","description":"服务教育及社区从业者的澳洲退休金基金；NGS Super Pty Limited 为受托人。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0824/2026082400017.pdf#page=249","names":["NGS Super Pty Limited"],"exactAllocations":["offering:03308:2026-07-22:cornerstone:14"],"exactAllocationProofs":{"offering:03308:2026-07-22:cornerstone:14":{"exactLabel":"NGS Super Fund","shares":789850,"amountHkd":"774053000.00","legalNames":[]}}},{"id":"sinochem","name":"中国中化","type":"strategic","label":"国有产业集团","description":"中化香港是中国中化的全资境外投资控股平台；签约人为中化香港。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0129/2026012900024_c.pdf#page=342","names":[],"exactAllocations":["offering:02714:2026-01-29:cornerstone:4"],"exactAllocationProofs":{"offering:02714:2026-01-29:cornerstone:4":{"exactLabel":"Sinochem Hong Kong (Group) Company Limited","shares":12997400,"amountHkd":"506898600.00","legalNames":["Sinochem Hong Kong (Group) Company Limited"]}}},{"id":"yunfeng-capital","name":"云锋资本","type":"asset_mgmt","label":"私募股权投资","description":"New Alternative Limited 与 New Golden Future Limited 为云锋全资认购载体，逐轮保留获配主体。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300005.pdf","names":["New Alternative Limited","New Golden Future Limited"],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0130/2026013000007.pdf"},{"id":"yf-joint-03308","name":"云锋相关载体与 Interlux Fund","type":"asset_mgmt","label":"基金联合获配","description":"中际旭创以 YF Capital 同组披露：New Alternative Limited 由云锋全资拥有，Interlux Fund, L.P. 同列，按披露总金额列示。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=291","names":[],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0729/2026072901629.pdf#page=4","exactAllocations":["offering:03308:2026-07-22:cornerstone:7"],"exactAllocationProofs":{"offering:03308:2026-07-22:cornerstone:7":{"exactLabel":"YF Capital","shares":1184750,"amountHkd":"1161055000.00","legalNames":[]}}},{"id":"hao-advisors","name":"Hao 资产管理","type":"asset_mgmt","label":"私募资产管理","description":"Hao Capital Management Limited 为 Hao Great China Focus Fund 的投资管理人；香港持牌机构 Hao Advisors 为投资顾问。中际旭创同列 Hao Great China Focus Fund 与 Hao Fund I。","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0313/12050446/2026031300060.pdf#page=43","names":["Hao Great China Focus Fund"],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=296","exactAllocations":["offering:03308:2026-07-22:cornerstone:23"],"exactAllocationProofs":{"offering:03308:2026-07-22:cornerstone:23":{"exactLabel":"Hao Funds","shares":789850,"amountHkd":"774053000.00","legalNames":[]}}},{"id":"indus-capital","name":"Indus Capital Partners","type":"international","label":"国际资产管理","description":"独立亚太股票投资管理机构；Indus Select Master Fund 与 Vitruvius SICAV–Asian Equity 按各轮披露合列。","source":"https://www.induscap.com/","names":["Indus Select Master Fund, Ltd.","Vitruvius SICAV-Asian Equity"],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2021/0126/9597262/2021012600191.pdf","exactAllocations":["offering:03308:2026-07-22:cornerstone:12"],"exactAllocationProofs":{"offering:03308:2026-07-22:cornerstone:12":{"exactLabel":"Indus Funds","shares":789850,"amountHkd":"774053000.00","legalNames":[]}}},{"id":"alibaba-alisoft","name":"阿里巴巴集团（Alisoft）","type":"strategic","label":"产业投资","description":"阿里巴巴集团（09988.HK／BABA.US）旗下 Alisoft China Holding Limited 持有部分云计算业务实体，亦为本组获配主体。","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0930/2026093002173.pdf","names":["Alisoft China Holding Limited"],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2024/1016/11405812/2024101600043.pdf"},{"id":"deliante-tsai-family","name":"蔡衍明家族信托（Deliante）","type":"hk_family","label":"家族信托投资","description":"旺旺集团董事长蔡衍明设立家族信托，Deliante Holdings Co., Ltd. 为持有金融资产的投资载体。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300005.pdf","names":["Deliante Holdings Co., Ltd."]},{"id":"hans-cnc-mason","name":"大族数控（香港麦瑟）","type":"strategic","label":"产业投资","description":"大族数控（301200.SZ／03200.HK）的全资子公司香港麦瑟，经营印制电路板检测设备及零部件。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300005.pdf","names":["Hong Kong Mason Electronics Co., Ltd."]},{"id":"barings-hk","name":"霸菱资产管理（亚洲）","type":"international","label":"国际资产管理","description":"霸菱香港持牌投资管理主体，按实际获配逐宗列示。","source":"https://www.barings.com/globalassets/hong-kong-only/barings_firm_overview_en_hk.pdf","names":["Baring Asset Management (Asia) Limited"]},{"id":"aberdeen-asia","name":"安本投资（abrdn Asia）","type":"international","label":"国际资产管理","description":"新加坡注册的 Aberdeen Group 全资资产管理公司。","source":"https://www.aberdeeninvestments.com/docs?editionId=18ba1ac8-fafd-4e11-b285-57e763e8b55a","names":["abrdn Asia Limited"]},{"id":"bain-credit-03308","name":"贝恩资本信贷（BCC Asia Aggregator）","type":"international","label":"另类资产管理","description":"中际旭创披露的认购载体为 BCC Asia Aggregator, L.P.；Bain Capital Credit, LP 为投资顾问。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=293","names":[],"contextSource":"https://www.baincapitalcredit.com/about","exactAllocations":["offering:03308:2026-07-22:cornerstone:15"],"exactAllocationProofs":{"offering:03308:2026-07-22:cornerstone:15":{"exactLabel":"Bain Capital","shares":789850,"amountHkd":"774053000.00","legalNames":[]}}},{"id":"foresight-hk","name":"睿远基金（香港）","type":"asset_mgmt","label":"私募及公募基金管理","description":"披露的获配包括受管理的 SPC 独立投资组合和中国股票基金；各发行按公告的获配主体和合计金额列示。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300005.pdf","names":[],"contextSource":"https://www.sfc.hk/en/Regulatory-functions/Products/List-of-Eligible-Collective-Investment-Schemes-under-new-CIES","exactAllocations":["offering:02384:2026-10-20:cornerstone:7","offering:02475:2026-06-30:cornerstone:8","offering:06132:2026-06-12:cornerstone:1","offering:02476:2026-04-13:cornerstone:8","offering:01779:2026-05-28:cornerstone:7","offering:01779:2026-05-28:cornerstone:8","offering:01779:2026-05-28:cornerstone:9","offering:01779:2026-05-28:cornerstone:10"],"exactAllocationProofs":{"offering:02384:2026-10-20:cornerstone:7":{"exactLabel":"Foresight Funds","shares":2712400,"amountHkd":"235436320.00","legalNames":["Foresight Global Superior Choice SPC — Global Superior Choice Fund 1 SP","Foresight Global Superior Choice SPC — Vision Fund 1 SP","Foresight Global Superior Choice SPC — Vision Fund 3 SP","Foresight Global Superior Choice SPC — Horizon Fund 1 SP","Foresight Global Superior Choice SPC — Horizon Next Fund SP"]},"offering:02475:2026-06-30:cornerstone:8":{"exactLabel":"Foresight Funds","shares":8667800,"amountHkd":"548498384.00","legalNames":["Foresight Global Superior Choice SPC — Global Superior Choice Fund 1 SP","Foresight Global Superior Choice SPC — Vision Fund 1 SP","Foresight Global Superior Choice SPC — Horizon Fund 1 SP","Foresight Global Superior Choice SPC — Horizon Next Fund SP","Foresight China Equity Fund"]},"offering:06132:2026-06-12:cornerstone:1":{"exactLabel":"Foresight Funds","shares":2395400,"amountHkd":"195943720.00","legalNames":["Foresight Global Superior Choice SPC — Global Superior Choice Fund 1 SP","Foresight Global Superior Choice SPC — Vision Fund 1 SP","Foresight Global Superior Choice SPC — Horizon Fund 1 SP","Foresight Global Superior Choice SPC — Horizon Next Fund SP","Foresight International Series — Foresight China Equity Fund"]},"offering:02476:2026-04-13:cornerstone:8":{"exactLabel":"Foresight combined 3 portfolios","shares":1120300,"amountHkd":"235128564.00","legalNames":[]},"offering:01779:2026-05-28:cornerstone:7":{"exactLabel":"Foresight Global Superior Choice SPC — Vision Fund 1 SP","shares":474650,"amountHkd":"45594879.00","legalNames":["Foresight Global Superior Choice SPC"]},"offering:01779:2026-05-28:cornerstone:8":{"exactLabel":"Foresight Global Superior Choice SPC — Global Superior Choice Fund 1 SP","shares":258900,"amountHkd":"24869934.00","legalNames":["Foresight Global Superior Choice SPC"]},"offering:01779:2026-05-28:cornerstone:9":{"exactLabel":"Foresight Global Superior Choice SPC — Horizon Fund 1 SP","shares":40750,"amountHkd":"3914445.00","legalNames":["Foresight Global Superior Choice SPC"]},"offering:01779:2026-05-28:cornerstone:10":{"exactLabel":"Foresight Global Superior Choice SPC — Horizon Next Fund SP","shares":40750,"amountHkd":"3914445.00","legalNames":["Foresight Global Superior Choice SPC"]}}},{"id":"tairen-alpha","name":"Tairen Alpha Fund","type":"asset_mgmt","label":"私募投资基金","description":"开曼基金 Tairen Alpha Fund Limited，Tairen Capital Limited 担任管理人。","source":"https://reports.adviserinfo.sec.gov/reports/ADV/300911/PDF/300911.pdf","names":["Tairen Alpha Fund Limited"],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=296","exactAllocations":["offering:03308:2026-07-22:cornerstone:22"],"exactAllocationProofs":{"offering:03308:2026-07-22:cornerstone:22":{"exactLabel":"Tairen","shares":789850,"amountHkd":"774053000.00","legalNames":[]}}},{"id":"wellington-03308","name":"惠灵顿管理（Wellington）","type":"international","label":"国际资产管理","description":"美国注册投资顾问 Wellington Management Company LLP 在中际旭创一轮担任酌情投资顾问。","source":"https://www.wellington.com/en/legal/important-disclosure","names":[],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=292","exactAllocations":["offering:03308:2026-07-22:cornerstone:10"],"exactAllocationProofs":{"offering:03308:2026-07-22:cornerstone:10":{"exactLabel":"Wellington","shares":789850,"amountHkd":"774053000.00","legalNames":[]}}},{"id":"emerald-chuangke","name":"上海创客天地（Emerald Prime）","type":"asset_mgmt","label":"股权投资","description":"上海创客天地伊号企业发展中心（有限合伙）全资持有北京君正本轮认购载体 Emerald Prime Group Limited。","source":"https://di.hkex.com.hk/di/NSForm2.aspx?fn=CS20260903E00175","names":["Emerald Prime Group Limited"],"contextSource":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0824/2026082401907.pdf#page=6"},{"id":"blackrock-managed-09980","name":"贝莱德管理体系 · 东鹏饮料","type":"international","label":"国际资产管理","description":"东鹏饮料合计披露由贝莱德旗下机构酌情管理的基金和专户获配，各具名账户保留。","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0126/2026012600003.pdf","names":[],"contextSource":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0202/2026020203212.pdf#page=5","exactAllocations":["offering:09980:2026-01-26:cornerstone:4"],"exactAllocationProofs":{"offering:09980:2026-01-26:cornerstone:4":{"exactLabel":"BlackRock Funds","shares":1886300,"amountHkd":"467802400.00","legalNames":["Government Employees Pension Fund","National Pension Service, Republic of Korea","The 32 Capital Master Fund SPC Ltd.","Pan Asia Opportunities Master Fund Ltd.","BLACKROCK STRATEGIC FUNDS — BlackRock Systematic Asia Pacific Equity Absolute Return Fund","BlackRock Global Equity Market Neutral Fund of BlackRock Funds","Baldr Bayes Fund Inc.","BlackRock Systematic Total Alpha Master Fund Ltd.","EMN BNH Fund, LP","Global Alpha Opportunities Master Fund Ltd.","SAE Liquidity Fund LP","Emerging Markets Alpha Master Fund Ltd.","BlackRock Global Funds — Emerging Markets Equity Income Fund","BlackRock Global Funds — Emerging Markets Sustainable Equity Fund","BlackRock Global Funds — Emerging Markets Fund","BlackRock Emerging Markets Fund, Inc.","BlackRock Emerging Markets Collective Fund","BlackRock Emerging Markets Fund","BLACKROCK STRATEGIC FUNDS — BlackRock Systematic Global Equity Absolute Return Fund","Public Sector Pension Investment Board","BlackRock Systematic China Absolute Return Master Fund Ltd.","All China Opportunities Fund"]}}}];
const publicCornerstoneKey=s=>String(s||"").normalize("NFKC").toLowerCase().replace(/[.,，。]/g,"").replace(/\s+/g," ").trim();
const publicCornerstoneRegistryByName=new Map(publicCornerstoneRegistry.flatMap(e=>e.names.map(n=>[publicCornerstoneKey(n),e])));
const publicCornerstoneRegistryByAllocation=new Map(publicCornerstoneRegistry.flatMap(e=>(e.exactAllocations||[]).map(n=>[n,e])));
const cornerstoneManagerRole=/^(?:投資|投资|基金|酌情|簽約|签约|相關|相关|代表基金|主要|受委託|受委托|副投資|副投资).*(?:管理人|管理機構|管理机构|管理代理人)$/;
const verifiedCornerstoneBrandRows = {"offering:03308:2026-07-22:cornerstone:3":{"entity":"hhlra","label":"HHLRA","shares":2369550,"amount":"2322159000.00","bucket":"合计披露","detail":"HACF, L.P.；加拿大养老基金投资公司、阿布扎比投资局独立专户","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=289"},"offering:02475:2026-06-30:cornerstone:3":{"entity":"hhlra","label":"HHLRA (fund account)","shares":24765100,"amount":"1567135528.00","bucket":"管理基金","detail":"HACF, L.P.（招股书列名载体）","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000097.pdf#page=266"},"offering:02475:2026-06-30:cornerstone:4":{"entity":"hhlra","label":"HHLRA (CPP Investments SMA)","shares":1857300,"amount":"117529944.00","bucket":"独立专户","detail":"加拿大养老基金投资公司专户","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0708/2026070801342.pdf#page=6"},"offering:03661:2026-06-17:cornerstone:12":{"entity":"hhlra","label":"HHLRA (fund allocation)","shares":3586200,"amount":"305544240.00","bucket":"管理基金","detail":"HACF, L.P.（权益披露列名）","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0625/2026062502076.pdf#page=6"},"offering:03661:2026-06-17:cornerstone:13":{"entity":"hhlra","label":"HHLRA (CPP Investments SMA)","shares":919500,"amount":"78341400.00","bucket":"独立专户","detail":"加拿大养老基金投资公司专户","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0625/2026062502076.pdf#page=6"},"offering:03308:2026-07-22:cornerstone:6":{"entity":"blackrock-brand","label":"BlackRock","shares":1974600,"amount":"1935108000.00","bucket":"合计披露","detail":"贝莱德旗下投资管理子公司酌情管理的基金及独立专户","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=290"},"offering:07666:2026-05-05:cornerstone:1":{"entity":"blackrock-brand","label":"BlackRock","shares":37304500,"amount":"391697250.00","bucket":"合计披露","detail":"协议列名基金及机构包括英国矿工养老金、韩国国民年金及加拿大公共部门养老金投资委员会","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0505/2026050500020_c.pdf#page=383"},"offering:06880:2026-06-29:cornerstone:3":{"entity":"blackrock-brand","label":"BlackRock","shares":662680,"amount":"195888208.00","bucket":"合计披露","detail":"协议列名基金及机构包括 Future of Transport Fund、韩国国民年金及 Government Employees Pension Fund","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0629/2026062900057.pdf#page=424"},"offering:01879:2026-04-20:cornerstone:4":{"entity":"blackrock-brand","label":"BlackRock","shares":641355,"amount":"117496236.00","bucket":"合计披露","detail":"协议列名基金及机构包括 China Fund、加拿大公共部门养老金投资委员会及韩国国民年金","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0420/2026042000021.pdf"},"offering:01768:2026-01-20:cornerstone:3":{"entity":"blackrock-brand","label":"BlackRock","shares":1153000,"amount":"272799800.00","bucket":"合计披露","detail":"协议列名基金及机构包括 IBERCAJA EMERGENTES、China Fund 和韩国国民年金","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0120/2026012000025.pdf"},"offering:06715:2026-06-22:cornerstone:1":{"entity":"blackrock-brand","label":"BlackRock Funds","shares":3113300,"amount":"235054150.00","bucket":"合计披露","detail":"贝莱德旗下投资管理公司酌情管理的基金及独立专户","source":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0622/2026062200025.pdf#page=258"},"offering:09980:2026-01-26:cornerstone:4":{"entity":"blackrock-brand","label":"BlackRock Funds","shares":1886300,"amount":"467802400.00","bucket":"合计披露","detail":"贝莱德旗下投资管理公司酌情管理的基金及独立专户","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0126/2026012600003.pdf"},"offering:07666:2026-05-05:cornerstone:5":{"entity":"hhlra","label":"HHLRA","shares":5968500,"amount":"62669250.00","bucket":"管理基金","detail":"HHLR Advisors 代表开曼有限合伙基金认购","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0505/2026050500020_c.pdf#page=243"},"offering:01879:2026-04-20:cornerstone:9":{"entity":"hhlra","label":"HHLRA FUNDS","shares":427560,"amount":"78328992.00","bucket":"管理基金","detail":"HHLR Advisors 代表基金认购；招股书拟用载体 HACF, L.P.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0420/2026042000021.pdf"},"offering:01081:2026-05-28:cornerstone:2":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":2948200,"amount":"195760480.00","bucket":"管理基金","detail":"HHLR Advisors 代表基金认购；招股书拟用载体 HACF, L.P.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0528/2026052800019.pdf#page=205"},"offering:01081:2026-05-28:cornerstone:3":{"entity":"hhlra","label":"Hillhouse Investment Management, Ltd.","shares":2948200,"amount":"195760480.00","bucket":"管理基金","detail":"Hillhouse Investment Management 代表基金认购；招股书拟用载体 HH RSV-XVII Holdings Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0528/2026052800019.pdf#page=205"},"offering:06656:2026-04-08:cornerstone:4":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":338200,"amount":"109644440.00","bucket":"管理基金","detail":"HHLR Advisors 代表其管理的开曼有限合伙基金认购","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0408/2026040800017.pdf#page=218"},"offering:06656:2026-04-08:cornerstone:5":{"entity":"hhlra","label":"Hillhouse Investment Management, Ltd.","shares":169100,"amount":"54822220.00","bucket":"管理基金","detail":"Hillhouse Investment Management 代表其管理的开曼有限合伙基金认购","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0408/2026040800017.pdf#page=218"},"offering:01021:2026-03-20:cornerstone:1":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":13802400,"amount":"234640800.00","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购；招股书拟用载体 HACF, L.P.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0320/2026032000035.pdf#page=238"},"offering:03277:2026-04-09:cornerstone:2":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":2945900,"amount":"117482492.00","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购；招股书拟用载体 HACF, L.P.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0409/2026040900047.pdf#page=224"},"offering:02692:2026-02-27:cornerstone:1":{"entity":"hhlra","label":"HHLRA","shares":1644800,"amount":"117241344.00","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购；招股书拟用载体 HACF, L.P.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0227/2026022700016_c.pdf"},"offering:03200:2026-01-29:cornerstone:4":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":2035000,"amount":"194953000.00","bucket":"管理基金","detail":"HHLR Advisors 代表其管理的开曼有限合伙基金认购","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0129/2026012900019.pdf#page=320"},"offering:00668:2026-06-23:cornerstone:6":{"entity":"hhlra","label":"HACF, L.P.","shares":1577700,"amount":"156697164.00","bucket":"管理基金","detail":"HACF, L.P. 直接认购，由 HHLR Advisors 管理","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0623/2026062300037.pdf#page=212"},"offering:07688:2026-05-12:cornerstone:4":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":2969200,"amount":"78357188.00","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购；招股书拟用载体 HACF, L.P.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0512/2026051200017.pdf#page=226"},"offering:06106:2026-06-15:cornerstone:1":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":1156650,"amount":"117515640.00","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购；招股书拟用载体 HACF, L.P.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0615/2026061500013.pdf#page=265"},"offering:02476:2026-04-13:cornerstone:9":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":1120300,"amount":"235128564.00","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购；招股书拟用载体 HACF, L.P.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300005.pdf#page=189"},"offering:01377:2026-06-30:cornerstone:2":{"entity":"hhlra","label":"HHLR ADVISORS, LTD.","shares":618600,"amount":"235068000.00","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000041.pdf#page=256"},"offering:02249:2026-06-30:cornerstone:12":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":3639400,"amount":"117552620.00","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000123.pdf#page=234"},"offering:00537:2026-06-30:cornerstone:1":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":4261300,"amount":"195934574.00","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购；招股书拟用载体 HACF, L.P.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000023.pdf#page=221"},"offering:09630:2026-06-17:cornerstone:9":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":371950,"amount":"94002923.50","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0617/2026061700039.pdf#page=225"},"offering:09981:2026-02-05:cornerstone:1":{"entity":"hhlra","label":"HHLR Advisors, Ltd.","shares":9703000,"amount":"194933270.00","bucket":"管理基金","detail":"HHLR Advisors 代表管理基金认购","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0205/2026020500055.pdf#page=219"},"offering:03308:2026-07-22:cornerstone:8":{"entity":"aspex-master","label":"Aspex","shares":1184750,"amount":"1161055000.00","bucket":"管理基金","detail":"Aspex Master Fund 签约认购；Aspex Management (HK) Limited 管理","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=291"},"offering:01377:2026-06-30:cornerstone:3":{"entity":"aspex-master","label":"ASPEX MASTER FUND","shares":618600,"amount":"235068000.00","bucket":"管理基金","detail":"Aspex Master Fund 签约认购；Aspex Management (HK) Limited 管理","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000041.pdf#page=257"},"offering:00668:2026-06-23:cornerstone:2":{"entity":"aspex-master","label":"Aspex Master Fund","shares":3944400,"amount":"391757808.00","bucket":"管理基金","detail":"Aspex Master Fund 签约认购；Aspex Management (HK) Limited 管理","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0623/2026062300037.pdf#page=211"},"offering:01879:2026-04-20:cornerstone:12":{"entity":"aspex-master","label":"Aspex","shares":427560,"amount":"78328992.00","bucket":"管理基金","detail":"Aspex Master Fund 签约认购；Aspex Management (HK) Limited 管理","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0420/2026042000021.pdf#page=237"},"offering:00470:2026-02-03:cornerstone:3":{"entity":"aspex-master","label":"Aspex Master Fund","shares":17020700,"amount":"779548060.00","bucket":"管理基金","detail":"Aspex Master Fund 签约认购；Aspex Management (HK) Limited 管理","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0203/2026020300009.pdf#page=355"},"offering:06809:2026-01-30:cornerstone:6":{"entity":"aspex-master","label":"Aspex Master Fund","shares":3064000,"amount":"327510960.00","bucket":"管理基金","detail":"Aspex Master Fund 签约认购；Aspex Management (HK) Limited 管理","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0130/2026013000007.pdf#page=265"},"offering:00100:2025-12-31:cornerstone:3":{"entity":"aspex-master","label":"Aspex Master Fund","shares":1650400,"amount":"272316000.00","bucket":"管理基金","detail":"Aspex Master Fund 签约认购；Aspex Management (HK) Limited 管理","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1231/2025123100025.pdf#page=395"},"offering:06082:2025-12-22:cornerstone:4":{"entity":"aspex-master","label":"Aspex Master Fund","shares":11913600,"amount":"233506560.00","bucket":"管理基金","detail":"Aspex Master Fund 签约认购；Aspex Management (HK) Limited 管理","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1222/2025122200019.pdf#page=344"},"offering:02384:2026-10-20:cornerstone:3":{"entity":"jpm-am-brand","label":"JPMAMAPL","shares":6781000,"amount":"588590800.00","bucket":"合计披露","detail":"JPMorgan Asset Management (Asia Pacific) Limited · 代表所管理的基金及账户","legalName":"JPMorgan Asset Management (Asia Pacific) Limited","accounts":["JPMorgan China Pioneer A-Share Fund","JPMorgan China A-Share Opportunities Fund","JPMorgan Funds – China A-Share Opportunities Fund","JPMorgan China Growth and Income PLC","JPMorgan Funds – China Fund","JPMorgan Funds – Greater China Fund","JPMorgan SAR Greater China Fund"],"otherMandates":true,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1020/2026102000017.pdf#page=291"},"offering:03228:2026-09-21:cornerstone:13":{"entity":"jpm-am-brand","label":"JPMAMAPL","shares":561100,"amount":"39209668.00","bucket":"合计披露","detail":"JPMorgan Asset Management (Asia Pacific) Limited · 代表所管理的基金及账户","legalName":"JPMorgan Asset Management (Asia Pacific) Limited","accounts":["JPMorgan China Growth and Income PLC"],"otherMandates":true,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0921/2026092100035.pdf#page=207"},"offering:03308:2026-07-22:cornerstone:4":{"entity":"jpm-am-brand","label":"JPMIMI","shares":1212400,"amount":"1188152000.00","bucket":"合计披露","detail":"J.P. Morgan Investment Management Inc. · 代表所管理的基金及账户","legalName":"J.P. Morgan Investment Management Inc.","accounts":["JP Morgan Chase Retirement Plan – GEM Discovery","JPM Emerging Markets Equity Fund (US Mutual Fund)","JPM Emerging Markets Equity Fund (Lux SICAV Fund)","JPM Emerging Markets Fund"],"otherMandates":true,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=289"},"offering:03308:2026-07-22:cornerstone:5":{"entity":"jpm-am-brand","label":"JPMAMAPL","shares":762200,"amount":"746956000.00","bucket":"合计披露","detail":"JPMorgan Asset Management (Asia Pacific) Limited · 代表所管理的基金及账户","legalName":"JPMorgan Asset Management (Asia Pacific) Limited","accounts":["JPMorgan China Pioneer A-Share Fund","JPMorgan China A-Share Opportunities Fund","JPMorgan Funds – China A-Share Opportunities Fund","JPMorgan China Growth and Income PLC","JPMorgan Funds – China Fund"],"otherMandates":true,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=290"},"offering:06951:2026-06-30:cornerstone:2":{"entity":"jpm-am-brand","label":"JPMorgan Asset Management (Asia Pacific) Limited","shares":3906700,"amount":"391842010.00","bucket":"合计披露","detail":"JPMorgan Asset Management (Asia Pacific) Limited · 代表所管理的基金及账户","legalName":"JPMorgan Asset Management (Asia Pacific) Limited","accounts":["JPMorgan Funds-China A-share Opportunities","JPMorgan China Pioneer A-share Funds","JPMorgan China A-share Opportunities","JPMorgan Funds – China Fund","JPMorgan China Growth and Income"],"otherMandates":true,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000323.pdf#page=267"},"offering:07687:2026-06-29:cornerstone:4":{"entity":"jpm-am-brand","label":"JPMorgan Asset Management (Asia Pacific) Limited","shares":2228050,"amount":"195890156.00","bucket":"合计披露","detail":"JPMorgan Asset Management (Asia Pacific) Limited · 代表所管理的基金及账户","legalName":"JPMorgan Asset Management (Asia Pacific) Limited","accounts":["JPMorgan China","JPMorgan China Growth and Income","JPMorgan Asian Smaller Companies Fund","JPMorgan Asia Growth and Income PLC"],"otherMandates":true,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0629/2026062900135.pdf#page=261"},"offering:09630:2026-06-17:cornerstone:4":{"entity":"jpm-am-brand","label":"JPMorgan Asset Management (Asia Pacific) Limited","shares":619950,"amount":"156679963.50","bucket":"管理基金","detail":"JPMorgan Asset Management (Asia Pacific) Limited · 代表所管理的基金","legalName":"JPMorgan Asset Management (Asia Pacific) Limited","accounts":["JPMorgan Funds-China A share Opportunities","JPMorgan China Pioneer-A","JPMorgan China A share Opportunities"],"otherMandates":false,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0617/2026061700039.pdf#page=222"},"offering:03661:2026-06-17:cornerstone:2":{"entity":"jpm-am-brand","label":"JPMorgan Asset Management (Asia Pacific) Limited","shares":4505700,"amount":"383885640.00","bucket":"合计披露","detail":"JPMorgan Asset Management (Asia Pacific) Limited · 代表所管理的基金及账户","legalName":"JPMorgan Asset Management (Asia Pacific) Limited","accounts":["JPMorgan Funds-China A-share Opportunities","JPMorgan China Pioneer A-share Funds","JPMorgan China A-share Opportunities","JPMorgan Funds – China Fund","JPMorgan China Growth and Income"],"otherMandates":true,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0617/2026061700041.pdf#page=250"},"offering:03296:2026-04-15:cornerstone:1":{"entity":"jpm-am-brand","label":"JPMAMAPL","shares":6858800,"amount":"532928760.00","bucket":"合计披露","detail":"JPMorgan Asset Management (Asia Pacific) Limited · 代表所管理的基金及账户","legalName":"JPMorgan Asset Management (Asia Pacific) Limited","accounts":["JPMorgan Funds-China A-Share Opportunities Fund","JPMorgan Funds – China Fund","JPMorgan Asia Equity Dividend Fund","JPMorgan Asia Equity High Income","JPMorgan China Pioneer A-Share Fund","JPMorgan Funds – Asia Pacific Income Fund","JPMorgan China Growth and Income PLC"],"otherMandates":true,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0415/2026041500011.pdf#page=271"},"offering:06809:2026-01-30:cornerstone:1":{"entity":"jpm-am-brand","label":"J.P. Morgan Investment Management Inc.","shares":4814800,"amount":"514653972.00","bucket":"合计披露","detail":"J.P. Morgan Investment Management Inc. · 代表所管理的基金及账户","legalName":"J.P. Morgan Investment Management Inc.","accounts":["JPMorgan Funds – Emerging Markets Opportunities Fund","JPMorgan Funds – Emerging Markets Equity Fund","JPMorgan Emerging Markets Equity Fund","JPMorgan Fund ICVC – JPM Emerging Markets Fund","Global Emerging Markets Discovery Fund, LLC"],"otherMandates":true,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0130/2026013000007.pdf#page=263"},"offering:09980:2026-01-26:cornerstone:8":{"entity":"jpm-am-brand","label":"JPMorgan Asset Management (Asia Pacific) Limited","shares":943100,"amount":"233888800.00","bucket":"合计披露","detail":"JPMorgan Asset Management (Asia Pacific) Limited · 代表所管理的基金及账户","legalName":"JPMorgan Asset Management (Asia Pacific) Limited","accounts":["JPMorgan China Pioneer A-Share Fund","JPMorgan China A-Share Opportunities Fund","JPMorgan Funds – China A-Share Opportunities Fund"],"otherMandates":true,"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0126/2026012600003.pdf#page=332"},"offering:03308:2026-07-22:cornerstone:1":{"entity":"temasek","label":"Taibai","shares":1895650,"amount":"1857737000.00","bucket":"全资投资载体","detail":"Taibai Investments Pte. Ltd. 签约认购；淡马锡间接全资持有","legalName":"Taibai Investments Pte. Ltd.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=288"},"offering:06951:2026-06-30:cornerstone:1":{"entity":"temasek","label":"Temasek","shares":3906700,"amount":"391842010.00","bucket":"全资投资载体","detail":"Taibai Investments Pte. Ltd. 签约认购；淡马锡间接全资持有","legalName":"Taibai Investments Pte. Ltd.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000323.pdf#page=267"},"offering:02475:2026-06-30:cornerstone:1":{"entity":"temasek","label":"Taibai Investments Pte. Ltd.","shares":19812100,"amount":"1253709688.00","bucket":"全资投资载体","detail":"Taibai Investments Pte. Ltd. 签约认购；淡马锡间接全资持有","legalName":"Taibai Investments Pte. Ltd.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000097.pdf#page=265"},"offering:01879:2026-04-20:cornerstone:7":{"entity":"temasek","label":"Temasek","shares":641355,"amount":"117496236.00","bucket":"全资投资载体","detail":"Taibai Investments Pte. Ltd. 签约认购；淡马锡间接全资持有","legalName":"Taibai Investments Pte. Ltd.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0420/2026042000021.pdf#page=236"},"offering:09980:2026-01-26:cornerstone:2":{"entity":"temasek","label":"Taibai Investments Pte. Ltd.","shares":1760600,"amount":"436628800.00","bucket":"全资投资载体","detail":"Taibai Investments Pte. Ltd. 签约认购；淡马锡间接全资持有","legalName":"Taibai Investments Pte. Ltd.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0126/2026012600003.pdf#page=329"},"offering:01768:2026-01-20:cornerstone:2":{"entity":"temasek","label":"Temasek","shares":1482400,"amount":"350735840.00","bucket":"全资投资载体","detail":"Taibai Investments Pte. Ltd. 签约认购；淡马锡间接全资持有","legalName":"Taibai Investments Pte. Ltd.","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0120/2026012000025.pdf#page=339"},"offering:02384:2026-10-20:cornerstone:5":{"entity":"cpe-gof2","label":"CPE Bodhi","shares":3435700,"amount":"298218760.00","bucket":"Global Opportunities Fund II","detail":"CPE Bodhi Investment Limited 签约认购；基金控制","legalName":"CPE Bodhi Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1020/2026102000017.pdf#page=291"},"offering:03228:2026-09-21:cornerstone:1":{"entity":"cpe-gof2","label":"CPE Redwood","shares":5611100,"amount":"392103668.00","bucket":"Global Opportunities Fund II","detail":"CPE Redwood Investment Limited 签约认购；基金控制","legalName":"CPE Redwood Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0921/2026092100035.pdf#page=204"},"offering:03308:2026-07-22:cornerstone:16":{"entity":"cpe-gof2","label":"CPE","shares":789850,"amount":"774053000.00","bucket":"Global Opportunities Fund II","detail":"CPE Hawthorn Investment Limited 签约认购；基金控制","legalName":"CPE Hawthorn Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=294"},"offering:06951:2026-06-30:cornerstone:3":{"entity":"cpe-gof2","label":"CPE River Investment Limited","shares":3906700,"amount":"391842010.00","bucket":"Global Opportunities Fund II","detail":"CPE River Investment Limited 签约认购；基金附属公司","legalName":"CPE River Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000323.pdf#page=267"},"offering:02475:2026-06-30:cornerstone:6":{"entity":"cpe-gof2","label":"CPE Neem Investment Limited","shares":9286900,"amount":"587675032.00","bucket":"Global Opportunities Fund II","detail":"CPE Neem Investment Limited 签约认购；基金附属公司","legalName":"CPE Neem Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000097.pdf#page=266"},"offering:01377:2026-06-30:cornerstone:5":{"entity":"cpe-gof2","label":"CPE INVESTMENT XV LIMITED","shares":412400,"amount":"156712000.00","bucket":"Global Opportunities Fund II","detail":"CPE Investment XV Limited 签约认购；基金附属公司","legalName":"CPE Investment XV Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000041.pdf#page=257"},"offering:00537:2026-06-30:cornerstone:2":{"entity":"cpe-gof2","label":"CPE Hemlock Investment Limited","shares":2130600,"amount":"97964988.00","bucket":"Global Opportunities Fund II","detail":"CPE Hemlock Investment Limited 签约认购；基金附属公司","legalName":"CPE Hemlock Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000023.pdf#page=223"},"offering:09630:2026-06-17:cornerstone:6":{"entity":"cpe-gof2","label":"CPE Chestnut Investment Limited","shares":557950,"amount":"141010703.50","bucket":"Global Opportunities Fund II","detail":"CPE Chestnut Investment Limited 签约认购；基金附属公司","legalName":"CPE Chestnut Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0617/2026061700039.pdf#page=222"},"offering:03661:2026-06-17:cornerstone:3":{"entity":"cpe-gof2","label":"CPE Ginkgo Investment Limited","shares":3494200,"amount":"297705840.00","bucket":"Global Opportunities Fund II","detail":"CPE Ginkgo Investment Limited 签约认购；基金附属公司","legalName":"CPE Ginkgo Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0617/2026061700041.pdf#page=250"},"offering:01081:2026-05-28:cornerstone:4":{"entity":"cpe-gof2","label":"CPE Juniper Investment Limited","shares":4716000,"amount":"313142400.00","bucket":"Global Opportunities Fund II","detail":"CPE Juniper Investment Limited 签约认购；基金附属公司","legalName":"CPE Juniper Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0528/2026052800019.pdf#page=206"},"offering:02476:2026-04-13:cornerstone:1":{"entity":"cpe-gof2","label":"CPE Rosewood Investment Limited","shares":2800700,"amount":"587810916.00","bucket":"Global Opportunities Fund II","detail":"CPE Rosewood Investment Limited 签约认购；基金附属公司","legalName":"CPE Rosewood Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300005.pdf#page=187"},"offering:03277:2026-04-09:cornerstone:1":{"entity":"cpe-gof2","label":"CPE Peepal Investment Limited","shares":2945900,"amount":"117482492.00","bucket":"Global Opportunities Fund II","detail":"CPE Peepal Investment Limited 签约认购；基金附属公司","legalName":"CPE Peepal Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0409/2026040900047.pdf#page=224"},"offering:06656:2026-04-08:cornerstone:8":{"entity":"cpe-gof2","label":"CPE Energy Investment Limited","shares":362300,"amount":"117457660.00","bucket":"Global Opportunities Fund II","detail":"CPE Energy Investment Limited 签约认购；基金附属公司","legalName":"CPE Energy Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0408/2026040800017.pdf#page=219"},"offering:02636:2026-10-07:cornerstone:1":{"entity":"gic","label":"GIC","shares":3777000,"amount":"133328100.00","bucket":"储备管理机构","detail":"GIC Private Limited 签约认购","legalName":"GIC Private Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1007/2026100700007.pdf#page=224"},"offering:02475:2026-06-30:cornerstone:5":{"entity":"gic","label":"GIC Private Limited","shares":18573800,"amount":"1175350064.00","bucket":"储备管理机构","detail":"GIC Private Limited 签约认购","legalName":"GIC Private Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000097.pdf#page=266"},"offering:06880:2026-06-29:cornerstone:1":{"entity":"gic","label":"GIC","shares":2650760,"amount":"783564656.00","bucket":"储备管理机构","detail":"GIC Private Limited 签约认购","legalName":"GIC Private Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0629/2026062900057.pdf#page=246"},"offering:09637:2026-06-18:cornerstone:1":{"entity":"gic","label":"GIC Private Limited","shares":7627200,"amount":"172374720.00","bucket":"储备管理机构","detail":"GIC Private Limited 签约认购","legalName":"GIC Private Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0618/2026061800025.pdf#page=248"},"offering:03661:2026-06-17:cornerstone:1":{"entity":"gic","label":"GIC Private Limited","shares":4597700,"amount":"391724040.00","bucket":"储备管理机构","detail":"GIC Private Limited 签约认购","legalName":"GIC Private Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0617/2026061700041.pdf#page=249"},"offering:01081:2026-05-28:cornerstone:1":{"entity":"gic","label":"GIC Private Limited","shares":9434400,"amount":"626444160.00","bucket":"储备管理机构","detail":"GIC Private Limited 签约认购","legalName":"GIC Private Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0528/2026052800019.pdf#page=205"},"offering:01879:2026-04-20:cornerstone:2":{"entity":"gic","label":"GIC","shares":855135,"amount":"156660732.00","bucket":"储备管理机构","detail":"GIC Private Limited 签约认购","legalName":"GIC Private Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0420/2026042000021.pdf#page=234"},"offering:03200:2026-01-29:cornerstone:2":{"entity":"gic","label":"GIC Private Limited","shares":7326300,"amount":"701859540.00","bucket":"储备管理机构","detail":"GIC Private Limited 签约认购","legalName":"GIC Private Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0129/2026012900019.pdf#page=319"},"offering:03308:2026-07-22:cornerstone:9":{"entity":"adia","label":"ADIA","shares":789850,"amount":"774053000.00","bucket":"直接认购","detail":"阿布扎比投资局直接签约认购","legalName":"Abu Dhabi Investment Authority","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=291"},"offering:02475:2026-06-30:cornerstone:9":{"entity":"adia","label":"Abu Dhabi Investment Authority","shares":5572100,"amount":"352602488.00","bucket":"直接认购","detail":"阿布扎比投资局直接签约认购","legalName":"Abu Dhabi Investment Authority","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000097.pdf#page=267"},"offering:00100:2025-12-31:cornerstone:1":{"entity":"adia","label":"Abu Dhabi Investment Authority","shares":3065040,"amount":"505731600.00","bucket":"直接认购","detail":"阿布扎比投资局直接签约认购","legalName":"Abu Dhabi Investment Authority","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1231/2025123100025.pdf#page=395"},"offering:02675:2025-12-30:cornerstone:1":{"entity":"adia","label":"Abu Dhabi Investment Authority","shares":2699000,"amount":"116704760.00","bucket":"直接认购","detail":"阿布扎比投资局直接签约认购","legalName":"Abu Dhabi Investment Authority","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1230/2025123000029.pdf#page=501"},"offering:09980:2026-01-26:cornerstone:1":{"entity":"qia-rayyan","label":"Al-Rayyan Holding LLC","shares":4715900,"amount":"1169543200.00","bucket":"全资投资载体","detail":"Al-Rayyan Holding LLC 签约认购；卡塔尔投资局间接全资持有","legalName":"Al-Rayyan Holding LLC","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0126/2026012600003.pdf#page=329"},"offering:03308:2026-07-22:cornerstone:24":{"entity":"janchor","label":"Janchor Funds","shares":789850,"amount":"774053000.00","bucket":"合计披露","detail":"Janchor Partners Limited 管理；两只基金合计获配","legalNames":["Janchor Partners Pan-Asian Master Fund","Janchor Industrialist Investing Master Fund"],"accounts":["Janchor Partners Pan-Asian Master Fund","Janchor Industrialist Investing Master Fund"],"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=296"},"offering:02476:2026-04-13:cornerstone:2":{"entity":"janchor","label":"Janchor Partners Pan-Asian Master Fund","shares":2800700,"amount":"587810916.00","bucket":"管理基金","detail":"Janchor Partners Limited 管理；Janchor Partners Pan-Asian Master Fund 认购","legalNames":["Janchor Partners Pan-Asian Master Fund"],"accounts":[],"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0413/2026041300005.pdf#page=188"},"offering:06809:2026-01-30:cornerstone:7":{"entity":"janchor","label":"Janchor Partners Pan-Asian Master Fund","shares":3064000,"amount":"327510960.00","bucket":"管理基金","detail":"Janchor Partners Limited 管理；Janchor Partners Pan-Asian Master Fund 认购","legalNames":["Janchor Partners Pan-Asian Master Fund"],"accounts":[],"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0130/2026013000007.pdf#page=265"},"offering:00100:2025-12-31:cornerstone:9":{"entity":"janchor","label":"Janchor Partners Pan-Asian Master Fund and Janchor Partners Opportunities Master Fund III","shares":1650400,"amount":"272316000.00","bucket":"合计披露","detail":"Janchor Partners Limited 管理；两只基金合计获配","legalNames":["Janchor Partners Pan-Asian Master Fund","Janchor Partners Opportunities Master Fund III"],"accounts":["Janchor Partners Pan-Asian Master Fund","Janchor Partners Opportunities Master Fund III"],"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1231/2025123100025.pdf#page=397"},"offering:01256:2026-09-28:cornerstone:5":{"entity":"gba-homeland","label":"GBAHIL — Mega Prime","shares":37962000,"amount":"58841100.00","bucket":"管理基金","detail":"大湾区共同家园投资经全资链持有 Mega Prime；由大湾区发展基金管理酌情管理","legalNames":["Mega Prime Development Limited"],"accounts":[],"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0928/2026092800035.pdf#page=246"},"offering:01256:2026-09-28:cornerstone:6":{"entity":"gba-homeland","label":"GBAHIL — Poly Platinum","shares":37962000,"amount":"58841100.00","bucket":"管理基金","detail":"Poly Platinum 由大湾区共同家园发展基金控制；大湾区发展基金管理酌情管理","legalNames":["Poly Platinum Enterprises Limited"],"accounts":[],"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0928/2026092800035.pdf#page=246"},"offering:09856:2026-09-14:cornerstone:2":{"entity":"gba-homeland","label":"Mega Prime","shares":3568100,"amount":"117604576.00","bucket":"管理基金","detail":"大湾区共同家园投资经全资链持有 Mega Prime；由大湾区发展基金管理酌情管理","legalNames":["Mega Prime Development Limited"],"accounts":[],"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0914/2026091400007.pdf#page=284"},"offering:09856:2026-09-14:cornerstone:3":{"entity":"gba-homeland","label":"Poly Platinum","shares":3568100,"amount":"117604576.00","bucket":"管理基金","detail":"Poly Platinum 由大湾区共同家园发展基金控制；由大湾区发展基金管理管理","legalNames":["Poly Platinum Enterprises Limited"],"accounts":[],"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0914/2026091400007.pdf#page=284"},"offering:03388:2026-05-20:cornerstone:6":{"entity":"gba-homeland","label":"Greater Bay Area Homeland Investments Limited","shares":2081700,"amount":"39135960.00","bucket":"合计披露","detail":"Mega Prime 与 GIGA 由 GBA Homeland Limited 全资持有；Poly Platinum 由大湾区共同家园发展基金控制","legalNames":["Mega Prime Development Limited","Poly Platinum Enterprises Limited","GIGA Industries Limited"],"accounts":["Mega Prime Development Limited","Poly Platinum Enterprises Limited","GIGA Industries Limited"],"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0520/2026052000023.pdf#page=274"},"offering:01879:2026-04-20:cornerstone:13":{"entity":"cpe-gof2","label":"CPE Fir","shares":213780,"amount":"39164496.00","bucket":"集团控制载体","detail":"CPE Investment Holdings Limited 控制；其唯一股东为 CPE Management International Limited","legalName":"CPE Fir Investment Limited","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0420/2026042000021.pdf#page=237"},"offering:03388:2026-05-20:cornerstone:3":{"entity":"cpe-gof2","label":"CPE Greater China Enterprises Growth Fund","shares":4163550,"amount":"78274740.00","bucket":"大中华成长基金","detail":"源峰基金管理有限公司（China Pinnacle Equity Management Limited）管理并控制基金表决权","legalName":"CPE Greater China Enterprises Growth Fund","source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0520/2026052000023.pdf#page=273"}};
const verifiedCornerstoneBrands = {
 "gba-homeland":{id:"gba-homeland",name:"大湾区共同家园投资",type:"asset_mgmt",label:"产业投资与基金管理",names:["Greater Bay Area Homeland Investments Limited","GBAHIL","Mega Prime Development Limited","Poly Platinum Enterprises Limited","GIGA Industries Limited"],
  description:"集团通过不同投资载体参与。Mega Prime 与 GIGA 经全资子公司持有；Poly Platinum 由大湾区共同家园发展基金控制。以下是逐宗已核实的获配。",
  source:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0520/2026052000023.pdf#page=274",contextSource:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0520/2026052000023.pdf#page=508"},

 janchor:{id:"janchor",name:"Janchor Partners",type:"asset_mgmt",label:"香港私募资产管理",names:["Janchor Partners Limited","Janchor Partners Pan-Asian Master Fund","Janchor Industrialist Investing Master Fund","Janchor Partners Opportunities Master Fund III"],
  description:"由 John Ho 创办及控制的香港持牌资产管理机构。各宗列示由其管理的签约基金；同组披露保留配发公告的合计金额。",
  source:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=296"},

 adia:{id:"adia",name:"阿布扎比投资局（ADIA）",type:"sovereign",label:"主权投资机构",names:["Abu Dhabi Investment Authority","ADIA","阿布扎比投资局"],
  description:"阿布扎比政府设立的投资机构。以下金额为直接签约获配；中际旭创招股书另列高瓴管理的 ADIA 专户，配发公告按高瓴合计披露。",
  source:"https://www.adia.ae/en/investments/governance",contextSource:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=289"},
 "qia-rayyan":{id:"qia-rayyan",name:"卡塔尔投资局（QIA）",type:"sovereign",label:"主权财富基金",names:["Qatar Investment Authority","Al-Rayyan Holding LLC","卡塔尔投资局"],
  description:"卡塔尔主权财富基金。东鹏饮料的签约载体 Al-Rayyan Holding LLC 由卡塔尔投资局间接全资持有。",
  source:"https://www.qia.qa/en/About/pages/default.aspx",contextSource:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0126/2026012600003.pdf#page=329"},

 gic:{id:"gic",name:"GIC（新加坡政府投资公司）",type:"sovereign",label:"主权储备管理机构",names:["GIC Private Limited","GIC","新加坡政府投资公司"],
  description:"新加坡政府全资持有，受托投资和管理新加坡外汇储备。下列获配按 GIC Private Limited 在各宗发行的签约记录列示。",
  source:"https://www.gic.com.sg/who-we-are/faqs/"},

 "cpe-gof2":{id:"cpe-gof2",name:"CPE 源峰",type:"asset_mgmt",label:"私募资产管理",names:["CPE 源峰","CPE Global Opportunities Fund II, L.P.","CPE GOF II","CPE Management International Limited","China Pinnacle Equity Management Limited","源峰基金管理有限公司"],
  description:"按基金和签约载体分列。Global Opportunities Fund II 的普通合伙人由 CPE Management International Limited 全资持有；大中华成长基金另由源峰基金管理有限公司管理。",
  source:"https://www.cpe-fund.com/abt_firm.html",contextSource:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=294"},

 temasek:{id:"temasek",name:"淡马锡",type:"sovereign",label:"政府全资投资公司",names:["Temasek Holdings (Private) Limited","Taibai Investments Pte. Ltd.","淡马锡"],
  description:"新加坡政府全资持有的投资公司。下列项目均由淡马锡间接全资持有的太白投资（Taibai Investments Pte. Ltd.）认购。",
  source:"https://www.temasek.com.sg/en/about-us/faqs",contextSource:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=288"},

 "jpm-am-brand":{id:"jpm-am-brand",name:"摩根资产管理",type:"international",label:"国际资产管理",names:["J.P. Morgan Investment Management Inc.","JPMorgan Asset Management (Asia Pacific) Limited","JPMIMI","JPMAMAPL","J.P. Morgan Asset Management"],
  description:"摩根大通集团的资产管理品牌。美国与亚太管理实体代表不同基金及受托账户签约，按每笔配发分别列示。",
  source:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=290"},

 "aspex-master":{id:"aspex-master",name:"Aspex Master Fund",type:"asset_mgmt",label:"香港管理的私募基金",names:["Aspex Master Fund","Aspex Management (HK) Limited"],
  description:"开曼注册基金，由香港持牌机构 Aspex Management (HK) Limited 管理。招股书披露，Li Ho Kei 经持股实体最终持有管理公司，并控制基金表决权。",
  source:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=291"},

 hhlra:{id:"hhlra",name:"高瓴",type:"asset_mgmt",label:"基金及专户管理",names:["HHLR Advisors, Ltd.","Hillhouse Investment Management, Ltd.","HACF, L.P.","高瓴"],
  description:"HHLR Advisors 与 Hillhouse Investment Management 由同一方控制。以下按每宗获配的基金、专户或合计披露金额列示。",
  source:"https://www.sec.gov/Archives/edgar/data/1762304/000091957426003551/xslForm13F_X01/primary_doc.xml",
  contextSource:"https://reports.adviserinfo.sec.gov/reports/ADV/166112/PDF/166112.pdf"},
 "blackrock-brand":{id:"blackrock-brand",name:"贝莱德",type:"international",label:"国际资产管理",names:["BlackRock, Inc.","BlackRock Funds","贝莱德"],
  description:"旗下投资管理公司代表基金及客户专户管理。逐宗列示配发公告的合计与招股文件中列名的参与方。",
  source:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=290"}
};
function cornerstoneBrandProof(a){
 const v=verifiedCornerstoneBrandRows[a?.id];
 return v&&a.label===v.label&&a.quantity===v.shares&&a.amountHkd===v.amount?v:null;
}
function cornerstoneAllocationIdentity(a){
 const brand=cornerstoneBrandProof(a);
 if(brand)return verifiedCornerstoneBrands[brand.entity];
 const exact=publicCornerstoneRegistryByAllocation.get(a.id);
 if(exact){
  if(["jpm-imi-us","jpm-am-ap","temasek"].includes(exact.id))return null;
  const proof=exact.exactAllocationProofs?.[a.id];
  if(!proof)return exact;
  return a.label===proof.exactLabel&&a.quantity===proof.shares&&a.amountHkd===proof.amountHkd&&
   JSON.stringify(a.legalNames)===JSON.stringify(proof.legalNames)?exact:null;
 }
 if(a.id==="offering:03308:2026-07-22:cornerstone:27"&&a.label==="CPP Investments"&&a.quantity===394900&&a.amountHkd==="387002000.00"
    &&a.legalNames?.length===1&&a.legalNames[0]==="Canada Pension Plan Investment Board"){
  return {id:"cpp-investments",name:"加拿大养老基金投资公司（CPP Investments）",type:"pension",label:"养老金投资机构",
   names:["Canada Pension Plan Investment Board","CPP Investments"],description:"管理加拿大退休金计划基金。本宗为配发公告独立列示的基石认购。",
   source:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0729/2026072901629.pdf#page=5",
   contextSource:"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=297"};
 }
 const legal=a.legalNames||[], rel=a.relationships||[];
 const managers=rel.filter(r=>cornerstoneManagerRole.test(r.role)&&!/(?:僅|仅|掉期|部分|非認購人|非认购人)/.test(r.role));
 const managerKeys=new Set(managers.map(r=>publicCornerstoneKey(r.name)));
 const trusted=managers.map(r=>publicCornerstoneRegistryByName.get(publicCornerstoneKey(r.name)));
 const identified=legal.map(n=>publicCornerstoneRegistryByName.get(publicCornerstoneKey(n)));
 const set=new Set([...trusted,...identified].filter(Boolean));
 const unassigned=legal.some((n,i)=>!identified[i]&&!managerKeys.has(publicCornerstoneKey(n)));
 // Unknown jointly allocated parties must not be assigned wholly to a known umbrella.
 if(set.size!==1||trusted.some(x=>!x)||unassigned)return null;
 // A covered mixed swap or explicit unaffiliated customer must retain its separate presentation.
 if(rel.some(r=>/掉期|TRS|经济敞口|經濟敞口/.test(r.role)))return null;
 const candidate=[...set][0];
 if(["hhlra","aspex-master","jpm-am-ap","jpm-imi-us","temasek","cpe-gof2","gic","adia","qia-rayyan","janchor"].includes(candidate.id))return null;
 return candidate;
}
function cornerstoneFallbackClass(members){
 const roles=members.flatMap(a=>(a.relationships||[]).map(r=>r.role));
 if(roles.some(x=>/^(个人认购方|個人認購方)$/.test(x)))return ["individual","个人认购"];
 return ["disclosed",""];
}
const cornerstoneMoneyCents=v=>{const [a,b=""]=String(v||"0").split(".");return BigInt(a)*100n+BigInt((b+"00").slice(0,2));};
const cornerstoneNumberFromCents=c=>Number(c)/100;
const cornerstoneUniq=(a,key)=>[...new Map(a.map(x=>[key(x),x])).values()];
function cornerstoneMergeProfiles(rows){
 const grouped=new Map(), ungrouped=[];
 for(const p of rows){
  if(!p.entity){ungrouped.push(p);continue;}
  (grouped.get(p.entity.id)||grouped.set(p.entity.id,[]).get(p.entity.id)).push(p);
 }
 for(const parts of grouped.values()){
  const first=parts[0],entity=first.entity;
  const allocations=cornerstoneUniq(parts.flatMap(x=>x.allocations),a=>a.id);
  const byRound=new Map();
  for(const row of parts)for(const d of row.deals){
   const existing=byRound.get(d.roundId);
   if(!existing)byRound.set(d.roundId,{...d});
   else {
    existing.cents+=d.cents;existing.units+=d.units;
    existing.shares=existing.unit==="HDR"?null:existing.units;
   }
  }
  const deals=[...byRound.values()].sort((a,b)=>a.cents===b.cents?b.date.localeCompare(a.date):a.cents>b.cents?-1:1);
  for(const d of deals) {
   d.commitmentText=formatChineseUnitAmount(cornerstoneNumberFromCents(d.cents),"HKD");
   d.rawCommitment=`按最终发售价折算 · ${offeringNumber(d.units)} ${cornerstoneUnit(d.unit)}`;
   d.ratioText=d.offeredQuantity?`${offeringNumber(d.units/d.offeredQuantity*100,2)}% 发售${d.unit==="HDR"?" HDR":"股"}`:"";
  }
  const cents=allocations.reduce((n,a)=>n+cornerstoneMoneyCents(a.amountHkd),0n);
  const sources=cornerstoneUniq([{label:"机构背景与分类",url:entity.source},...(entity.contextSource?[{label:"机构关系原件",url:entity.contextSource}]:[]),...parts.flatMap(x=>x.sources)],s=>s.url);
  ungrouped.push({...first,id:`cs:institution:${entity.id}`,aliases:[...new Set([...parts.flatMap(x=>[x.id,...x.aliases]),...(entity.id==="jpm-am-brand"?["cs:institution:jpm-am-ap","cs:institution:jpm-imi-us"]:[])])],
   searchNames:[...new Set(parts.flatMap(x=>[x.name,...x.searchNames]))],
   name:entity.name, roleLabel:entity.id==="transsion"?"上市母公司":entity.label,
   archetype:entity.type,archetypeLabel:entity.label,profile:entity.description,
   signatories:cornerstoneUniq(parts.flatMap(x=>x.signatories),s=>s.name.normalize("NFKC").trim().toLowerCase()), allocations,
   allocationIds:allocations.map(a=>a.id),relationships:cornerstoneUniq(parts.flatMap(x=>x.relationships),r=>[r.role,r.name,r.source].join("\n")),
   deals,coSponsors:cornerstoneUniq(parts.flatMap(x=>x.coSponsors),s=>s.sponsorId||s.name),sources,
   commitmentAmount:cornerstoneNumberFromCents(cents),commitmentText:formatChineseUnitAmount(cornerstoneNumberFromCents(cents),"HKD")});
 }
 return ungrouped;
}
function cornerstoneSortProfiles(rows){
 const amount=p=>Number(p.commitmentAmount||0);
 const final=p=>p.deals[0]?.status==="listed"&&p.currency==="HKD"&&amount(p)>0;
 return [...rows].sort((a,b)=>{
  const ra=final(a)?0:a.deals[0]?.status==="listed"?1:a.currency==="HKD"?2:a.currency==="USD"?3:4;
  const rb=final(b)?0:b.deals[0]?.status==="listed"?1:b.currency==="HKD"?2:b.currency==="USD"?3:4;
  return ra-rb||amount(b)-amount(a)||a.id.localeCompare(b.id);
 });
}

function buildCornerstoneProfiles() {
  const profiles = [];
  const rosterByRound = new Map(eligibleFeeRoster().map(r => [r.id, r]));
  const coverage=eligibleCornerstoneCoverage(), coveredRounds=new Set(coverage.map(o=>o.roundId));

  // 1. Paused offerings verified cornerstone groups (00054, 03275, 06700)
  for (const notice of offeringNoticeEvidence) {
    const f = notice.research;
    const groups = offeringCornerstoneGroups(f);
    if (!groups.length) continue;
    const rosterRow = rosterByRound.get(f.roundId);
    const dealSponsors = (rosterRow?.institutions?.length ? rosterRow.institutions.map(i => ({ name: i.displayName, sponsorId: i.sponsorId })) : f.sponsors.map(s => ({ name: s.shortName, sponsorId: sponsorIdForName(s.name) })));
    const ratio = offeringCornerstoneRatio(f);
    const noticeLabels = offeringNoticeLabels(notice);
    for (const group of groups) {
      const tagsText = (group.tags || []).map(t => t.label).join(" ");
      const arch = classifyCornerstoneArchetype(tagsText, `${group.displayRole || ""} ${group.profile || ""}`);
      const cur = group.members[0]?.commitmentCurrency || "HKD";
      const totalAmt = group.amount;
      const commitmentText = `${cur} ${offeringNumber(totalAmt)}（${formatChineseUnitAmount(totalAmt, cur)}）`;
      const sources = [];
      const seenUrl = new Set();
      const pushSrc = (label, url) => { if (url && !seenUrl.has(url)) { seenUrl.add(url); sources.push({ label, url }); } };
      for (const p of (group.pdfPages || [])) pushSrc(`${f.displayName} 招股书 p.${p}`, `${f.prospectusUrl}#page=${p}`);
      if (group.ranking?.sourceUrl) pushSrc(group.ranking.sourceLabel || "规模及排名出处", group.ranking.sourceUrl);
      for (const s of (group.profileSources || [])) pushSrc(s.label, s.url);
      for (const m of group.members) if (m.profileUrl) pushSrc(`${m.shortName} 官方简介`, m.profileUrl);

      profiles.push({
        id: `cs:${group.id}`,
        name: group.displayName || group.name,
        roleLabel: group.displayRole || (group.tags?.find(t => t.dimension === "身份")?.label || arch.label),
        archetype: arch.key,
        archetypeLabel: arch.label,
        channel: group.tags?.find(t => t.dimension === "认购")?.label || group.members[0]?.capacity || "基石认购协议",
        profile: group.profile || group.tags?.map(t => t.label).join(" · ") || "",
        ownership: group.ownership || "",
        ranking: group.ranking || null,
        signatories: group.members.map(m => ({
          id: m.id,
          name: m.name,
          shortName: m.shortName,
          type: m.type,
          capacity: m.capacity,
          currency: m.commitmentCurrency,
          amount: m.commitmentAmount,
          feesIncluded: Boolean(m.feesIncluded),
          manager: m.manager || ""
        })),
        currency: cur,
        commitmentAmount: totalAmt,
        commitmentText,
        deals: [{
          roundId: f.roundId,
          code: notice.stockCode,
          issuer: f.displayName,
          status: "paused",
          statusLabel: noticeLabels[0],
          date: notice.date,
          commitmentText: formatChineseUnitAmount(totalAmt, cur),
          rawCommitment: `${cur} ${offeringNumber(totalAmt)}`,
          shares: null,
          ratioText: ratio,
          roleTag: "基石投资者",
          sponsors: dealSponsors
        }],
        coSponsors: dealSponsors,
        sources
      });
    }
  }

  // 2. Listed offering dossiers (06935 国星宇航: cornerstones + disclosed institutional anchor/TRS accounts)
  for (const d of eligibleOfferingDossiers()) {
    const rosterRow = rosterByRound.get(d.roundId);
    const dealSponsors = (rosterRow?.institutions?.length ? rosterRow.institutions.map(i => ({ name: i.displayName, sponsorId: i.sponsorId })) : d.sponsors.map(s => ({ name: s.name, sponsorId: sponsorIdForName(s.name) })));
    const finalPrice = Number(d.offer?.final || 0);
    for (const [idx, c] of (coveredRounds.has(d.roundId) ? [] : (d.cornerstones || [])).entries()) {
      const approxHkd = finalPrice ? c.shares * finalPrice : null;
      const arch = !d.disclosureStates && /能源|晶科|制造|科技/.test(c.name) ? { key: "strategic", label: "产业战投" } : { key: "strategic", label: "基石投资者" };
      profiles.push({
        id: `cs:${d.code}-cs-${idx}`,
        name: c.name,
        roleLabel: "已上市基石获配方",
        archetype: arch.key,
        archetypeLabel: arch.label,
        channel: d.disclosureStates ? "基石配售" : "基石配售 · 上市起 6 个月禁售",
        profile: `${d.issuer} (${d.code}.HK) 招股及配发结果披露之基石获配主体。`,
        ownership: "",
        ranking: null,
        signatories: [{ id: `${d.code}-cs-${idx}`, name: c.name, shortName: c.name, type: "基石投资者", capacity: `最终获配 ${offeringNumber(c.shares)} 股`, currency: "HKD", amount: approxHkd, feesIncluded: false, manager: "" }],
        currency: approxHkd ? "HKD" : "",
        commitmentAmount: approxHkd,
        commitmentText: `${offeringNumber(c.shares)} 股${approxHkd ? `（约 ${formatChineseUnitAmount(approxHkd, "HKD")}）` : ""}`,
        deals: [{
          roundId: d.roundId,
          code: d.code,
          issuer: d.issuer,
          status: "listed",
          statusLabel: "已挂牌上市",
          date: d.listingDate,
          commitmentText: `${offeringNumber(c.shares)} 股`,
          rawCommitment: approxHkd ? `HKD ${offeringNumber(approxHkd, 0)}（按发售价）` : `${offeringNumber(c.shares)} 股`,
          shares: c.shares,
          ratioText: `${offeringNumber(c.shares / d.offer.shares * 100, 2)}% 发售股`,
          roleTag: "基石获配",
          sponsors: dealSponsors
        }],
        coSponsors: dealSponsors,
        sources: d.disclosureStates ? [{ label: `${d.issuer} 基石获配原件`, url: c.source }] : [
          { label: `${d.issuer} 配发结果公告 · 基石获配 p.6`, url: `${d.allotmentUrl}#page=6` },
          { label: `${d.issuer} 招股章程全文`, url: d.prospectusUrl }
        ]
      });
    }
    for (const [idx, a] of (d.float?.accounts || []).entries()) {
      const approxHkd = finalPrice ? a.shares * finalPrice : null;
      profiles.push({
        id: `cs:${d.code}-acct-${idx}`,
        name: a.displayName,
        roleLabel: a.structure,
        archetype: "asset_mgmt",
        archetypeLabel: d.disclosureStates ? "资管账户" : "跨境私募 / 资管",
        channel: a.structure,
        profile: [a.ownershipFact, a.fundingFact, a.rightsFact].filter(Boolean).join(" · "),
        ownership: a.fund ? `账户：${a.fund}` : `经济敞口：${a.economicParty}`,
        ranking: null,
        signatories: [{ id: a.id, name: a.legalHolder, shortName: a.displayName, type: a.structure, capacity: `法律获配 ${offeringNumber(a.shares)} 股`, currency: "HKD", amount: approxHkd, feesIncluded: false, manager: d.disclosureStates ? (a.manager || "") : (a.economicParty || "") }],
        currency: approxHkd ? "HKD" : "",
        commitmentAmount: approxHkd,
        commitmentText: `${offeringNumber(a.shares)} 股${approxHkd ? `（约 ${formatChineseUnitAmount(approxHkd, "HKD")}）` : ""}`,
        deals: [{
          roundId: d.roundId,
          code: d.code,
          issuer: d.issuer,
          status: "listed",
          statusLabel: "已挂牌上市",
          date: d.listingDate,
          commitmentText: `${offeringNumber(a.shares)} 股`,
          rawCommitment: approxHkd ? `HKD ${offeringNumber(approxHkd, 0)}（按发售价）` : `${offeringNumber(a.shares)} 股`,
          shares: a.shares,
          ratioText: `${offeringNumber(a.shares / d.offer.shares * 100, 2)}% 发售股`,
          roleTag: a.structure,
          sponsors: dealSponsors
        }],
        coSponsors: dealSponsors,
        sources: d.disclosureStates ? [{ label: `${d.issuer} 获配账户原件`, url: a.source }, ...(a.structureSource ? [{ label: "账户结构原件", url: a.structureSource }] : [])] : [
          { label: `${d.issuer} 配发结果公告 · 获配名单 p.12`, url: `${d.allotmentUrl}#page=12` },
          { label: `${d.issuer} 配发结果公告 · TRS/架构 p.14`, url: `${d.allotmentUrl}#page=14` }
        ]
      });
    }
  }
  for(const offer of coverage){
    const row=rosterByRound.get(offer.roundId), sponsorList=(row?.institutions||[]).map(i=>({name:i.displayName,sponsorId:i.sponsorId}));
    const allocations=new Map(offer.allocations.map(a=>[a.id,a]));
    for(const group of offer.groups.flatMap(g=>{
      const classes=g.allocationIds.map(id=>cornerstoneAllocationIdentity(allocations.get(id))?.id);
      if(g.allocationIds.length<2 || classes.every(c=>c===classes[0]) || !g.allocationIds.some(id=>cornerstoneBrandProof(allocations.get(id))))return [g];
      return g.allocationIds.map((id,i)=>({...g,id:i?g.id+":"+i:g.id,aliases:i?[]:g.aliases,
        allocationIds:[id],name:allocations.get(id).label}));
    })){
      const members=group.allocationIds.map(id=>allocations.get(id)), quantity=members.reduce((n,a)=>n+a.quantity,0), amount=members.reduce((n,a)=>n+Number(a.amountHkd),0);
      const names=[...new Set(members.flatMap(a=>{const v=cornerstoneBrandProof(a);return v?.legalNames||(v?.legalName?[v.legalName]:a.legalNames);}))], relations=[...new Map(members.flatMap(a=>a.relationships).map(r=>[`${r.role}\n${r.name}\n${r.source}`,r])).values()];
      if(members.some(m=>m.id==="offering:03308:2026-07-22:cornerstone:3"&&cornerstoneAllocationIdentity(m)?.id==="hhlra")){
        const source="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=289";
        relations.push(
          {role:"开曼私募基金 · 招股书拟用",name:"HACF, L.P.",source},
          {role:"养老金机构 · 招股书拟用独立专户",name:"加拿大养老基金投资公司（CPP Investments）",source},
          {role:"主权投资机构 · 招股书拟用独立专户",name:"阿布扎比投资局（ADIA）",source}
        );
      }
      const src=[...new Set([...members.flatMap(a=>a.sources),...relations.map(r=>r.source)])];
      const id=group.aliases[0]?.id||group.id;
      const classes=members.map(cornerstoneAllocationIdentity);
      const entity=classes[0]&&classes.every(x=>x?.id===classes[0].id)?classes[0]:null;
      const [archetype,archetypeLabel]=entity?[entity.type,entity.label]:cornerstoneFallbackClass(members);
      const searchNames=[group.name,...(entity?.names||[]),...(entity?.displayAliases||[])];
      profiles.push({id,aliases:[group.id,...group.aliases.map(a=>a.id)],name:group.name,searchNames,entity,roleLabel:group.roleLabel,archetype,archetypeLabel,channel:'基石最终配售',profile:relations.slice(0,2).map(r=>`${r.role}：${r.name}`).join(' · '),ownership:'',ranking:null,
        signatories:names.map(name=>({id:name,name,shortName:name,type:'法律认购名',capacity:'',currency:'HKD',amount:null,manager:''})),
        allocations:members,allocationIds:group.allocationIds,relationships:relations,currency:'HKD',commitmentAmount:amount,commitmentText:`${offeringNumber(quantity)} ${cornerstoneUnit(offer.unit)} · ${formatChineseUnitAmount(amount,'HKD')}`,
        deals:[{roundId:offer.roundId,code:offer.code,issuer:offer.issuer,status:'listed',statusLabel:'已挂牌上市',date:offer.listingDate,cents:Math.round(amount*100),offeredQuantity:offer.offeredQuantity,commitmentText:formatChineseUnitAmount(amount,'HKD'),rawCommitment:`按最终发售价折算 · ${offeringNumber(quantity)} ${cornerstoneUnit(offer.unit)}`,shares:offer.unit==='HDR'?null:quantity,units:quantity,unit:offer.unit,ratioText:offer.offeredQuantity?`${offeringNumber(quantity/offer.offeredQuantity*100,2)}% 发售${offer.unit==='HDR'?' HDR':'股'}`:'',roleTag:'基石获配',sponsors:sponsorList}],coSponsors:sponsorList,sources:src.map(url=>({label:`${offer.issuer} ${url.includes('#page=')?'p.'+url.split('#page=')[1]:'披露原件'}`,url}))});
    }
  }
  return cornerstoneSortProfiles(cornerstoneMergeProfiles(profiles));
}


function renderCornerstoneBrandBreakdown(p) {
 const verified=p.allocations?.map(a=>({a,v:cornerstoneBrandProof(a)})).filter(x=>x.v&&x.v.entity===p.entity?.id)||[];
 if (!verified.length) return "";
 const totals=new Map();
 for (const {a,v} of verified) totals.set(v.bucket,(totals.get(v.bucket)||0n)+cornerstoneMoneyCents(a.amountHkd));
 const order=["直接认购","自有资金","全资投资载体","基金控制载体","Global Opportunities Fund II","大中华成长基金","集团控制载体","管理基金","储备管理机构","独立专户","合计披露"];
 const items=verified.slice().sort((l,r)=>{const a=cornerstoneMoneyCents(l.a.amountHkd),b=cornerstoneMoneyCents(r.a.amountHkd);return a===b?l.a.id.localeCompare(r.a.id):a>b?-1:1;}).map(({a,v})=>{
  const d=p.deals.find(d=>a.id.startsWith(d.roundId+":"));
  const accounts=v.accounts?.length?`<details><summary>披露基金及账户</summary><ul>${v.accounts.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}${v.otherMandates?"<li>其他集合基金、独立账户及委托</li>":""}</ul></details>`:"";
  return `<div><div><strong>${escapeHtml(d?d.issuer+" ("+d.code+")":a.label)}</strong><small>${escapeHtml(v.bucket)} · ${escapeHtml(v.detail)}</small>${accounts}</div><span class="col-num">${formatChineseUnitAmount(Number(a.amountHkd),"HKD")}</span>${feeRosterSource(a.source,"配发结果 ↗")}${feeRosterSource(v.source,"认购架构 ↗")}</div>`;
 });
 return `<section class="deal-section"><header><h3>按获配渠道</h3></header><dl class="deal-facts">${order.filter(k=>totals.has(k)).map(k=>`<div><dt>${k}</dt><dd>${formatChineseUnitAmount(cornerstoneNumberFromCents(totals.get(k)),"HKD")}</dd></div>`).join("")}</dl><div class="deal-allocation-list">${items.join("")}</div></section>`;
}

const cornerstoneVerifiedBankRosters = {"offering:09980:2026-01-26":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0126/2026012600003.pdf#page=1","banks":["华泰国际","摩根士丹利","瑞银"]},"offering:03308:2026-07-22":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0722/2026072200013.pdf#page=1","banks":["高盛","中金","摩根士丹利","广发","国泰海通","花旗","汇丰","中国银河"]},"offering:02475:2026-06-30":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0708/2026070801342.pdf#page=3","banks":["中信证券","高盛","中金"]},"offering:03661:2026-06-17":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0625/2026062502076.pdf#page=2","banks":["中金","华泰国际"]},"offering:07666:2026-05-05":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0512/2026051201482.pdf#page=2","banks":["杰富瑞","德意志银行","中信证券","招银国际"]},"offering:06880:2026-06-29":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0707/2026070701963.pdf#page=2","banks":["中金","德意志银行"]},"offering:01879:2026-04-20":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0427/2026042703526.pdf#page=2","banks":["中金","国泰海通","汇丰"]},"offering:01768:2026-01-20":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0127/2026012701713.pdf#page=2","banks":["高盛","华泰国际","德意志银行"]},"offering:06715:2026-06-22":{"source":"https://www.hkexnews.hk/listedco/listconews/sehk/2026/0622/2026062200025.pdf#page=2","banks":["中信证券","中信建投","兴证国际","华福国际"]},"offering:06656:2026-04-08":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0415/2026041501574.pdf#page=2","banks":["中信证券","法巴","中金"]},"offering:01081:2026-05-28":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0604/2026060402919.pdf#page=2","banks":["华泰国际","招商证券国际","中金","平安证券"]},"offering:01021:2026-03-20":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0327/2026032703804.pdf#page=2","banks":["中金","德意志银行"]},"offering:03277:2026-04-09":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0416/2026041602158.pdf#page=2","banks":["中信证券","国泰海通"]},"offering:02692:2026-02-27":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0306/2026030601575.pdf#page=2","banks":["招商证券国际","德意志银行","中信证券"]},"offering:03200:2026-01-29":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0205/2026020502290.pdf#page=2","banks":["中金","德意志银行"]},"offering:00668:2026-06-23":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063003481.pdf#page=2","banks":["中金","高盛","摩根大通"]},"offering:07688:2026-05-12":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0519/2026051901261.pdf#page=2","banks":["国泰海通","建银国际"]},"offering:06106:2026-06-15":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0623/2026062302143.pdf#page=2","banks":["中金","招银国际"]},"offering:02476:2026-04-13":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0420/2026042001650.pdf#page=2","banks":["摩根大通","中信建投","广发","农银国际","中金"]},"offering:01377:2026-06-30":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0708/2026070801372.pdf#page=2","banks":["中信证券","汇丰","农银国际","广发","华泰国际"]},"offering:02249:2026-06-30":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0709/2026070901289.pdf#page=2","banks":["中金","中信证券","华泰国际"]},"offering:00537:2026-06-30":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0708/2026070801336.pdf#page=2","banks":["中信证券","招银国际","工银国际"]},"offering:09630:2026-06-17":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0617/2026061700039.pdf#page=1","banks":["中金","招银国际","国元国际"]},"offering:09981:2026-02-05":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0212/2026021201492.pdf#page=2","banks":["中信建投","招商证券国际","山证国际"]},"offering:00470:2026-02-03":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0210/2026021001338.pdf#page=2","banks":["中信证券","摩根大通"]},"offering:06809:2026-01-30":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0206/2026020601350.pdf#page=2","banks":["中金","摩根士丹利","瑞银","高盛","中信证券"]},"offering:00100:2025-12-31":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0108/2026010801342.pdf#page=2","banks":["中金","瑞银","高盛","摩根士丹利"]},"offering:06082:2025-12-22":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1231/2025123102783.pdf#page=2","banks":["中金","平安证券","中银国际","中信证券","东吴证券国际"]},"offering:02384:2026-10-20":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1020/2026102000017.pdf#page=1","banks":["瑞银","国泰海通","广发","中信证券","汇丰"]},"offering:03228:2026-09-21":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0921/2026092100035.pdf#page=1","banks":["中信证券","美银","国联证券国际"]},"offering:06951:2026-06-30":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000323.pdf#page=1","banks":["中国银河"]},"offering:07687:2026-06-29":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0629/2026062900135.pdf#page=1","banks":["国泰海通","麦格理"]},"offering:03296:2026-04-15":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0415/2026041500011.pdf#page=1","banks":["中金","美银","高盛","中信证券"]},"offering:02636:2026-10-07":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1014/2026101401159.pdf#page=2","banks":["中信证券","摩根大通","中金","国泰海通","德意志银行"]},"offering:09637:2026-06-18":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0626/2026062603033.pdf#page=2","banks":["杰富瑞","美银","华泰国际","中信证券","中银国际"]},"offering:02675:2025-12-30":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0107/2026010701900.pdf#page=2","banks":["摩根士丹利","广发","中金","中信证券"]},"offering:01256:2026-09-28":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1008/2026100801417.pdf#page=2","banks":["中信证券","中信建投","华泰国际","广发"]},"offering:09856:2026-09-14":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0921/2026092101567.pdf#page=2","banks":["花旗","中信证券"]},"offering:03388:2026-05-20":{"source":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0528/2026052802543.pdf#page=2","banks":["中金","德意志银行"]}};
function cornerstoneBankName(name) {
 const labels={"国泰君安":"国泰海通","海通国际":"国泰海通","国泰海通／海通国际":"国泰海通","德银":"德意志银行","华泰":"华泰国际","银河国际":"中国银河"};
 return labels[name]||name;
}
function cornerstoneBankIndex(rows=eligibleFeeRoster(), rosters=cornerstoneVerifiedBankRosters) {
 const index=new Map();
 for(const row of rows){
  const alloc=row.institutions?.filter(i=>i.role==="sponsor"&&i.displayName)||[];
  if(!alloc.length)continue;
  index.set(row.id||row.roundId,{source:row.sources?.[0],banks:alloc.map(a=>cornerstoneBankName(a.displayName)),complete:false});
 }
 for(const [id,r] of Object.entries(rosters)){
  index.set(id,{source:r.source,banks:r.banks.map(cornerstoneBankName),complete:true});
 }
 return index;
}
function cornerstoneBankRanking(deals,index) {
 const listed=[...new Map(deals.filter(d=>d.status==="listed"&&d.roundId).map(d=>[d.roundId,d])).values()];
 const ranks=new Map();let verified=0,complete=0;
 for(const d of listed){
  const row=index.get(d.roundId);
  if(!row?.banks?.length)continue;
  verified++; if(row.complete)complete++;
  for(const bank of new Set(row.banks)){
   if(!ranks.has(bank))ranks.set(bank,[]);
   ranks.get(bank).push({...d,bankSource:row.source});
  }
 }
 const ranked=[...ranks].map(([bank,deals])=>({bank,deals})).sort((a,b)=>b.deals.length-a.deals.length||a.bank.localeCompare(b.bank,"zh-Hant"));
 return {listed:listed.length,verified,complete,ranked};
}
function renderCornerstoneBankChart(p,index) {
 const r=cornerstoneBankRanking(p.deals,index);
 if(!r.listed)return "";
 const max=r.ranked[0]?.deals.length||1;
 const ceiling=r.ranked[Math.min(2,r.ranked.length-1)]?.deals.length||1;
 const preview=r.ranked.filter(x=>x.deals.length>=ceiling),more=r.ranked.slice(preview.length);
 const fill=(x)=>`<details style="margin:.65rem 0"><summary style="cursor:pointer;list-style-position:inside"><strong>${escapeHtml(x.bank)}</strong> <span class="col-num">${x.deals.length} 宗</span><span aria-hidden="true" style="display:block;height:.45rem;margin:.3rem 0 0 1rem;background:rgba(63,120,176,.18);border-radius:6px"><span style="display:block;height:100%;width:${x.deals.length/max*100}%;background:#497ca6;border-radius:6px"></span></span></summary><ul>${x.deals.map(d=>`<li><button type="button" class="cross-link-chip" data-cs-deal-round="${escapeHtml(d.roundId)}">${escapeHtml(d.issuer)} (${escapeHtml(d.code)})</button> ${d.bankSource?feeRosterSource(d.bankSource,"发行原件 ↗"):""}</li>`).join("")}</ul></details>`;
 return `<section class="deal-section"><details open><summary style="cursor:pointer"><strong>联动投行</strong> · ${r.ranked.length} 家</summary><p class="cs-profile-sub">公开同单 IPO 宗数 · 保荐人 / OC · 同一投行每宗计一次</p><p class="cs-profile-sub">保荐人或 OC 已匹配 ${r.verified}/${r.listed} 宗 · 完整保荐人及 OC 名单 ${r.complete}/${r.listed} 宗</p>
 ${preview.map(fill).join("")}${more.length?`<details><summary style="cursor:pointer">展开其余 ${more.length} 家</summary>${more.map(fill).join("")}</details>`:""}</details></section>`;
}

function renderCornerstones() {
  const listWrap = document.getElementById("cornerstoneListWrap");
  const profilePane = document.getElementById("cornerstoneProfilePane");
  if (!listWrap || !profilePane) return;
  const all = buildCornerstoneProfiles();
  const bankIndex = cornerstoneBankIndex();
  const coverage=eligibleCornerstoneCoverage(),known=coverage.filter(o=>o.status==="known").length,none=coverage.filter(o=>o.status==="confirmed_zero").length;
  const allocationRounds=coverage.filter(o=>o.status==="known"&&o.allocations.length).length;
  const q = normalizeSearchText(state.csQuery || "");
  const searchEl = document.getElementById("csSearch");
  if (searchEl && searchEl.value !== state.csQuery) searchEl.value = state.csQuery;

  // Coverage meta & Insight Strip
  const metaEl = document.getElementById("csCoverageMeta");
  if (metaEl) metaEl.textContent = `覆盖 ${coverage.length} 轮（主板 ${coverage.filter(o=>o.board==="Main").length} / GEM ${coverage.filter(o=>o.board==="GEM").length}）· 已披露基石 ${known} 宗 · 无基石 ${none} 宗 · 截至 ${state.dossierData?.cornerstoneCoverage?.listingCutoff}`;
  const insightEl = document.getElementById("csInsightStrip");
  const thermoEl = document.getElementById("csThermometer");
  const archMeta = [
    { key: "public_fund", label: "内地公募管理人", cls: "is-public-fund" },
    { key: "hk_family", label: "港资家族与个人大户", cls: "is-hk-family" },
    { key: "strategic", label: "产业投资", cls: "is-strategic" },
    { key: "asset_mgmt", label: "跨境私募 / TRS", cls: "is-asset-mgmt" },
    { key: "international", label: "国际资产管理", cls: "is-public-fund" },
    { key: "sovereign", label: "主权投资机构", cls: "is-strategic" },
    { key: "pension", label: "养老金专户", cls: "is-strategic" },
    { key: "securities", label: "证券机构", cls: "is-public-fund" },
    { key: "insurance", label: "保险机构", cls: "is-hk-family" },
    { key: "bank_wm", label: "银行理财", cls: "is-public-fund" },
    { key: "manager", label: "披露投资管理关系", cls: "is-asset-mgmt" },
    { key: "swap", label: "掉期安排", cls: "is-asset-mgmt" },
    { key: "fund_vehicle", label: "披露基金架构", cls: "is-asset-mgmt" },
    { key: "ownership", label: "披露持股或控制关系", cls: "is-asset-mgmt" },
    { key: "individual", label: "个人认购", cls: "is-hk-family" },
    { key: "disclosed", label: "其他披露主体", cls: "is-asset-mgmt" }
  ];
  if (insightEl) {
    const sigCount = all.reduce((s, p) => s + p.signatories.length, 0);
    const byArch = { public_fund: 0, hk_family: 0, strategic: 0, asset_mgmt: 0, disclosed: 0 };
    const usdTotal = all.filter(p => p.deals[0]?.status === "paused" && p.currency === "USD").reduce((s, p) => s + (p.commitmentAmount || 0), 0);
    const hkdTotal = all.filter(p => p.deals[0]?.status === "paused" && p.currency === "HKD").reduce((s, p) => s + (p.commitmentAmount || 0), 0);
    const spSet = new Map();
    for (const p of all) {
      byArch[p.archetype] = (byArch[p.archetype] || 0) + 1;
      for (const sp of p.coSponsors) if (sp.sponsorId) spSet.set(sp.sponsorId, sp.name);
    }
    insightEl.innerHTML = `
      <div class="stat-cell"><span class="stat-label">基石与机构主体</span><strong class="stat-val col-num">${all.length} 组</strong><small class="stat-sub">${sigCount} 个已披露法律名称 · 已上市配发明细 ${allocationRounds} 宗</small></div>
      <div class="stat-cell"><span class="stat-label">原币认购承诺（搁置轮）</span><strong class="stat-val col-num">USD ${offeringNumber(usdTotal / 1e4, 0)}万 · HKD ${offeringNumber(hkdTotal / 1e8, 2)}亿</strong><small class="stat-sub">USD 与 HKD 原币认购承诺</small></div>
      <div class="stat-cell"><span class="stat-label">联动保荐人网络</span><strong class="stat-val col-num">${spSet.size} 家保荐机构</strong><small class="stat-sub">${[...spSet.values()].slice(0, 5).join(" · ")}</small></div>
    `;
  }

  // Profile View Mode
  const activeProfile = state.csId ? all.find(p => cornerstoneProfileMatch(p,state.csId)) : null;
  if (thermoEl) {
    thermoEl.hidden = true;
    thermoEl.innerHTML = "";
  }

  // Sync archetype tabs
  document.querySelectorAll("[data-cs-archetype]").forEach(btn => {
    const active = btn.dataset.csArchetype === state.csArchetype;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  const toolbar = document.getElementById("csToolbar");
  if (activeProfile) {
    if (toolbar) toolbar.hidden = true;
    listWrap.hidden = true;
    profilePane.hidden = false;
    const spvNames = activeProfile.signatories.map(s => s.name).filter(n => n && n !== activeProfile.name);
    const csFrom = p0FromUrlInfo();
    const csOriginLabel = csFrom && csFrom.view !== "cornerstones"
      ? ({ dossiers: "新股档案", pausedOfferings: "发售搁置", fees: "新股与费用", directory: "项目总录", tracker: "监管节奏", sponsorLeaderboard: "保荐人龙虎榜", sponsorPk: "保荐人擂台", precedents: "交易与重组" }[csFrom.view] || "")
      : "";
    profilePane.innerHTML = `
      <div class="cs-profile-topbar">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <button type="button" class="back-pill" data-cs-return>← 返回基石画像列表</button>
          ${csOriginLabel ? `<button type="button" class="back-pill" data-cs-origin-back>↩ 返回${escapeHtml(csOriginLabel)}</button>` : ""}
        </div>
        <span class="cs-arch-badge">${escapeHtml(activeProfile.archetypeLabel)}</span>
      </div>
      <header class="deal-header cs-profile-header">
        <div>
          <p>${escapeHtml(activeProfile.roleLabel)} · ${escapeHtml(activeProfile.channel)}</p>
          <h2 id="csProfileTitle" tabindex="-1">${escapeHtml(activeProfile.name)}</h2>
          ${activeProfile.profile ? `<p class="cs-ubo-lead">${escapeHtml(activeProfile.profile)}</p>` : ""}
          ${spvNames.length ? `<p class="cs-spv-nest">法律签约载体：${escapeHtml(spvNames.join(" · "))}</p>` : ""}
        </div>
        <div class="cs-profile-commitment">
          <span>${activeProfile.allocations?.length?"累计实际获配（港元）":"披露规模"}</span>
          <strong class="col-num">${escapeHtml(activeProfile.commitmentText)}</strong>
        </div>
      </header>
        ${renderCornerstoneBankChart(activeProfile,bankIndex)}
      <div class="cs-profile-grid">
        <section class="deal-section">
          <header><h3>主体背景与认购架构</h3></header>
          ${activeProfile.profile && !activeProfile.entity ? `<p class="cs-profile-lead">${escapeHtml(activeProfile.profile)}</p>` : ""}
          ${activeProfile.ownership ? `<p class="cs-profile-sub">持有 / 架构：${escapeHtml(activeProfile.ownership)}</p>` : ""}
          ${activeProfile.ranking ? `<div class="offering-cornerstone-rank">${escapeHtml(activeProfile.ranking.metric)} ${escapeHtml(activeProfile.ranking.currency)} ${offeringNumber(activeProfile.ranking.amountHundredMillion, 2)} 亿元 · 行业第 ${activeProfile.ranking.rank}<span>截至 ${escapeHtml(activeProfile.ranking.asOf)} · ${escapeHtml(activeProfile.ranking.dataProvider)}</span></div>` : ""}
          ${activeProfile.signatories.length?`<h4>${activeProfile.allocations?'披露法律认购名':'法律签约实体'}（${activeProfile.signatories.length} 名）</h4>`:''}
          <ul class="offering-cornerstone-members">${activeProfile.signatories.map(s => `<li><div><strong>${escapeHtml(s.name)}</strong><span class="col-num">${s.amount ? `${escapeHtml(s.currency)} ${offeringNumber(s.amount, 0)}` : ""}</span></div><p>${escapeHtml(s.type)} · ${escapeHtml(s.capacity)}${s.manager ? ` · 管理人：${escapeHtml(s.manager)}` : ""}${s.feesIncluded ? " · 含经纪佣金及征费" : ""}</p></li>`).join("")}</ul>
        </section>
        ${renderCornerstoneBrandBreakdown(activeProfile) || (activeProfile.allocations?`<section class="deal-section"><header><h3>获配明细</h3></header><div class="deal-allocation-list">${activeProfile.allocations.map(a=>`<div><strong>${escapeHtml(a.label)}</strong><span class="col-num">${offeringNumber(a.quantity)} ${cornerstoneUnit(activeProfile.deals[0].unit)} · HKD ${offeringNumber(a.amountHkd,2)}</span>${feeRosterSource(a.source,'原件 ↗')}</div>`).join('')}</div>${activeProfile.relationships.length?`<details class="deal-light-detail"><summary>认购关系</summary>${activeProfile.relationships.map(r=>`<p>${escapeHtml(r.role)}：${escapeHtml(r.name)} ${feeRosterSource(r.source,'原件 ↗')}</p>`).join('')}</details>`:''}</section>`:'')}
        <section class="deal-section">
          <header><h3>参与港股项目记录</h3></header>
          <div class="table-wrap"><table class="cs-deals-table">
            <thead><tr><th>项目 / 代码</th><th>状态 / 角色</th><th class="col-num">披露金额 / 获配</th><th>占发售比</th></tr></thead>
            <tbody>${activeProfile.deals.map(deal => `<tr class="cs-deal-row" data-cs-deal-round="${escapeHtml(deal.roundId)}" tabindex="0" role="button"><th scope="row"><strong>${escapeHtml(deal.issuer)}</strong> <span class="mono-code">${deal.code}.HK</span></th><td><span class="deal-status-pill is-${deal.status === "listed" ? "listed" : "paused"}">${escapeHtml(deal.statusLabel)}</span> <small>${escapeHtml(deal.roleTag)} · ${deal.date}</small></td><td class="col-num" title="${escapeHtml(deal.rawCommitment)}"><strong>${escapeHtml(deal.commitmentText)}</strong></td><td>${escapeHtml(deal.ratioText || "—")}</td></tr>`).join("")}</tbody>
          </table></div>
        </section>
      </div>
      <details class="deal-sources-fold" id="cs-sources">
        <summary><span>公告与招股书原件</span><small>展开备查链接</small></summary>
        <div class="deal-sources-fold-body"><div class="consolidated-page-links">${activeProfile.sources.map(s => feeRosterSource(s.url, `${s.label} ↗`)).join("")}</div></div>
      </details>
    `;
    return;
  }

  if (toolbar) toolbar.hidden = false;
  listWrap.hidden = false;
  profilePane.hidden = true;
  profilePane.innerHTML = "";

  const filtered = all.filter(p => {
    if (state.csArchetype !== "all" && p.archetype !== state.csArchetype) return false;
    if (!q) return true;
    const text = normalizeSearchText([
      p.name, p.roleLabel, p.archetypeLabel, p.channel, p.profile, p.ownership,
      ...(p.searchNames||[]),
      ...p.signatories.map(s => `${s.name} ${s.shortName} ${s.manager}`),
      ...(p.allocations||[]).map(a=>a.label),
      ...(p.relationships||[]).map(r=>`${r.role} ${r.name}`),
      ...p.deals.map(d => `${d.code} ${d.issuer} ${d.roleTag}`),
      ...p.coSponsors.map(sp => sp.name)
    ].join(" "));
    return text.includes(q);
  });

  listWrap.innerHTML = filtered.length ? `<div class="table-wrap"><table class="cs-table">
    <thead><tr>
      <th scope="col">实控主体 / 背景与签约载体</th>
      <th scope="col">画像与认购通道</th>
      <th scope="col">参与项目与角色</th>
      <th scope="col" class="col-num">实际获配金额 ↓</th>
      <th scope="col">联动保荐机构</th>
    </tr></thead>
    <tbody>${filtered.map((p,rank) => {
      const pending=p.deals[0]?.status==="paused";
      const currencyGroup=pending?p.currency:"listed";
      const prior=filtered[rank-1];
      const previousGroup=prior?.deals[0]?.status==="paused"?prior.currency:"listed";
      const groupHead=(rank===0||previousGroup!==currencyGroup)?`<tr><th scope="colgroup" colspan="5">${pending?"搁置发售 · "+escapeHtml(currencyGroup||"原币")+" 认购承诺":"已上市 · 按港元获配金额降序"}</th></tr>`:"";
      const deal = p.deals[0];
      const uboBg = p.ranking
        ? `${p.ranking.metric} ${p.ranking.currency} ${offeringNumber(p.ranking.amountHundredMillion, 0)}亿 · 行业第 ${p.ranking.rank}`
        : p.profile || p.ownership || "";
      const spvList = p.signatories.map(s => s.shortName && s.shortName !== p.name ? s.shortName : s.name).filter(n => n && n !== p.name);
      const spvLine = spvList.length
        ? `<span class="cs-spv-nest">签约载体：${escapeHtml(spvList.slice(0, 2).join(" / "))}${spvList.length > 2 ? ` 等 ${spvList.length} 家` : ""}</span>`
        : (p.ownership ? `<span class="cs-spv-nest">${escapeHtml(p.ownership)}</span>` : "");
      return `${groupHead}<tr class="cs-row" data-cs-id="${escapeHtml(p.id)}" tabindex="0" role="button" aria-label="查看 ${escapeHtml(p.name)} 基石画像">
        <th scope="row" class="cs-ubo-cell">
          <div class="cs-ubo-head"><strong>${escapeHtml(p.name)}</strong><span class="cs-ubo-role">${escapeHtml(p.roleLabel)}</span></div>
          ${uboBg ? `<div class="cs-ubo-bg">${escapeHtml(uboBg)}</div>` : ""}
          ${spvLine}
        </th>
        <td><span class="cs-arch-badge">${escapeHtml(p.archetypeLabel)}</span><small>${escapeHtml(p.channel)}</small></td>
        <td><div class="cs-deal-cell"><button type="button" class="cross-link-chip" data-cs-deal-round="${escapeHtml(deal.roundId)}">${escapeHtml(deal.issuer)} (${deal.code}) ↗</button><small>${escapeHtml(deal.statusLabel)} · ${escapeHtml(deal.roleTag)}${p.deals.length>1?` · 共 ${p.deals.length} 宗`:""}</small></div></td>
        <td class="col-num" title="${escapeHtml(deal.rawCommitment)}"><strong>${escapeHtml(p.allocations?.length?p.commitmentText:deal.commitmentText)}</strong><small>${escapeHtml(deal.ratioText ? deal.ratioText.replace(/（.*）/, "") : "")}</small></td>
        <td><div class="cs-sponsors-cell">${cornerstoneBankRanking(p.deals,bankIndex).ranked.filter(x=>x.deals.length>=2).slice(0,3).map(x=>escapeHtml(x.bank)+" · "+x.deals.length+"宗").join(" / ")}</div></td>
      </tr>`;
    }).join("")}</tbody></table></div>` : `<div class="empty-state-row"><p>未找到匹配的基石投资者</p><button type="button" data-cs-reset>清除筛选</button></div>`;
}

function openCornerstoneProfile(csId, trigger = document.activeElement) {
  if (!buildCornerstoneProfiles().some(p => cornerstoneProfileMatch(p,csId))) return false;
  p0SaveLocation(trigger);
  const previous = location.pathname + location.search;
  state.csId = csId;
  state.view = "cornerstones";
  syncUrl("push", previous);
  switchView("cornerstones", false);
  document.getElementById("csProfileTitle")?.focus({ preventScroll: true });
  window.scrollTo(0, 0);
  return true;
}

function returnCornerstones() {
  const info = p0FromUrlInfo();
  if (info && info.view === "cornerstones" && !info.params.get("csId")) {
    history.back();
    return;
  }
  const prevId = state.csId;
  state.csId = "";
  state.view = "cornerstones";
  renderCornerstones();
  syncUrl("push", "");
  window.scrollTo(0, 0);
  (prevId && document.querySelector(`#cornerstoneListWrap [data-cs-id="${CSS.escape(prevId)}"]`) || document.getElementById("csSearch"))?.focus({ preventScroll: true });
}

if (typeof window !== "undefined") {
  window.YingSightCornerstones = Object.freeze({
    schemaVersion: 1,
    getProfiles: () => structuredClone(buildCornerstoneProfiles()),
    getProfile: id => structuredClone(buildCornerstoneProfiles().find(p => cornerstoneProfileMatch(p,id)) || null),
    getOfferings: () => structuredClone(eligibleCornerstoneCoverage()),
    selectOfferings: criteria => structuredClone(selectCornerstoneOfferings(criteria)),
    summarizeOfferings: criteria => structuredClone(summarizeCornerstoneOfferings(criteria)),
    getAllocations: () => structuredClone(eligibleCornerstoneCoverage().flatMap(o=>o.allocations.map(a=>({...a,roundId:o.roundId,unit:o.unit}))))
  });
}

const recordTextCache = new WeakMap();

function getRecordText(record) {
  const cached = recordTextCache.get(record);
  if (cached !== undefined) return cached;
  const sponsorAliases = (record.sponsors || []).flatMap((sponsor) => sponsorSearchAliases(sponsor));
  const rawText = [
    record.issuerName,
    offeringSearchText(record),
    record.id === "leadrive technology (shanghai) co., ltd." ? "Leaddrive" : "",
    record.csrcName,
    ...(record.issuerSearchAliases || []),
    issuerTypeInfo(record).primary,
    issuerTypeInfo(record).secondary,
    record.structureType,
    record.issuerJurisdiction,
    record.aShareStatus,
    record.aShareCode,
    record.backendStageZh,
    record.currentA1Date,
    record.hkexApplicationStatusLabelZh,
    ...(record.hkexPublishedApplications || []).flatMap(a => a.documents.flatMap(d => [d.date, d.label, hkexDocumentLabel(d.label)])),
    record.hkexListingDate,
    record.hkexListingStockCode,
    record.hkexProspectusDate,
    record.hkexListingCompanyName,
    record.csrcFirstReceivedDate,
    record.csrcCurrentReceivedDate,
    ...(record.statusTags || []),
    ...(record.timelineFlags || []),
    record.feedbackStatus,
    ...effectiveIndustryMeta(record).bizTags,
    ...effectiveIndustryMeta(record).csrcCats,
    ...(record.regulatoryTags || []),
    ...sponsorLabels(record),
    ...sponsorAliases,
    ...(record.sponsors || [])
  ]
    .join(" ");
  const text = normalizeSearchText(rawText);
  recordTextCache.set(record, text);
  return text;
}

function renderStackedDate(primary, secondaryLabel, secondary) {
  const secondaryHtml = secondary && secondary !== primary
    ? `<span class="date-secondary">${escapeHtml(secondaryLabel)} ${formatDatePlain(secondary)}</span>`
    : "";
  return `<span class="date-primary">${formatDate(primary)}</span>${secondaryHtml}`;
}

function submissionDateRows(record) {
  const e = record.listedSubmissionEvidence;
  if (!e) return "";
  const row = (label, value) => `<div class="timeline-row"><span>${label}</span><strong>${value}</strong></div>`;
  if (e.kind === "confidential_submission" && e.publicDocumentType === "PHIP") {
    return row("密交递交 / Confidential submission", formatDate(e.submissionDate)) +
      row("聆讯后资料集 / PHIP", formatDate(e.publicDocumentDate)) +
      row("公开申请版本 / Public AP", "未见公开申请版本 / No public AP evidenced");
  }
  if (e.kind === "public_same_day_AP" && e.publicDocumentType === "AP_UNSPECIFIED") {
    return row("首次已见公开申请版本 / First evidenced public AP", formatDate(e.publicDocumentDate)) +
      row("版本类别 / AP version", "未注明首次或修订 / Original or revised not specified");
  }
  return "";
}

function hkexDocumentLabel(label) {
  const labels = {"Application Proof (1st submission)": "首次申请版本", "Application Proof (Revised)": "修订申请版本",
    "OC Announcement - Appointment": "整体协调人委任", "OC Announcement - Appointment (Revised)": "整体协调人委任（修订）",
    "OC Announcement - Termination": "整体协调人终止委任", "PHIP (1st submission)": "聆讯后资料集"};
  return labels[label] || label;
}

function renderHkexPostings(record) {
  const docs = (record.hkexPublishedApplications || []).flatMap(a => a.documents || [])
    .filter(d => /^https:\/\/www1\.hkexnews\.hk\/app\/sehk\/\d{4}\/\d+\/documents\/sehk\d+(_c)?\.pdf$/.test(d.url))
    .sort((a, b) => b.date.localeCompare(a.date) || Number(a.previous) - Number(b.previous));
  if (!docs.length) return "";
  const lead = docs[0];
  return `<details><summary>港交所申请文件 · ${escapeHtml(lead.date)}</summary>${docs.map(d =>
    `<div><a href="${escapeHtml(d.url)}" target="_blank" rel="noreferrer">${escapeHtml(d.date)} · ${escapeHtml(hkexDocumentLabel(d.label))}</a>${d.previous ? " · 此前刊发" : ""}</div>`
  ).join("")}</details>`;
}

function renderHkexStatusEvidence(record) {
  if (record.hkexReturnedApplication) return `<p>港交所于 ${escapeHtml(record.hkexReturnedApplication.date)} 发回本次上市申请。<a href="https://www1.hkexnews.hk/ncms/json/eds/appreturned_sehk_e.json" target="_blank" rel="noreferrer">港交所已发回申请名单</a></p>`;
  if (record.hkexApplicationProofEvidence) return `<p>港交所曾于 ${escapeHtml(record.hkexApplicationProofEvidence.date)} 刊发申请版本。当前名册未列示本次申请状态。</p>`;
  return "";
}

function renderA1Cell(record) {
  const reported = record.listedSubmissionEvidence;
  if (reported?.kind === "confidential_submission" && reported.publicDocumentType === "PHIP")
    return `<span class="date-primary">公开AP未见 / No public AP evidenced</span><span class="date-secondary">密交 ${formatDate(reported.submissionDate)}</span>`;
  if (reported?.kind === "public_same_day_AP" && reported.publicDocumentType === "AP_UNSPECIFIED")
    return `<span class="date-primary">${formatDate(reported.publicDocumentDate)}</span><span class="date-secondary">首次已见 / First evidenced AP</span>`;

  if (record.hkexConfidentialFilingDate && record.hkexConfidentialFilingDate === record.a1Date) {
    const publicA1 = record.hkexPublicFirstPostingDate || record.currentA1Date;
    const publicA1Html = publicA1 && publicA1 !== record.a1Date
      ? `<span class="date-secondary">公开 ${formatDatePlain(publicA1)}</span>`
      : "";
    return `<span class="date-primary">密交 ${formatDate(record.a1Date)}</span>${publicA1Html}`;
  }
  return renderStackedDate(record.a1Date, "当前", record.currentA1Date);
}

function renderReceivedDateValue(value, isAsOf = false) {
  if (!isAsOf) return formatDate(value);
  if (!value) return formatDate(value);
  return `<span class="date-primary">截至 ${escapeHtml(formatDatePlain(value))}</span><span class="date-secondary">已接收 · as of status</span>`;
}

function isLaterCycleReceived(record) {
  const current = asDateValue(record.csrcCurrentReceivedDate);
  const notice = asDateValue(record.noticeDate);
  return current !== null && notice !== null && current > notice;
}

function renderReceivedCell(record) {
  const primary = record.csrcReceivedDate || record.csrcFirstReceivedDate;
  const primaryIsAsOf = record.csrcReceivedDateIsAsOf || (
    !record.csrcReceivedDate && record.csrcFirstReceivedDate && record.csrcFirstReceivedDateIsAsOf
  );
  const currentIsAsOf = record.csrcCurrentReceivedDateIsAsOf;
  const currentLabel = isLaterCycleReceived(record) ? "后续备案轮次" : "当前";
  if (!primary && record.csrcCurrentReceivedDate) {
    return `${renderReceivedDateValue(record.csrcCurrentReceivedDate, currentIsAsOf)}<span class="date-secondary">${currentLabel}接收</span>`;
  }
  if (!primary && record.status === "waiting_received") {
    const start = record.currentA1Date || record.a1Date;
    const waited = typeof p0Elapsed === "function" ? p0Elapsed(start, state.dayCountMode) : null;
    return `<span class="cell-live-pill is-waiting">待接收${typeof waited === "number" ? ` · 已候 ${formatDayValue(waited)}d` : ""}</span>`;
  }
  if (!primary && record.status === "not_required") return '<span class="cell-live-pill is-exempt">无需备案</span>';
  if (!primary && record.status === "applicability_pending") return '<span class="cell-live-pill is-muted">无公开备案</span>';
  const secondaryHtml = record.csrcCurrentReceivedDate && record.csrcCurrentReceivedDate !== primary
    ? `<span class="date-secondary">${currentLabel} ${currentIsAsOf ? "截至 " : ""}${formatDatePlain(record.csrcCurrentReceivedDate)}</span>`
    : "";
  return `${renderReceivedDateValue(primary, primaryIsAsOf)}${secondaryHtml}`;
}

function completedRtoDate(fact) {
  if (fact.specialListingRoute !== "rto") return "";
  const value = fact.transactionCompletionDate;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith("0000-")) return "";
  const parsed = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) return "";
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Hong_Kong", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
  if (value > today) return "";
  const source = fact.transactionCompletionSourceUrl;
  if (typeof source !== "string" || !/^https?:\/\/[^/\\]/i.test(source)) return "";
  try {
    const url = new URL(source);
    return ["http:", "https:"].includes(url.protocol) && url.hostname ? value : "";
  } catch {
    return "";
  }
}

function listingOrCompletionDate(record) {
  if (record.specialListingRoute !== "rto") return record.hkexListingDate || record.listingDate || "";
  const stage = record.practicalStage || record.hkexStage;
  return stage === "listed" ? completedRtoDate(record) : "";
}

function renderListingCell(record, showStockCode = true) {
  const listingDate = listingOrCompletionDate(record);
  const secondary = showStockCode && record.hkexListingStockCode ? `股份代号 ${record.hkexListingStockCode}` : "";
  const secondaryHtml = secondary ? `<span class="date-secondary">${escapeHtml(secondary)}</span>` : "";
  if (record.specialListingRoute === "rto" && listingDate) {
    return `<span class="date-primary">${formatDate(listingDate)}</span><span class="date-secondary">RTO完成 Completed</span>${secondaryHtml}`;
  }
  if (!showStockCode) return formatDate(listingDate);
  if (!listingDate && record.hkexPublicStatus === "Active") return "尚无本次上市日";
  return `<span class="date-primary">${formatDate(listingDate)}</span>${secondaryHtml}`;
}

function renderNoticeCell(record, compactLive = false) {
  if (record.transactionDisclosures?.kind === "reverse_takeover_filing_notice") {
    return `${formatDate(record.transactionDisclosures.signedDate)}<span class="date-secondary">反向收购备案 / RTO notice</span>`;
  }
  if (record.noticeDateBasis === "publication_date_only" && record.noticePublishedDate)
    return `公示 ${formatDate(record.noticePublishedDate)}`;
  if (!record.noticeDate && compactLive) {
    if (record.status === "not_required") return '<span class="cell-live-pill is-exempt">无需备案</span>';
    if (record.status === "applicability_pending") return '<span class="cell-live-pill is-muted">无公开备案</span>';
    if (record.status === "supplement_requested") {
      const fb = record.feedbackCount ? ` · ${record.feedbackCount}轮` : "";
      return `<span class="cell-live-pill is-review">已反馈补材料${fb}</span>`;
    }
    if (record.status === "regulator_opinion") {
      const recv = record.csrcCurrentReceivedDate || record.csrcReceivedDate;
      const elapsed = recv && typeof p0Elapsed === "function" ? p0Elapsed(recv, state.dayCountMode) : null;
      return `<span class="cell-live-pill is-review">征询意见${typeof elapsed === "number" ? ` · ${formatDayValue(elapsed)}d` : ""}</span>`;
    }
    if (record.status === "csrc_received") {
      const recv = record.csrcCurrentReceivedDate || record.csrcReceivedDate;
      const elapsed = recv && typeof p0Elapsed === "function" ? p0Elapsed(recv, state.dayCountMode) : null;
      return `<span class="cell-live-pill is-review">在审${typeof elapsed === "number" ? ` · 已历 ${formatDayValue(elapsed)}d` : ""}</span>`;
    }
    if (record.status === "waiting_received") {
      return '<span class="cell-live-pill is-waiting">待证监会接收</span>';
    }
  }
  const label = record.noticeSupersededByCurrentFiling ? "历史通知 Historical notice"
    : record.noticeDateBasis === "publication_date_fallback" ? "网页发布 Published" : "";
  return `${formatDate(record.noticeDate)}${label ? `<span class="date-secondary">${label}</span>` : ""}`;
}

function renderTrackerCapOrProgressCell(record) {
  if (isAhCandidate(record)) return formatMarketCap(record);
  if (record.listingMarketCapSampleEligible === true && Number.isFinite(record.listingMarketCapHkdBn) && record.listingMarketCapHkdBn > 0) {
    return formatListingMarketCap(record);
  }
  const notice = currentOfferingNotice(record);
  if (notice?.research) {
    const f = notice.research;
    const hi = f.offerShares * f.priceHigh / 1e8;
    const lo = f.priceLow == null ? null : f.offerShares * f.priceLow / 1e8;
    return `<span class="cell-progress-anchor">拟募 HKD ${lo == null ? "最高 " : offeringNumber(lo, 1) + "–"}${offeringNumber(hi, 1)}亿</span>`;
  }
  const apps = record.hkexPublishedApplications || [];
  const docs = apps.flatMap(a => a.documents || []);
  const hasPhip = docs.some(d => /PHIP/i.test(d.label || ""));
  if (hasPhip) return '<span class="cell-progress-anchor is-phip">PHIP 已刊发</span>';
  const apCount = docs.filter(d => /Application Proof/i.test(d.label || "")).length || apps.length;
  if (apCount > 1) return `<span class="cell-progress-anchor">第 ${apCount} 轮递表</span>`;
  if (record.hkexLatestDocumentDate) return `<span class="cell-progress-anchor">AP ${escapeHtml(record.hkexLatestDocumentDate.slice(2))}</span>`;
  return `<span class="cell-progress-anchor">${escapeHtml(issuerTypeInfo(record).primary)} · ${escapeHtml(record.hkexApplicationStatusLabelZh || record.hkexPublicStatus || "申报")}</span>`;
}

function syncTrackerTableMode() {
  const listed = state.hkexStage === "listed";
  const col4 = document.getElementById("dateColumn4Sort");
  const col5 = document.getElementById("dateColumn5Sort");
  if (col4) col4.dataset.sortField = listed ? "noticeDate" : "csrcReceivedDate";
  if (col5) col5.dataset.sortField = listed ? "hkexListingDate" : "noticeDate";
  const capSort = document.getElementById("marketCapSort");
  if (capSort) capSort.dataset.sortField = listed ? "listingMarketCapHkdBn" : "aShareMarketCapAtA1RmbBn";
  const setText = (id, text) => {
    const node = document.getElementById(id);
    if (node) node.textContent = text;
  };
  setText("dateColumn4Zh", listed ? "备案通过" : "接收");
  setText("dateColumn4En", listed ? "CSRC notice" : "First / current");
  setText("dateColumn5Zh", listed ? "上市日" : "通知书");
  setText("dateColumn5En", listed ? "Listing" : "Notice");
  setText("marketCapZh", listed ? "上市日市值" : state.structure === "a_h" ? "A1日A股市值" : "市值 / 进度");
  setText("marketCapEn", listed ? "Listing mkt cap" : "Mkt cap / progress");
  setText("marketCapMinZh", listed ? "上市总市值下限" : "A股市值下限");
  setText("marketCapMinEn", listed ? "Listing value min · HKD bn" : "A-share value min · RMB bn");
  setText("marketCapMaxZh", listed ? "上市总市值上限" : "A股市值上限");
  setText("marketCapMaxEn", listed ? "Listing value max · HKD bn" : "A-share value max · RMB bn");
  const aShareCapOption = document.getElementById("aShareMarketCapSortOption");
  const listingCapOption = document.getElementById("listingMarketCapSortOption");
  if (aShareCapOption) aShareCapOption.hidden = listed;
  if (listingCapOption) listingCapOption.hidden = !listed;
  const criteriaNote = document.getElementById("stageCriteriaNote");
  if (criteriaNote) criteriaNote.hidden = state.hkexStage !== "other";
  const dayModeBar = document.querySelector(".day-mode-bar");
  if (dayModeBar) dayModeBar.hidden = state.hkexStage === "other";
  document.querySelector(".tracker-table")?.classList.toggle("show-listing-col", state.hkexStage === "all");
}

function getBaseFilteredRecords() {
  const query = normalizeSearchText(state.query);
  const from = asDateValue(state.dateFrom);
  const to = asDateValue(state.dateTo);
  const parseCap = (raw) => {
    if (raw === "" || raw === null || raw === undefined) return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  };
  const capMin = parseCap(state.marketCapMin);
  const capMax = parseCap(state.marketCapMax);

  return state.data.records.filter((record) => {
    if (state.status !== "all" && publicStatusKey(record.status) !== publicStatusKey(state.status)) return false;
    if (state.hkexStage !== "all" && hkexListingStage(record) !== state.hkexStage) return false;
    if (state.structure !== "all" && issuerTypeKey(record) !== state.structure) return false;
    if (state.industry !== "all"
        && !effectiveIndustryMeta(record).csrcCats.includes(state.industry)
        && !effectiveIndustryMeta(record).bizTags.includes(state.industry)) return false;
    if (
      state.sponsor !== "all" &&
      !(record.sponsors || []).includes(state.sponsor) &&
      !sponsorLabels(record).includes(state.sponsor)
    ) return false;
    if (query && !getRecordText(record).includes(query)) return false;

    if (capMin !== null || capMax !== null) {
      const listedCapMode = state.hkexStage === "listed";
      const capValue = listedCapMode
        ? (record.listingMarketCapSampleEligible === true ? record.listingMarketCapHkdBn : null)
        : (record.aShareMarketCapRankEligible === true ? record.aShareMarketCapAtA1RmbBn : null);
      if (!listedCapMode && !isAhCandidate(record)) return false;
      if (!Number.isFinite(capValue) || capValue <= 0) return false;
      if (capMin !== null && capValue < capMin) return false;
      if (capMax !== null && capValue > capMax) return false;
    }

    const rawDate = state.dateField === "csrcReceivedDate"
      ? (record.csrcReceivedDate || record.csrcFirstReceivedDate || record.csrcCurrentReceivedDate)
      : state.dateField === "hkexListingDate" ? listingOrCompletionDate(record) : record[state.dateField];
    const recordDate = asDateValue(rawDate);
    if ((from || to) && !recordDate) return false;
    if (from && recordDate < from) return false;
    if (to && recordDate > to) return false;
    return true;
  });
}

function firstTextValue(values) {
  const list = Array.isArray(values) ? values : [values];
  return list
    .map((value) => String(value || "").trim())
    .filter((value) => value && value !== "待抽取" && value !== "Pending extraction")
    .sort((a, b) => a.localeCompare(b, "zh-Hans", { numeric: true, sensitivity: "base" }))[0] || "";
}

function dayMetricForField(field) {
  for (const [metric, pair] of Object.entries(dayFieldPairs)) {
    if (field === pair.calendar || field === pair.business) return metric;
  }
  return null;
}

function durationValueForDisplay(record, metric) {
  const key = dayMetricField(metric);
  return typeof record[key] === "number" ? record[key] : null;
}

function sortKey(record, field) {
  if (field === "status") return { value: statusSortRank[record.status] || 999, type: "number" };
  if (field === "industryTags") return { value: firstTextValue(record.industryTags || []), type: "text" };
  if (field === "sponsors") return { value: firstTextValue(sponsorLabels(record)), type: "text" };
  if (field === "structureType") return { value: issuerTypeInfo(record).rank, type: "number" };
  const durationMetric = dayMetricForField(field);
  if (durationMetric) return { value: durationValueForStats(record, {metric: durationMetric}), type: "number" };
  if (field === "issuerName") {
    const names = nameParts(record);
    return { value: `${names.primary || ""} ${names.secondary || ""}`.trim(), type: "text" };
  }
  if (field === "aShareMarketCapAtA1RmbBn") {
    return { value: isAhCandidate(record) && record.aShareMarketCapRankEligible === true ? record.aShareMarketCapAtA1RmbBn : null, type: "number" };
  }
  if (field === "listingMarketCapHkdBn") {
    return { value: record.listingMarketCapSampleEligible === true && typeof record.listingMarketCapHkdBn === "number" ? record.listingMarketCapHkdBn : null, type: "number" };
  }
  if (field === "noticeDate" && record.transactionDisclosures?.kind === "reverse_takeover_filing_notice") {
    return { value: asDateValue(record.transactionDisclosures.signedDate), type: "number" };
  }
  if (field === "csrcReceivedDate") {
    return { value: asDateValue(record.csrcReceivedDate || record.csrcFirstReceivedDate || record.csrcCurrentReceivedDate), type: "number" };
  }
  if (field === "hkexListingDate") return { value: asDateValue(listingOrCompletionDate(record)), type: "number" };
  if (field.endsWith("Date")) return { value: asDateValue(record[field]), type: "number" };
  return { value: record[field], type: typeof record[field] === "number" ? "number" : "text" };
}

function isMissingSortKey(key) {
  const value = key.value;
  if (value === null || value === undefined || value === "") return true;
  if (typeof value === "number") return Number.isNaN(value);
  const normalized = String(value).trim().toLowerCase();
  return ["待补", "待补充", "待披露", "pending", "n/a", "not applicable", "不适用"].includes(normalized);
}

function compareSortKeys(aKey, bKey) {
  if (aKey.type === "number" && bKey.type === "number") return aKey.value - bKey.value;
  return String(aKey.value).localeCompare(String(bKey.value), "zh-Hans", { numeric: true, sensitivity: "base" });
}

function getFilteredRecords() {
  const rows = getBaseFilteredRecords().filter(r=>!state.cohort||p0CohortEntry(r)?.month===state.cohort);
  const direction = state.sortDir === "asc" ? 1 : -1;
  const decorated = rows.map((record) => {
    const key = sortKey(record, state.sortField);
    return { record, key, missing: isMissingSortKey(key), name: String(record.issuerName) };
  });
  decorated.sort((a, b) => {
    if (a.missing && b.missing) return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    if (a.missing) return 1;
    if (b.missing) return -1;
    const compared = compareSortKeys(a.key, b.key);
    if (compared !== 0) return compared * direction;
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
  return decorated.map((item) => item.record);
}

function getUniqueOptions(getter) {
  const values = new Set();
  for (const record of state.data.records) {
    const raw = getter(record);
    const list = Array.isArray(raw) ? raw : [raw];
    for (const value of list) {
      if (value && value !== "待抽取" && value !== "Pending extraction") values.add(value);
    }
  }
  return [...values].sort((a, b) => a.localeCompare(b, "zh-Hans", { sensitivity: "base" }));
}

function populateSelect(id, options, currentValue, allLabel, stateKey) {
  const select = document.getElementById(id);
  select.innerHTML = [
    `<option value="all">${escapeHtml(allLabel)}</option>`,
    ...options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
  ].join("");
  const valid = options.includes(currentValue);
  select.value = valid ? currentValue : "all";
  if (!valid && stateKey && state[stateKey] !== "all") state[stateKey] = "all";
}

function populateFilters() {
  const structureOptions = ["a_h", "h_share", "red_chip", "de_spac", "hdr", "other"]
    .filter((key) => state.data.records.some((record) => issuerTypeKey(record) === key));
  const structureSelect = document.getElementById("structureFilter");
  if (state.structure !== "all" && !structureOptions.includes(state.structure)) state.structure = "all";
  structureSelect.innerHTML = [
    `<option value="all">全部类型</option>`,
    ...structureOptions.map((key) => {
      const info = issuerTypeInfo(key);
      return `<option value="${escapeHtml(key)}">${escapeHtml(info.primary)} · ${escapeHtml(info.secondary)}</option>`;
    })
  ].join("");
  structureSelect.value = structureOptions.includes(state.structure) ? state.structure : "all";
  populateSelect("industryFilter", getUniqueOptions((record) => record.csrcIndustryTags || []), state.industry, "全部行业", "industry");
  const sponsorOptions = getUniqueOptions((record) => sponsorLabels(record));
  if (state.sponsor !== "all" && !sponsorOptions.includes(state.sponsor)) {
    const shortName = sponsorShortName(state.sponsor);
    if (sponsorOptions.includes(shortName)) state.sponsor = shortName;
  }
  populateSelect("sponsorFilter", sponsorOptions, state.sponsor, "全部保荐人", "sponsor");
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

function durationValueForStats(record, metric) {
  return timingSample(record, metric.metric, dayMetricField(metric.metric), dayMetricField("currentA1ToReceived"),
    record.practicalStage || (record.hkexListingDate ? "listed" : state.hkexStage), record.hkexListingDate, state.data?.meta?.csrcRegimeEffectiveDate);
}

function statsFor(records, metric) {
  const entries = records
    .map((record) => ({ record, value: durationValueForStats(record, metric) }))
    .filter((entry) => typeof entry.value === "number")
    .sort((a, b) => a.value - b.value || String(a.record.issuerName).localeCompare(String(b.record.issuerName), "en", { sensitivity: "base" }));
  if (!entries.length) {
    return { count: 0, average: null, median: null, min: null, max: null, minRecord: null, maxRecord: null };
  }
  const values = entries.map((entry) => entry.value);
  const total = values.reduce((sum, value) => sum + value, 0);
  const minEntry = entries[0];
  const maxEntry = entries.find((entry) => entry.value === values[values.length - 1]);
  return {
    count: values.length,
    average: total / values.length,
    median: median(values),
    min: minEntry.value,
    max: maxEntry.value,
    minRecord: minEntry.record,
    maxRecord: maxEntry.record
  };
}

function statRecordLabel(record) {
  if (!record) return "";
  const names = nameParts(record);
  return names.primary || names.secondary || record.issuerName || record.id || "";
}

function renderExtremeStat(label, value, record, metric, sortDir) {
  if (!record || typeof value !== "number") {
    return `<div><span>${escapeHtml(label)}</span><strong>${formatDayValue(value)}</strong></div>`;
  }
  const recordLabel = statRecordLabel(record);
  return `
    <div>
      <span>${escapeHtml(label)}</span>
      <button
        class="metric-extreme-link"
        type="button"
        data-record-id="${escapeHtml(record.id)}"
        data-sort-field="${escapeHtml(dayMetricField(metric.metric))}"
        data-sort-dir="${escapeHtml(sortDir)}"
        title="按该口径排序并定位 ${escapeHtml(recordLabel)}"
      >
        <strong>${formatDayValue(value)}</strong>
        <small>${escapeHtml(recordLabel)}</small>
      </button>
    </div>
  `;
}

function renderDurationMetric(metric, stats) {
  const regimeStart = state.data?.meta?.csrcRegimeEffectiveDate || "2023-03-31";
  const isListingMetric = metric.metric === "a1ToListing";
  const startLabel = isListingMetric
    ? `仅纳入上市日≥${regimeStart}且日期顺序有效样本；密交/疑似密交/De-SPAC/HDR剔除`
    : (
      state.hkexStage === "listed"
        ? `已上市页仅纳入上市日≥${regimeStart}且日期顺序有效样本`
        : `纳入所有日期齐全且顺序有效样本 · CSRC口径≥${regimeStart}`
    );
  const metricNote = `${metric.note} · ${dayBasisNote()}`;
  const caption = stats.count
    ? `${startLabel} · ${integerFormatter.format(stats.count)} 条样本 · 平均/中位/最低/最高 · ${metricNote}`
    : `${startLabel} 暂无可统计样本 · ${metricNote}`;
  const statValue = (value) => formatDayValue(value);
  return `
    <article class="metric metric-wide duration-card">
      <div class="metric-title">
        <span class="metric-zh">${escapeHtml(metric.labelZh)}</span>
        <span class="metric-en">${escapeHtml(metric.labelEn)}</span>
      </div>
      <div class="duration-core">
        <span>平均天数</span>
        <strong>${statValue(stats.average)}</strong>
      </div>
      <div class="metric-stat-grid">
        <div><span>中位</span><strong>${statValue(stats.median)}</strong></div>
        ${renderExtremeStat("最低", stats.min, stats.minRecord, metric, "asc")}
        ${renderExtremeStat("最高", stats.max, stats.maxRecord, metric, "desc")}
      </div>
      <div class="metric-caption">${caption}</div>
    </article>
  `;
}

function p0NiceStep(rawMax) {
 const steps=[15,20,30,40,50,60,80,100,120,150,200,250,300,400,500,600];
 return steps.find(s=>s*3>=Math.max(30,rawMax))||Math.ceil(rawMax/300)*100;
}

function renderMetrics() {
 const records=getBaseFilteredRecords(),root=document.getElementById('metricsGrid'),groups=p0Cohorts(records);
 const labels=(state.hkexStage==='applying'||state.hkexStage==='other')?{a1ToReceived:'备案接收',receivedToNotice:'通知签发'}:{a1ToReceived:'备案接收',receivedToNotice:'通知签发',a1ToListing:'A1 至上市'};
 const allLabels={a1ToReceived:'备案接收',receivedToNotice:'通知签发',a1ToListing:'A1 至上市'};
 const pairs=records.map(r=>({record:r,entry:p0CohortEntry(r)})).filter(x=>x.entry);
 const donePairs=pairs.filter(x=>!x.entry.pending).sort((a,b)=>a.entry.days-b.entry.days||String(a.record.issuerName).localeCompare(String(b.record.issuerName),'en',{sensitivity:'base'}));
 const done=donePairs.map(x=>x.entry.days);
 const wait=pairs.filter(x=>x.entry.pending).map(x=>x.entry.days).sort((a,b)=>a-b);
 const totalN=pairs.length,doneN=done.length,waitN=wait.length;
 const allMid=p0Quantile(done,.5),allP25=p0Quantile(done,.25),allP75=p0Quantile(done,.75),allAvg=doneN?done.reduce((a,b)=>a+b,0)/doneN:null,allWait=p0Quantile(wait,.5);
 const fastest=donePairs[0]||null;
 const slowest=donePairs.length?donePairs.find(x=>x.entry.days===donePairs[donePairs.length-1].entry.days):null;
 const sortFieldForMetric=dayMetricField(state.cohortMetric);
 // Visual track is 100% dedicated to actual completed durations (no confusing dashed wait staircase)
 const rawMax=Math.max(30,allP75||0,...groups.flatMap(g=>[g.p75||0,...(g.pts||[])]));
 const step=p0NiceStep(rawMax),axisMax=step*3,scalePct=84;
 const pos=v=>Math.min(scalePct,Math.max(0,v/axisMax*scalePct));
 const basisText=state.dayCountMode==='business'?'工作日':'自然日';

 const extremeCell=(kicker,item,dir)=>item
  ? `<button type="button" class="stat-cell is-clickable cohort-extreme-btn" data-record-id="${escapeHtml(item.record.id)}" data-sort-field="${escapeHtml(sortFieldForMetric)}" data-sort-dir="${dir}" title="定位并查看 ${escapeHtml(statRecordLabel(item.record))}"><span class="stat-label">${kicker} ↗</span><strong class="stat-val col-num">${formatDayValue(item.entry.days)}d</strong><small class="stat-sub">${escapeHtml(statRecordLabel(item.record))}</small></button>`
  : `<div class="stat-cell"><span class="stat-label">${kicker}</span><strong class="stat-val col-num">—</strong><small class="stat-sub">暂无办结样本</small></div>`;

 const overallStrip=`<div class="terminal-stat-strip cohort-overall-strip">
  <div class="stat-cell"><span class="stat-label">全样本总中位（${basisText}）</span><strong class="stat-val col-num">${doneN?formatDayValue(allMid)+'d':'—'}</strong>${doneN>=5?`<small class="stat-sub">P25–P75 ${formatDayValue(allP25)}–${formatDayValue(allP75)}d · 均值 ${formatDayValue(allAvg)}d</small>`:doneN?`<small class="stat-sub">小样本（${doneN} 宗 · 均值 ${formatDayValue(allAvg)}d）</small>`:'<small class="stat-sub">暂无已办结样本</small>'}</div>
  <div class="stat-cell"><span class="stat-label">有效统计总数</span><strong class="stat-val col-num">${totalN} 宗</strong><small class="stat-sub">已办结 ${doneN} 宗${waitN?` · 在途 ${waitN} 宗（已等中位 ${formatDayValue(allWait)}d）`:' · 无在途'}</small></div>
  ${extremeCell('最快办结',fastest,'asc')}
  ${extremeCell('最长办结',slowest,'desc')}
 </div>`;

 let paceIntelStrip='';
 if(state.data?.records?.length){
  const allRecs=state.data.records;
  const applyingRecs=allRecs.filter(r=>hkexListingStage(r)==='applying');
  const consultRecs=applyingRecs.filter(r=>r.status==='regulator_opinion');
  const otherPendingRecs=applyingRecs.filter(r=>['waiting_received','csrc_received','supplement_requested'].includes(r.status));
  const waitRecvDays=list=>list.map(r=>p0Elapsed(r.csrcCurrentReceivedDate||r.csrcFirstReceivedDate||r.csrcReceivedDate,'calendar')).filter(x=>typeof x==='number'&&x>=0);
  const waitA1Days=list=>list.map(r=>p0Elapsed(r.currentA1Date||r.a1Date,'calendar')).filter(x=>typeof x==='number'&&x>=0);
  const cRecvMed=p0Quantile(waitRecvDays(consultRecs),0.5),cA1Med=p0Quantile(waitA1Days(consultRecs),0.5);
  const oRecvMed=p0Quantile(waitRecvDays(otherPendingRecs),0.5),oA1Med=p0Quantile(waitA1Days(otherPendingRecs),0.5);
  const suppN=applyingRecs.filter(r=>r.status==='supplement_requested').length;
  const recvN=applyingRecs.filter(r=>r.status==='csrc_received').length;
  const waitN0=applyingRecs.filter(r=>r.status==='waiting_received').length;
  const qOf=d=>{if(!d||!d.startsWith('2026-'))return null;const m=Number(d.slice(5,7));return m<=3?'26Q1':m<=6?'26Q2':m<=9?'26Q3':null;};
  const qStats=['26Q1','26Q2','26Q3'].map(q=>{
   const a1Pool=allRecs.filter(r=>qOf(r.currentA1Date||r.a1Date)===q&&r.csrcFilingApplicability!=='not_required'&&r.status!=='not_required');
   const recVals=a1Pool.map(r=>durationValueForStats(r,{metric:'a1ToReceived'})).filter(x=>typeof x==='number');
   const within90=recVals.filter(d=>d<=90).length;
   const listedQ=allRecs.filter(r=>hkexListingStage(r)==='listed'&&qOf(r.hkexListingDate)===q);
   const listVals=listedQ.map(r=>durationValueForStats(r,{metric:'a1ToListing'})).filter(x=>typeof x==='number');
   return {q,rec90:a1Pool.length?Math.round(within90/a1Pool.length*100):null,recMed:p0Quantile(recVals,0.5),listN:listVals.length,listMed:p0Quantile(listVals,0.5)};
  });
  const consultActive=state.hkexStage==='applying'&&publicStatusKey(state.status)==='regulator_opinion';
  paceIntelStrip=`<div class="pace-intel-strip">
   <div class="pace-intel-card pace-consult-card">
    <div class="pace-intel-head"><span>部委征询分流对比（在审项目）</span><div class="pace-sub-pills">
     <button type="button" class="pace-mini-chip${consultActive?' is-active':''}" data-pace-filter-status="regulator_opinion">征询意见 ${consultRecs.length}</button>
     <button type="button" class="pace-mini-chip${state.hkexStage==='applying'&&publicStatusKey(state.status)==='supplement_requested'?' is-active':''}" data-pace-filter-status="supplement_requested">补材料 ${suppN}</button>
     <button type="button" class="pace-mini-chip${state.hkexStage==='applying'&&publicStatusKey(state.status)==='csrc_received'?' is-active':''}" data-pace-filter-status="csrc_received">已接收 ${recvN}</button>
     <button type="button" class="pace-mini-chip${state.hkexStage==='applying'&&publicStatusKey(state.status)==='waiting_received'?' is-active':''}" data-pace-filter-status="waiting_received">待接收 ${waitN0}</button>
    </div></div>
    <div class="pace-consult-split">
     <button type="button" class="pace-split-box is-consult${consultActive?' is-active':''}" data-pace-filter-status="regulator_opinion">
      <span class="pace-split-label">征询主管部门意见</span>
      <strong class="col-num">${consultRecs.length} 宗 · 接收后中位 ${cRecvMed!=null?formatDayValue(cRecvMed)+'d':'—'}</strong>
      <small class="col-num">递表后已等中位 ${cA1Med!=null?formatDayValue(cA1Med)+'d':'—'}</small>
     </button>
     <button type="button" class="pace-split-box is-other" data-pace-filter-status="all">
      <span class="pace-split-label">其他公开在审（补材料 / 已接收 / 待接收）</span>
      <strong class="col-num">${otherPendingRecs.length} 宗 · 接收后中位 ${oRecvMed!=null?formatDayValue(oRecvMed)+'d':'—'}</strong>
      <small class="col-num">递表后已等中位 ${oA1Med!=null?formatDayValue(oA1Med)+'d':'—'}</small>
     </button>
    </div>
   </div>
   <div class="pace-intel-card pace-quarter-card">
    <div class="pace-intel-head"><span>2026 季度节奏走向（Q1 → Q2 → Q3）</span><small class="col-num">自然日口径 · 全样本实证</small></div>
    <div class="pace-quarter-rows">
     <div class="pace-q-row">
      <span class="pace-q-label">A1 → 接收（90日接收率 / 中位）</span>
      <strong class="col-num">${qStats.map(s=>`${s.q} <em>${s.rec90!=null?s.rec90+'%':'—'}</em> (${s.recMed!=null?formatDayValue(s.recMed)+'d':'—'})`).join(' → ')}</strong>
     </div>
     <div class="pace-q-row">
      <span class="pace-q-label">已上市 A1 → 挂牌（办结中位）</span>
      <strong class="col-num">${qStats.map(s=>`${s.q} <em>${s.listMed!=null?formatDayValue(s.listMed)+'d':'—'}</em>`).join(' → ')}<small>（${qStats.map(s=>s.listN).join(' / ')} 宗）</small></strong>
     </div>
    </div>
   </div>
  </div>`;
 }

 let scopeContextNote='';
 if(state.hkexStage==='applying'&&state.cohortMetric==='receivedToNotice'&&state.data?.records?.length){
  const fullNoticeDone=state.data.records.filter(r=>typeof durationValueForStats(r,{metric:'receivedToNotice'})==='number').length;
  if(fullNoticeDone>doneN){
   scopeContextNote=`<div class="cohort-scope-hint"><span>当前范围为「上市申请中」，多数早先获发备案通知书的企业已挂牌上市。</span><button type="button" class="action-link-btn" data-hkex-stage="all">切换全口径含已上市（${fullNoticeDone} 宗已办结）→</button></div>`;
  }
 }

 const trackContent=(n,p25,p75,mid,pts)=>{
  if(n>=5){
   const leftVal=pos(p25),widthVal=Math.max(1.2,pos(p75)-pos(p25)),labelLeft=Math.min(86,pos(p75)+1.5);
   return `<i class="cohort-iqr" style="left:${leftVal}%;width:${widthVal}%"></i><i class="cohort-median" style="left:${pos(mid)}%"></i><b class="cohort-inline-val" style="left:${labelLeft}%">${formatDayValue(mid)}d</b>`;
  }
  if(n>0){
   const maxDot=Math.max(...(pts||[mid||0]));
   const labelLeft=Math.min(86,pos(maxDot)+2);
   return `${(pts||[]).map(d=>`<i class="cohort-dot" style="left:${pos(d)}%" title="办结个案 ${formatDayValue(d)}d"></i>`).join('')}<b class="cohort-inline-val is-small-n" style="left:${labelLeft}%">${formatDayValue(mid)}d</b>`;
  }
  return '<span class="cohort-none-label">尚无办结</span>';
 };

 const totalTrack=totalN?`<div class="cohort-month cohort-total-row" title="全样本总计：办结 ${doneN}/${totalN}${doneN?`；总中位 ${formatDayValue(allMid)}d`:''}"><time>全样本总计</time><span class="cohort-track">${trackContent(doneN,allP25,allP75,allMid,done)}</span><span class="cohort-done-col col-num">办结 ${doneN}/${totalN}</span><span class="cohort-wait-col col-num">${waitN?`在途 ${waitN} · ≥${formatDayValue(allWait)}d`:'全部办结'}</span></div>`:'';

 root.innerHTML=`<section class="cohort-panel${state.cohortCollapsed?' is-collapsed':''}"><header><div class="cohort-header-left"><nav aria-label="监管阶段">${Object.entries(labels).map(([k,label])=>`<button type="button" data-cohort-metric="${k}" aria-pressed="${state.cohortMetric===k}">${label}</button>`).join('')}</nav></div><button type="button" class="cohort-toggle-btn" data-cohort-collapse aria-label="${state.cohortCollapsed?'展开月度图':'收起月度图'}" aria-expanded="${!state.cohortCollapsed}">${state.cohortCollapsed?(allLabels[state.cohortMetric]||'趋势图')+' · 展开趋势图 ↓':'收起趋势图 ↑'}</button></header>${overallStrip}${paceIntelStrip}${scopeContextNote}${state.cohortCollapsed?p0FoldedCohort(records):`<div class="cohort-labels"><span>起始月</span><span class="cohort-track cohort-axis-track" aria-hidden="true">${[0,step,step*2,step*3].map(t=>`<i class="axis-tick" style="left:${pos(t)}%">${t?t+'d':'0'}</i>`).join('')}</span><span class="col-num">已办结</span><span class="col-num">在途进度</span></div>${totalTrack}<div class="cohort-months">${groups.length?groups.map(g=>`<button type="button" class="cohort-month${state.cohort===g.month?' is-active':''}" data-cohort-month="${g.month}" title="${g.month}：办结 ${g.n}/${g.N}；${g.n?`中位 ${formatDayValue(g.mid)}d，P25–P75 ${formatDayValue(g.p25)}–${formatDayValue(g.p75)}d`:'尚无办结样本'}${g.wait!==null?`；在途 ${g.pending} 家，中位已等 ${formatDayValue(g.wait)} 天（最短 ${formatDayValue(g.waitMin)} 天）`:''}"><time>${g.month}</time><span class="cohort-track">${trackContent(g.n,g.p25,g.p75,g.mid,g.pts)}</span><span class="cohort-done-col col-num">办结 ${g.n}/${g.N}</span><span class="cohort-wait-col col-num">${g.pending?`在途 ${g.pending} · ≥${formatDayValue(g.wait)}d`:'全部办结'}</span></button>`).join(''):'<span class="cohort-empty-msg">当前筛选暂无有效月度样本</span>'}</div><p class="cohort-key"><span><i class="legend-swatch is-solid"></i>已办结四分位与中位 (n≥5)　<i class="legend-swatch is-dot"></i>小样本实证点 (1≤n&lt;5)　右列单独列示在途数量与已等下限</span><span>${state.cohort?`<button type="button" class="cohort-clear-btn" data-cohort-month="">显示全部月份 (${state.cohort} ×)</button>`:''}<time>截至 ${state.data.meta.generatedAt.slice(0,10)}</time></span></p>`}</section>`;
}

function renderDays(record) {
 const metric=state.cohortMetric||'a1ToReceived';
 const entry=typeof p0CohortEntry==='function'?p0CohortEntry(record,metric):null;
 const v=durationValueForStats(record,{metric});
 return `<span class="single-days">${typeof v==='number'?formatDayValue(v)+'d':entry?.pending?'已等 '+formatDayValue(entry.days)+'d':'—'}</span>`;
}

function renderPagination(total, pageCount, startIndex, endIndex) {
  const pagination = document.getElementById("paginationBar");
  pagination.innerHTML = `
    <div class="pagination-copy">
      <strong>第 ${formatNumber(startIndex + 1, "integer")}–${formatNumber(endIndex, "integer")} 条</strong>
      <span>共 ${formatNumber(total, "integer")} 家 · 第 ${formatNumber(state.page, "integer")} / ${formatNumber(pageCount, "integer")} 页</span>
    </div>
    <div class="pagination-actions">
      <button id="prevPage" type="button" ${state.page <= 1 ? "disabled" : ""}>上一页</button>
      <button id="nextPage" type="button" ${state.page >= pageCount ? "disabled" : ""}>下一页</button>
    </div>
  `;

  document.getElementById("prevPage").addEventListener("click", () => {
    state.page = Math.max(1, state.page - 1);
    syncUrl();
    renderRows();
  });
  document.getElementById("nextPage").addEventListener("click", () => {
    state.page = Math.min(pageCount, state.page + 1);
    syncUrl();
    renderRows();
  });
}

let lastModalTrigger = null;

function closeDetail(updateLocation=true) {
 const modal=document.getElementById('detailModal');if(!modal?.classList.contains('is-open'))return;
 modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';
 const focus=lastModalTrigger;lastModalTrigger=null;if(focus&&document.contains(focus))focus.focus({preventScroll:true});
 if(updateLocation!==false&&state.peek){state.peek='';const info=p0FromUrlInfo();if(info&&info.view===state.view&&!info.params.get('peek'))history.back();else syncUrl('replace');}
}

function openDetail(recordId, updateLocation=true, trigger=document.activeElement) {
 const record=state.data?.records.find(r=>r.id===recordId);if(!record)return;
 if(updateLocation){p0SaveLocation(trigger);const from=location.pathname+location.search;state.peek=recordId;syncUrl('push',from);}
 state.selectedId=recordId;lastModalTrigger=trigger;renderDetail(record);
 const modal=document.getElementById('detailModal');modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('detailClose')?.focus();
}

function trapModalFocus(event) {
  const modal = document.getElementById("detailModal");
  if (!modal || !modal.classList.contains("is-open") || event.key !== "Tab") return;
  const focusable = modal.querySelectorAll("button, a[href], select, input, [tabindex]:not([tabindex='-1'])");
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function selectRecord(recordId, trigger=document.activeElement) {
  openDetail(recordId,true,trigger);
}

function focusRecordInTable(recordId, sortField, sortDir, shouldOpenDetail = false, trigger = null) {
  if (!recordId) return;
  state.sortField = sortField || state.sortField;
  if (daySortFields.includes(state.sortField)) state.daySortField = state.sortField;
  state.sortDir = sortDir === "asc" ? "asc" : "desc";
  state.selectedId = recordId;
  syncControls();
  const rows = getFilteredRecords();
  const index = rows.findIndex((record) => record.id === recordId);
  if (index >= 0) state.page = Math.floor(index / PAGE_SIZE) + 1;
  syncUrl();
  renderChrome();
  renderRows();
  window.requestAnimationFrame(() => {
    const row = [...document.querySelectorAll("#trackerRows [data-record-id]")]
      .find((item) => item.dataset.recordId === recordId);
    if (row) {
      row.classList.add("is-stat-focused");
      row.scrollIntoView({ block: "center", behavior: "smooth" });
      if (!shouldOpenDetail) row.focus({ preventScroll: true });
      window.setTimeout(() => row.classList.remove("is-stat-focused"), 1400);
    }
    if (shouldOpenDetail) openDetail(recordId, true, row || trigger || document.activeElement);
  });
}

function syncStatusCounts() {
  if (!state.data?.records) return;
  const savedStatus = state.status;
  state.status = "all";
  const base = getBaseFilteredRecords();
  state.status = savedStatus;
  const counts = { all: base.length };
  for (const r of base) {
    const k = publicStatusKey(r.status);
    counts[k] = (counts[k] || 0) + 1;
  }
  const labels = {
    all: "全部",
    notice_issued: "已发通知书",
    regulator_opinion: "征询意见",
    supplement_requested: "补材料",
    csrc_received: "已接收",
    waiting_received: "尚未接收"
  };
  document.querySelectorAll(".segment[data-status]").forEach((btn) => {
    const key = btn.dataset.status;
    const n = counts[key] || 0;
    btn.innerHTML = `${labels[key] || key} <span class="seg-count">${n}</span>`;
    btn.setAttribute("aria-pressed", String(state.status === key));
  });
}

function renderRows() {
  syncStatusCounts();
  const rows = getFilteredRecords();
  renderMetrics(rows);
  const metaStrip = document.getElementById("trackerMetaStrip");
  if (metaStrip) {
    const stageName = { applying: "上市申请中", listed: "已上市", other: "搁置/撤回", all: "全部收录" }[state.hkexStage] || "全部";
    metaStrip.innerHTML = `<span>当前范围：<strong>${escapeHtml(stageName)}</strong> · 共 <strong>${formatNumber(rows.length, "integer")}</strong> 家发行人${state.cohort ? `（已筛起始月 ${escapeHtml(state.cohort)}）` : ""}</span><span class="meta-strip-hint">港交所 A1 / PHIP 与证监会境外备案公开进度</span>`;
  }

  if (!rows.length) {
    const isLoadFailure = !(state.data?.records || []).length;
    const emptyMessage = isLoadFailure
      ? "数据加载失败，请点击右上角「刷新」重试 / Data failed to load — use Refresh."
      : "当前筛选无匹配发行人，可点击「清除」重置筛选 / No matching issuer — try Clear filters.";
    const visibleColumnCount = state.hkexStage === "all" ? 12 : 10;
    document.getElementById("trackerRows").innerHTML = `
      <tr>
        <td colspan="${visibleColumnCount}" class="muted empty-row">${isLoadFailure?emptyMessage:p0EmptyState('tracker',getBaseFilteredRecords().length)}</td>
      </tr>
    `;
    document.getElementById("paginationBar").innerHTML = "";
    closeDetail(false);
    return;
  }

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  state.page = Math.min(Math.max(1, Number(state.page) || 1), pageCount);
  const startIndex = (state.page - 1) * PAGE_SIZE;
  const pageRows = rows.slice(startIndex, startIndex + PAGE_SIZE);
  const endIndex = startIndex + pageRows.length;

  if (!rows.some((record) => record.id === state.selectedId)) {
    state.selectedId = pageRows[0].id;
  }

  document.getElementById("trackerRows").innerHTML = pageRows
    .map((record) => {
      const selected = record.id === state.selectedId ? "is-selected" : "";
      const names = nameParts(record);
      const { csrcCats, bizTags, fallbackLabel: indFallback } = effectiveIndustryMeta(record);
      const industries = [
        ...csrcCats.slice(0, 2).map((tag) => `<span class="csrc-cat-tag" title="${escapeHtml(tag)}（证监会行业门类）">${escapeHtml(tag)}</span>`),
        ...bizTags.slice(0, 1).map((tag) => `<span title="${escapeHtml(tag)}">${escapeHtml(tag)}</span>`)
      ].join("");
      const sponsors = record.sponsorAppointmentStatus === "waived" ? '<span title="Sponsor appointment waived for this transaction">获豁免委聘</span>' : sponsorDisplayEntries(record)
        .slice(0, 4)
        .map((entry) => `<span title="${escapeHtml(entry.fullName)}">${escapeHtml(entry.shortName)}</span>`)
        .join("");
      const listedPage = state.hkexStage === "listed";
      return `
        <tr class="${selected}" data-record-id="${escapeHtml(record.id)}" tabindex="0" role="button" aria-label="查看 ${escapeHtml(names.primary)}">
          <td class="issuer-cell">
            <strong>${escapeHtml(names.primary)}</strong>
            <span>${escapeHtml(names.secondary)}</span>
            ${renderOfferingBadge(record)}
          </td>
          <td class="status-cell">${renderStatusBadge(record)}</td>
          <td class="date-cell">${renderA1Cell(record)}</td>
          <td class="date-cell">${listedPage ? renderNoticeCell(record, false) : renderReceivedCell(record)}</td>
          <td class="date-cell">${listedPage ? renderListingCell(record) : renderNoticeCell(record, true)}</td>
          <td class="listing-date-cell all-only-col">${renderListingCell(record, false)}</td>
          <td class="days-td">${renderDays(record)}</td>
          <td class="type-cell">${renderIssuerType(record)}</td>
          <td class="mcap-cell">${listedPage ? formatListingMarketCap(record) : renderTrackerCapOrProgressCell(record)}</td>
          <td class="mcap-cell all-only-col">${formatListingMarketCap(record)}</td>
          <td class="industry-cell"><div class="tag-list">${industries || escapeHtml(indFallback)}</div></td>
          <td><div class="tag-list">${sponsors}${renderListingRole(record)}</div></td>
        </tr>
      `;
    })
    .join("");

  renderPagination(rows.length, pageCount, startIndex, endIndex);
}

const listingPdfUrl = url => typeof url === "string" && /^https:\/\/www1?\.hkexnews\.hk\/listedco\/listconews\/sehk\/\d{4}\/\d{4}\/\d+\.pdf$/i.test(url);

function economicsRoute(record) {
  return record.listingEconomics?.route?.value || (record.specialListingRoute === "gem_to_main_transfer" ? "transfer" :
    record.specialListingRoute === "introduction" || record.listingFeeTerms?.noOffering ? "introduction" : "");
}

function renderListingFeeTerms(record) {
  const f = record.listingFeeTerms;
  if (!record.hkexListingDate || !f || !listingPdfUrl(f.url)) return "";
  const pct = n => new Intl.NumberFormat("zh-HK", { style: "percent", maximumFractionDigits: 4 }).format(n);
  const allPages = new Set();
  const collectPages = item => {
    for (const p of (Array.isArray(item?.pages) ? item.pages : [])) {
      if (Number.isInteger(p) && p > 0) allPages.add(p);
    }
  };
  const row = (label, value, item) => {
    collectPages(item);
    return `<div class="timeline-row"><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`;
  };
  const fee = f.fee || f.feeApprox;
  const rows = [fee
    ? row("保荐费（招股书披露）", `${f.fee ? "" : "约 "}${fee.currency} ${fee.value.toLocaleString("en-US")}${fee.perSponsorCount ? "（按各保荐人约定费用合计）" : ""}`, fee)
    : row("保荐费（招股书披露）", f.feeUnresolved ? "原文披露不一致" : "暂无可核实金额", f.feeUnresolved)];
  const route = economicsRoute(record);
  if (route === "introduction" || route === "transfer") {
    rows.push(row("承销佣金率", route === "transfer" ? "不适用（GEM转主板）" : "不适用（介绍上市）"));
  } else {
    if (f.rate) rows.push(row("固定承销佣金率", pct(f.rate.value), f.rate));
    if (f.hkRate) rows.push(row("香港公开发售佣金率", pct(f.hkRate.value), f.hkRate));
    if (f.intRate) rows.push(row("国际配售佣金率", pct(f.intRate.value), f.intRate));
    if (!f.rate && !f.hkRate && !f.intRate) {
      const item = f.rateConditional, d = item?.disclosure, p = item?.pages;
      const bound = Number.isFinite(d?.rate) && Object.keys(d).length === 2 && d.rate >= 0 && d.rate <= 1 && Array.isArray(p) &&
        p.length === 1 && Number.isInteger(p[0]) && p[0] > 0 && d.source === `${f.url}#page=${p[0]}`;
      rows.push(bound
        ? row("附条件承销佣金率", `${d.rate.toLocaleString("zh-HK", {style: "percent", maximumSignificantDigits: 17})}（附条件）`, item)
        : row("固定承销佣金率", item ? "附条件费率" : "待核实", item));
    }
    if (f.discMax) rows.push(row("酌情奖励费上限", f.discMax.value === 0 ? "无 (0%)" : pct(f.discMax.value), f.discMax));
    else if (f.discRate) rows.push(row("酌情奖励费率", pct(f.discRate.value), f.discRate));
  }
  const pageLinks = [...allPages].sort((a, b) => a - b)
    .map(p => `<a href="${escapeHtml(f.url)}#page=${p}" target="_blank" rel="noreferrer">招股书 p.${p}</a>`).join(" · ");
  return `<div class="detail-item"><span>发行费用条款</span><div class="timeline">${rows.join("")}</div>${pageLinks ? `<div class="econ-quiet-sources">原件页码：${pageLinks}</div>` : ""}</div>`;
}

// The exporter binds these outcome pages to an issuer. The UI checks only publisher/path syntax.
function outcomePublisher(url) {
  if (typeof url !== "string" || /[^\x21-\x7e]/.test(url)) return "";
  if (/^https:\/\/www1\.hkexnews\.hk\/listedco\/listconews\/sehk\/[0-9]{4}\/[0-9]{4}\/[0-9]{13}_c\.pdf$/.test(url)) return "HKEX";
  if (/^https:\/\/disc\.static\.szse\.cn\/disc\/disk03\/finalpage\/20[0-9]{2}-[0-9]{2}-[0-9]{2}\/[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\.PDF$/.test(url)) return "SZSE";
  if (/^https:\/\/static\.cninfo\.com\.cn\/finalpage\/20[0-9]{2}-[0-9]{2}-[0-9]{2}\/[0-9]{10}\.PDF$/.test(url)) return "CNINFO";
  return "";
}

// Source decimals are already validated. Format their digits without binary floating point.
function listingDecimal(value, minFraction = 0, shift = 0) {
  if (typeof value !== "string" || !/^\d+(?:\.\d+)?$/.test(value)) return "";
  const [whole, fraction = ""] = value.split(".");
  const integer = (whole + fraction.padEnd(shift, "0").slice(0, shift)).replace(/^0+(?=\d)/, "");
  const tail = fraction.slice(shift).replace(/0+$/, "").padEnd(minFraction, "0");
  return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (tail ? "." + tail : "");
}

function secondarySourceNote(url) {
  let host;
  try { host = new URL(url).hostname; } catch { return ""; }
  if (host === "scribd.com" || host === "www.scribd.com") return " · Scribd 转载 / Secondary repost";
  if (host === "stcn.com" || host === "www.stcn.com") return " · 证券时报转载 / Secondary media source";
  return "";
}

function renderDocumentLink(source, className = "") {
  const title = String(source?.originalLabel || source?.label || "来源 / Source").replace(
    /(?: · (?:未核验 \/ Unchecked|核验已过期 \/ Recheck due|最近核查未确认 \/ Latest check inconclusive))+$/, "");
  const url = source?.url;
  const isWebLink = /^https?:\/\//i.test(url || "");
  const dead = source?.availability === "unavailable";
  const secondary = secondarySourceNote(url).replace(/^ · /, "");
  const hint = dead ? "链接不可用 / Unavailable" : !isWebLink ? "暂无链接 / URL unavailable"
    : source.availability === "relocated" && !secondary ? "官方存档 / Archive" : secondary;
  const tooltip = hint ? ` title="${escapeHtml(hint)}"` : "";
  if (dead || !isWebLink) {
    return `<span class="${className || "muted"}" aria-disabled="true"${tooltip}>${escapeHtml(title)}</span>`;
  }
  const css = className ? ` class="${className}"` : "";
  return `<a${css} href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"${tooltip}>${escapeHtml(title)}</a>`;
}

function renderListingEconomics(record) {
  const e = record.listingEconomics;
  if (!record.hkexListingDate || !record.hkexListingStockCode || !e) return "";
  const missing = "待核实";
  const validPage = page => Number.isInteger(page) && page >= 1 && page <= 2147483647;
  const sourcesOf = f => Array.isArray(f?.sources) ? f.sources : [];
  const issued = e.actual?.sizeBasis === "issuer_issued_ipo";
  const unitsOnly = issued && e.actual?.grossMethod === "issued_units_cash_unreconciled";
  const outcomePages = new Map();
  if (e.route?.value === "offering" && (e.shoe?.value === "not_exercised" || (issued && e.shoe?.value === "no_option"))) {
    for (const s of sourcesOf(e.shoe)) {
      const publisher = outcomePublisher(s?.url);
      if (publisher && validPage(s.page)) outcomePages.set(s.url + "#page=" + s.page, publisher);
    }
  }
  const collectedLinks = new Map();
  const collectSources = (facts, allowOutcome = false) => {
    for (const f of facts) for (const s of sourcesOf(f)) {
      if (typeof s?.url !== "string" || /[^\x21-\x7e]/.test(s.url)) continue;
      const year = String(record.hkexListingDate).slice(0, 4);
      if (f === e.route && /^\d{4}$/.test(year) && s.url === "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR" + year + "_Eng.xlsx" &&
          Number.isSafeInteger(s.row) && s.row > 0 && s.row <= 1048576) {
        collectedLinks.set(s.url + ":" + s.row, '<a target="_blank" rel="noreferrer" href="' + escapeHtml(s.url) + '">港交所新股月报 #' + s.row + '</a>');
        continue;
      }
      if (!validPage(s.page)) continue;
      const href = s.url + "#page=" + s.page;
      const issueField = issued && (f === e.actual.shares || f === e.actual.gross || f === e.actual.estimate ||
        (unitsOnly && (f === e.actual.reportedGross || f === e.actual.unitsTimesPrice)));
      const publisher = (allowOutcome && issueField && outcomePublisher(s.url)) ||
        (allowOutcome && outcomePages.get(href)) || (listingPdfUrl(s.url) && "PDF");
      if (!publisher) continue;
      const file = s.url.split("/").pop();
      const shortPub = publisher === "PDF" ? "披露文件" : publisher === "HKEX" ? "绿鞋公告" : publisher;
      collectedLinks.set(href, '<a target="_blank" rel="noreferrer" href="' + escapeHtml(href) +
        '" title="' + escapeHtml(file) + '">' + shortPub + " p." + s.page + "</a>");
    }
  };
  const pct = f => {
    const digits = listingDecimal(f?.value, 0, 2);
    return digits ? digits + "%" : missing;
  };
  const moneyExact = (p, f) => {
    const digits = listingDecimal(f?.value, 2);
    return digits ? `${p.currency} ${digits}` : "";
  };
  const moneyClean = (p, f) => {
    if (!f?.value) return missing;
    const num = Number(f.value);
    const exact = moneyExact(p, f);
    if (Number.isFinite(num) && num >= 1e5) {
      return `<span title="${escapeHtml(exact)}">${escapeHtml(formatChineseUnitAmount(num, p.currency))}</span>`;
    }
    return escapeHtml(exact || missing);
  };
  const priceClean = (p, f) => {
    const digits = listingDecimal(f?.value, 2);
    return digits ? escapeHtml(`${p.currency} ${digits}`) : missing;
  };
  const reasons = {
    cap: "仅披露上限", nonuniform: "分档费率", unallocated: "基数待定", conditional: "附条件费率"
  };
  const states = {
    not_exercised: "超额配股权未行使",
    no_option: "无超额配股权",
    partial: "部分行使",
    full: "全额行使",
    exercised: "已行使",
    confirmed_zero: "无额外配发"
  };
  const rowHtml = (label, valHtml) => `<div class="econ-line"><dt>${escapeHtml(label)}</dt><dd><strong class="col-num">${valHtml}</strong></dd></div>`;

  const kind = economicsRoute(record);
  let body = "";
  if (kind === "introduction" || kind === "transfer") {
    collectSources([e.route], false);
    body = `<p class="econ-note">${kind === "introduction" ? "介绍上市（无公开发售募资）" : "GEM 转主板（无公开发售募资）"}</p>`;
  } else if (!e.route) {
    body = `<p class="econ-note">${missing}</p>`;
  } else {
    const o = e.offered || {}, a = e.actual || null;
    collectSources([o.gross, o.shares, o.price, o.rate, o.basis, o.estimate, o.tranches?.hk?.gross, o.tranches?.hk?.rate, o.tranches?.international?.gross, o.tranches?.international?.rate], false);
    collectSources([e.shoe], true);
    if (a) collectSources([a.gross, a.shares, a.price, a.rate, a.basis, a.estimate, a.reportedGross, a.unitsTimesPrice], true);

    const shoeText = states[e.shoe?.value] || (e.shoe?.value === "pending" || (!e.shoe && !a) ? "稳定期或待披露" : "待核实");
    const sameAsBase = Boolean(
      a &&
      !issued &&
      a.gross?.value &&
      o.gross?.value &&
      a.gross.value === o.gross.value &&
      (!a.shares?.value || a.shares.value === o.shares?.value)
    );
    const hasDistinctActual = Boolean(a && !sameAsBase && (a.gross?.value || a.shares?.value));
    const shareUnit = e.unit === "HDR" ? "份预托证券" : "股";

    if (!hasDistinctActual) {
      const rows = [
        rowHtml("发售募集总额", o.gross ? moneyClean(o, o.gross) : missing),
        o.shares ? rowHtml("发售股数", escapeHtml(`${listingDecimal(o.shares.value) || missing} ${shareUnit}`)) : "",
        o.price ? rowHtml("最终发售价", priceClean(o, o.price)) : "",
        o.rate ? rowHtml("固定承销费率", escapeHtml(pct(o.rate))) : "",
        ...(["hk", "international"].map(k => {
          const t = o.tranches?.[k];
          if (!t) return "";
          return rowHtml(k === "hk" ? "香港公开发售部分" : "国际配售部分", `${moneyClean(o, t.gross)} × ${escapeHtml(pct(t.rate))}`);
        })),
        rowHtml("固定承销佣金", o.estimate ? moneyClean(o, o.estimate) : escapeHtml(reasons[o.basis?.value] || missing)),
        rowHtml("超额配股权", escapeHtml(shoeText))
      ].filter(Boolean);
      body = `<dl class="econ-clean-list">${rows.join("")}</dl>`;
    } else {
      const topMeta = [
        o.price ? `<span>最终发售价 <strong class="col-num">${priceClean(o, o.price)}</strong></span>` : "",
        o.rate ? `<span>固定费率 <strong class="col-num">${escapeHtml(pct(o.rate))}</strong></span>` : "",
        `<span>超额配股权 <strong>${escapeHtml(shoeText)}</strong></span>`
      ].filter(Boolean).join("");
      const colCard = (title, p, isFinal) => {
        const rows = [
          rowHtml(isFinal && issued ? "新发募集总额" : "募集总额", p?.gross ? moneyClean(p, p.gross) : missing),
          p?.shares ? rowHtml(isFinal && issued ? "新发股数" : "发售股数", escapeHtml(`${listingDecimal(p.shares.value) || missing} ${shareUnit}`)) : "",
          isFinal && unitsOnly && p?.reportedGross ? rowHtml("披露募集总额", moneyClean(p, p.reportedGross)) : "",
          rowHtml("固定承销佣金", p?.estimate ? moneyClean(p, p.estimate) : escapeHtml(reasons[p?.basis?.value] || missing))
        ].filter(Boolean);
        return `<section class="econ-phase-col"><h4>${escapeHtml(title)}</h4><dl class="econ-clean-list">${rows.join("")}</dl></section>`;
      };
      body = `<div class="econ-shared-strip">${topMeta}</div><div class="econ-dual-cols">${colCard("绿鞋前基础发售", o, false)}${colCard(issued ? "最终发行（发行人新股）" : "绿鞋行使后最终发售", a, true)}</div>`;
    }
  }
  const footerLinks = collectedLinks.size ? `<div class="econ-quiet-sources">原件页码：${[...collectedLinks.values()].slice(0, 6).join(" · ")}</div>` : "";
  return `<div class="detail-item listing-economics"><span>发行规模与承销佣金</span>${body}${footerLinks}</div>`;
}

function renderTransactionDisclosures(record) {
  const event = record.transactionDisclosures;
  if (!event) return "";
  const rows = [];
  const row = (label, value) => rows.push(
    `<div class="timeline-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`
  );
  let title;
  if (event.kind === "reverse_takeover_filing_notice") {
    title = "反向收购备案 / Reverse takeover filing";
    row("通知书收件人 / Addressee", event.recipient);
    row("备案通知书 / CSRC notice", event.noticeNumber);
    row("通知书落款 / Signed", formatDate(event.signedDate));
    row("证监会公布 / Published", formatDate(event.publishedDate));
    row("反向收购完成 / Merger completed", formatDate(event.completionDate));
  } else if (event.kind === "holding_company_substitution") {
    title = "控股公司重组及介绍上市 / Holding-company substitution";
    row("原上市公司 / Predecessor", event.predecessorNameZh + " · " + event.predecessorName);
    row("新上市公司 / Successor", event.successorNameZh + " · " + event.successorName);
    row("股东表决通过 / Shareholders approved", formatDate(event.schemeMeetingDate));
    row("法院批准 / Court approval", formatDate(event.courtApprovalDate));
    row("重组计划生效 / Scheme effective", formatDate(event.schemeEffectiveDate));
    row("介绍上市并开始买卖 / Trading began", formatDate(event.mainBoardTradingDate));
  } else if (event.kind === "indirect_transition_disclosure") {
    title = "备案过渡期披露 / CSRC transition disclosure";
    row("发行人招股书 / Prospectus", formatDate(event.prospectusDate));
    row("备案安排", event.issuerDisclosureZh);
    row("Filing arrangements", event.issuerDisclosureEn);
    row("主板开始买卖 / Main Board trading began", formatDate(event.mainBoardTradingDate));
  } else if (event.kind === "gem_board_transfer") {
    title = "GEM 转主板 / Board transfer";
    row("股票代码 / Stock codes", `GEM ${event.gemCode} → 主板 ${event.stockCode}`);
    row("向港交所申请转板 / Transfer application", formatDate(event.applicationDate));
    if (event.resubmissionDate) row("再次递交转板申请 / Resubmission", formatDate(event.resubmissionDate));
    row("港交所原则批准 / HKEX approval in principle", formatDate(event.approvalInPrincipleDate));
    row("转板公告 / Announcement published", formatDate(event.announcementPublishedDate));
    row("主板开始买卖 / Main Board trading began", formatDate(event.mainBoardTradingDate));
    if (event.reportDisclosure) {
      const report = event.reportDisclosure;
      const label = report.status === "intended" ? "公司拟于转板完成并公告后三个工作日内向证监会报告" :
        "公司披露须于转板完成并公告后三个工作日内向证监会报告";
      row("转板后报告 / Post-transfer report", label);
      row("实际提交日期 / Actual submission date", "尚无公开确认 / Unconfirmed");
    }
  } else return "";
  const links = Object.values(event.sources).map(source =>
    `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.locator)}</a>`
  ).join(" · ");
  return `<div class="detail-item"><span>${escapeHtml(title)}</span><div class="timeline">${rows.join("")}</div><small class="source-list">${links}</small></div>`;
}

function renderDetail(record) {
  const detail = document.getElementById("issuerDetail");
  if (!record) {
    detail.innerHTML = `<div class="muted">请选择发行人 / Select an issuer.</div>`;
    return;
  }
  const names = nameParts(record);
  const sponsorList = record.sponsorAppointmentStatus === "waived" ? '<div class="sponsor-detail"><strong>获豁免委聘保荐人</strong><span>Sponsor appointment waived for this transaction</span></div>' : sponsorDisplayEntries(record)
    .map(
      (entry) => {
        const spId = sponsorIdForName(entry.fullName) || sponsorIdForName(entry.shortName);
        return `
        <div class="sponsor-detail">
          <div class="sponsor-detail-head">
            <strong title="${escapeHtml(entry.fullName)}">${escapeHtml(entry.shortName)}</strong>
            ${spId ? `<button type="button" class="sponsor-jump-link" data-global-firm="${escapeHtml(spId)}">保荐人龙虎榜 →</button>` : ""}
          </div>
          <span>${escapeHtml(entry.fullName)}</span>
          ${entry.registered ? `<a href="https://apps.sfc.hk/publicregWeb/corp/${encodeURIComponent(entry.registered.ce)}/details" target="_blank" rel="noopener noreferrer">${escapeHtml(entry.registered.legalNameZh)} · SFC ${escapeHtml(entry.registered.ce)}</a>` : ""}
        </div>
      `;
      }
    )
    .join("");
  const industryEn = record.industryTagEn ? `<span class="pending-en">${escapeHtml(record.industryTagEn)}</span>` : "";
  const { csrcCats: detailCats, bizTags: detailBiz, fallbackLabel: detailIndFallback } = effectiveIndustryMeta(record);
  const industryList = [
    ...detailCats.map((tag) => `<span class="csrc-cat-tag">${escapeHtml(tag)}</span>`),
    ...detailBiz.map((tag) => `<span>${escapeHtml(tag)}</span>`)
  ].join("") + industryEn;
  const regulatorLabels = {
    "MIIT_工信": "工信部 MIIT",
    "CAC_网信数据": "网信办 CAC",
    "NMPA_药监医疗": "药监局 NMPA",
    "NHC_卫健": "卫健委 NHC",
    "MOE_教育": "教育部 MOE",
    "PBOC_NFRA_finance": "央行/金监局 PBOC·NFRA",
    "NDRC_energy": "发改委 NDRC",
    "MNR_resources": "自然资源部 MNR",
    "MEE_environment": "生态环境部 MEE",
    "MOHURD_real_estate": "住建部 MOHURD",
    "SAMR_consumer": "市监总局 SAMR",
    "MCT_tourism": "文旅部 MCT",
    "CSRC_filing_direct_overseas": "证监会 CSRC"
  };
  const regulatorList = (record.regulatoryTags || []).map((tag) => `<span>${escapeHtml(regulatorLabels[tag] || tag)}</span>`).join("");
  const sourceLinks = (record.sourceLinks || [])
    .filter((source) => /^https?:\/\//i.test(String(source.url || "")))
    .map((source) => renderDocumentLink(source))
    .join("");
  const feedbackItems = (record.feedbackItems || [])
    .map((item) => {
      const text = String(item.questionText || "");
      const lead = text.slice(0, 220);
      const rest = text.slice(220);
      const body = rest
        ? `<p>${escapeHtml(lead)}…</p><details><summary>展开全文 Show full text</summary><p>${escapeHtml(text)}</p></details>`
        : `<p>${escapeHtml(text)}</p>`;
      return `
        <article class="feedback-card">
          <strong>${escapeHtml(item.publishedDate || "")} · ${escapeHtml(item.title || "补充材料")}</strong>
          ${body}
        </article>
      `;
    })
    .join("");
  const timelineFlagLabels = {
    hkex_public_first_a1_before_current_local_a1: "曾有更早A1 Earlier A1 cycle",
    csrc_received_before_timeline_anchor_possible_mismatch: "接收早于A1锚点 Received before A1 anchor",
    csrc_received_before_current_a1_after_public_first_a1: "接收属前一周期 Received in prior cycle",
    csrc_notice_before_timeline_anchor_possible_mismatch: "通知书早于公开A1 Notice before public A1",
    csrc_notice_before_current_a1_after_public_first_a1: "通知书属前一周期 Notice in prior cycle",
    csrc_notice_before_received_chronology_conflict: "通知书早于最新接收 Notice predates latest receipt",
    notice_without_status_received_match: "有通知书无接收记录 Notice without received date",
    status_without_notice_match: "已接收待通知书 Received, notice pending",
    feedback_before_timeline_anchor_possible_mismatch: "补充材料早于A1 Feedback before A1",
    filing_not_required_no_csrc_notice_expected: "无需备案，无通知书 Not required, no notice expected",
    csrc_official_status_conflict_same_snapshot: "同一官方快照状态冲突 Official status conflict",
    hkex_phip_public_no_observed_a1: "PHIP已公开但无可观察A1 PHIP public, A1 unobserved",
    same_day_notice_without_status_received_match_possible_missing_anchor: "通知书与A1同日 Notice same day as A1"
  };
  const timelineFlags = (record.timelineFlags || [])
    .map((flag) => timelineFlagLabels[flag])
    .filter(Boolean)
    .slice(0, 5)
    .map((label) => `<span>${escapeHtml(label)}</span>`)
    .join("");
  const historicalAnchorLine = record.historicalTimelineAnchorDate && record.historicalTimelineAnchorDate !== record.a1Date
    ? `<div class="timeline-row"><span>历史最早 A1</span><strong>${formatDate(record.historicalTimelineAnchorDate)}</strong></div>`
    : "";
  const dayFields = {
    a1ToReceived: dayMetricField("a1ToReceived"),
    currentA1ToReceived: dayMetricField("currentA1ToReceived"),
    receivedToNotice: dayMetricField("receivedToNotice"),
    a1ToNotice: dayMetricField("a1ToNotice"),
    a1ToListing: dayMetricField("a1ToListing")
  };
  const dayUnit = dayUnitLabel();
  const listedPage = state.hkexStage === "listed" || ((state.view === "directory" || state.hkexStage === "all") && isHkexListed(record));
  const matchedTx = txForRecord(record);
  const listedTimelineRows = listedPage
    ? `
          <div class="timeline-row"><span>${record.transactionDisclosures?.kind === "holding_company_substitution" ? "重组计划文件" : "港交所招股章程"}</span><strong>${formatDate(record.hkexProspectusDate)}</strong></div>
          <div class="timeline-row"><span>港交所挂牌日</span><strong>${formatDate(record.hkexListingDate)}</strong></div>
      `
    : "";
  const daysRows = listedPage
    ? `
          <div><span>首次 A1 至备案通过</span><strong>${formatDayNumber(durationValueForDisplay(record, "a1ToNotice"), dayUnit)}</strong></div>
          <div><span>首次 A1 至挂牌</span><strong>${formatDayNumber(durationValueForDisplay(record, "a1ToListing"), dayUnit)}</strong></div>
      `
    : `
          <div><span>备案计时至接收</span><strong>${formatDayNumber(durationValueForStats(record, {metric:"a1ToReceived"}), dayUnit)}</strong></div>
          ${!record.a1ReceiptTiming && hkexListingStage(record) !== "listed" && record.calendarDaysA1ToReceived > 180 ? `<div><span>历史 A1 至接收</span><strong>${formatDayNumber(record[dayFields.a1ToReceived], dayUnit)}</strong></div>` : ""}
          ${record.a1ReceiptTiming ? record.a1ReceiptTiming.cycles.map(cycle => `<div><span>${cycle.a1Date} → ${cycle.receivedDate}<br><a href="${escapeHtml(cycle.a1SourceUrl)}" target="_blank" rel="noreferrer">A1</a> · <a href="${escapeHtml(cycle.receivedSourceUrl)}" target="_blank" rel="noreferrer">接收</a></span><strong>${formatDayNumber(cycle[state.dayCountMode === "business" ? "businessDays" : "calendarDays"], dayUnit)}</strong></div>`).join("") : "" }
          ${!record.a1ReceiptTiming?.cycles.some(cycle=>cycle.a1Date===record.currentA1Date&&cycle.receivedDate===record.csrcCurrentReceivedDate) ? `<div><span>当前 A1 至当前接收</span><strong>${formatDayNumber(record[dayFields.currentA1ToReceived], dayUnit)}</strong></div>` : ""}
          <div><span>接收至备案通知</span><strong>${formatDayNumber(record[dayFields.receivedToNotice], dayUnit)}</strong></div>
          <div><span>备案锚点至通知</span><strong>${formatDayNumber(record[dayFields.a1ToNotice], dayUnit)}</strong></div>
      `;

  const noticePredatesKnownAnchor = (record.timelineFlags || []).includes(
    "csrc_notice_before_timeline_anchor_possible_mismatch",
  );
  const confidentialAnchorLabel =
    record.hkexConfidentialFilingDate === record.a1Date
      ? noticePredatesKnownAnchor
        ? "已观察密交AP日 Observed confidential AP"
        : "密交A1锚点 Confidential A1 anchor"
      : "备案A1锚点 A1 anchor";

  const matchedRound = typeof eligibleFeeRoster === "function"
    ? eligibleFeeRoster().find((r) => r.issuerId === record.id)
    : null;
  const qualityMap = {
    complete: "公开节点齐全",
    complete_public_dates: "公开节点齐全",
    partial_public_dates: "按已公开节点核录",
    as_of_received: "接收日采用官方截至快照"
  };
  const qualityLabel = qualityMap[record.timelineQuality] || "按已公开节点核录";

  detail.innerHTML = `
    <div class="detail-header">
      <div>
        <h2>${escapeHtml(names.primary)}</h2>
        <div class="muted">${escapeHtml(names.secondary)}</div>
      </div>
      <div class="detail-header-actions">
        ${matchedRound ? `<a class="dossier-jump-btn" href="${escapeHtml(p0DossierUrl(matchedRound.id))}" data-global-round="${escapeHtml(matchedRound.id)}">${matchedRound.route === "paused_offer" ? "搁置发售档案" : "发行与费用档案"} (${escapeHtml(matchedRound.code)}) →</a>` : ""}
        ${matchedTx ? `<a class="dossier-jump-btn is-tx" href="${escapeHtml(transactionUrl(matchedTx.id))}" data-global-tx="${escapeHtml(matchedTx.id)}">${record.specialListingRoute === "rto" ? "RTO 反向收购先例拆解" : "交易与重组先例"} →</a>` : ""}
      </div>
    </div>
    ${p0RegulatoryTimeline(record.id, { includeLiveTail: true, compactHeader: true })}
    <div class="detail-grid">
      <div class="detail-item">
        <span>备案与上市状态</span>
        <strong>${renderStatusBadge(record)}</strong>
        ${renderIssuerDisclosure(record)}
        ${renderHkexStatusEvidence(record)}
        ${renderHkexPostings(record)}
        ${record.csrcFilingApplicability && record.csrcFilingApplicability !== "pending" ? `<div class="muted">备案适用性：${escapeHtml({required: "适用", not_required: "无需备案", pending: "待核实"}[record.csrcFilingApplicability] || "")}</div>` : ""}
        ${record.status === "applicability_pending" ? `<div class="muted">证监会公示中未匹配到本次上市的备案记录。<a href="https://www.csrc.gov.cn/csrc/c101935/zfxxgk_zdgk.shtml" target="_blank" rel="noreferrer">查阅证监会公示 ↗</a></div>` : ""}
        ${record.csrcFilingReportingRequired ? `<div>转板后须向证监会报告</div>` : ""}
        ${record.csrcFilingApplicabilityReason && record.csrcFilingApplicability !== "pending" ? `<details><summary>备案依据说明</summary>${record.csrcFilingApplicabilityReasonZh ? `<p>${escapeHtml(record.csrcFilingApplicabilityReasonZh)}</p>` : ""}<p>${escapeHtml(record.csrcFilingApplicabilityReason)}</p>${record.csrcFilingEvidenceLocator ? `<p>${escapeHtml(record.csrcFilingEvidenceLocator)}</p>` : ""}${(record.csrcFilingApplicabilitySourceUrls || []).filter((url) => /^https:\/\//.test(url)).map((url) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">原件来源 ↗</a>`).join(" · ")}</details>` : ""}
      </div>
      <div class="detail-item">
        <span>申报与备案时间线</span>
        <div class="timeline">
          ${submissionDateRows(record) || `
          <div class="timeline-row"><span>${confidentialAnchorLabel.replace(/\s+[A-Za-z].*$/, "")}</span><strong>${formatDate(record.a1Date)}</strong></div>
          ${record.hkexConfidentialFilingDate && record.hkexConfidentialFilingDate !== record.a1Date ? `<div class="timeline-row" title="密交递交 Confidential filing · ${escapeHtml(record.hkexConfidentialFilingEvidence || "")}"><span>密交递交</span><strong>${formatDate(record.hkexConfidentialFilingDate)}</strong></div>` : ""}
          ${record.hkexConfidentialFilingDate && (record.hkexPublicFirstPostingDate || record.currentA1Date) ? `<div class="timeline-row"><span>公开 A1</span><strong>${formatDate(record.hkexPublicFirstPostingDate || record.currentA1Date)}</strong></div>` : ""}
          ${record.statsAnchorDate && record.statsAnchorDate !== record.a1Date ? `<div class="timeline-row"><span>统计锚点（新规后首轮 A1）</span><strong>${formatDate(record.statsAnchorDate)}</strong></div>` : ""}
          ${historicalAnchorLine}
          <div class="timeline-row"><span>当前 A1</span><strong>${formatDate(record.currentA1Date)}</strong></div>
          `}
          <div class="timeline-row"><span>${record.csrcReceivedDateIsAsOf ? "首轮接收状态" : "首轮接收"}</span><strong>${renderReceivedDateValue(record.csrcFirstReceivedDate || record.csrcReceivedDate, record.csrcReceivedDateIsAsOf)}</strong></div>
          <div class="timeline-row"><span title="后续备案轮次接收 Later-cycle received">${isLaterCycleReceived(record) ? "后续备案轮次接收" : (record.csrcCurrentReceivedDateIsAsOf ? "当前接收状态" : "当前接收")}</span><strong>${renderReceivedDateValue(record.csrcCurrentReceivedDate, record.csrcCurrentReceivedDateIsAsOf)}</strong></div>
          ${(record.fullCirculationNotices || []).filter((item) => /^https?:\/\//.test(item.sourceUrl || "")).map((item) =>
            `<div class="timeline-row"><span>全流通备案通知书</span><strong><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer" title="${escapeHtml(item.title || "")}">${escapeHtml(item.noticeDate || item.publishedDate || "查看通知书")} ↗</a></strong></div>`
          ).join("")}
          <div class="timeline-row"><span>${record.noticeSupersededByCurrentFiling ? "历史备案通知书" : "备案通知书"}</span><strong>${renderNoticeCell(record)}</strong></div>
          ${record.noticePublishedDate && record.noticePublishedDate !== record.noticeDate ? `<div class="timeline-row"><span>通知网页发布日</span><strong>${formatDate(record.noticePublishedDate)}</strong></div>` : ""}
          ${record.transactionCompletionDate && record.transactionDisclosures?.kind !== "reverse_takeover_filing_notice" ? `<div class="timeline-row"><span>反向收购完成日</span><strong>${formatDate(record.transactionCompletionDate)}</strong></div>` : ""}
          ${listedTimelineRows}
        </div>
      </div>
      <div class="detail-item">
        <span>阶段耗时 · ${dayUnit}</span>
        <div class="detail-days">
          ${daysRows}
        </div>
      </div>
      <div class="detail-item">
        <span>发行人类别</span>
        <strong>${renderIssuerType(record)}</strong>
      </div>
      <div class="detail-item">
        <span>${listedPage ? "上市日总市值" : "A 股状态与估值"}</span>
        <div>${listedPage ? `<div class="market-cap-detail">${formatListingMarketCap(record)}</div>` : `${escapeHtml(record.aShareStatus)}<div class="market-cap-detail">${formatMarketCap(record)}</div>`}${renderValuationDetails(record, listedPage)}</div>
      </div>
      <div class="detail-item">
        <span>行业分类</span>
        <div class="tag-list">${industryList || escapeHtml(detailIndFallback)}</div>
      </div>
      ${record.historicalApplicantIndustry?.scope === "original_applicant_group_as_filed" ? `
        <div class="detail-item">
          <span>原申请人集团行业（合并前）</span>
          <div>${escapeHtml(record.historicalApplicantIndustry.legalIssuer)} · ${escapeHtml(record.historicalApplicantIndustry.code)} ${escapeHtml(record.historicalApplicantIndustry.label)}</div>
          <div>申请编号 ${escapeHtml(record.historicalApplicantIndustry.applicationId)} · AP ${escapeHtml(record.historicalApplicantIndustry.apDate)} · 财务期末 ${escapeHtml(record.historicalApplicantIndustry.periodEnd)}</div>
        </div>` : ""}
      <div class="detail-item">
        <span>行业与主管部门语境</span>
        <div class="tag-list">${regulatorList || '<span>常规境外上市备案</span>'}</div>
      </div>
      <div class="detail-item">
        <span>时间线核验说明</span>
        <div class="tag-list">${timelineFlags || `<span>${escapeHtml(qualityLabel)}</span>`}</div>
      </div>
      <div class="detail-item">
        <span>保荐机构与协调人</span>
        <div class="sponsor-detail-list">${(sponsorList + renderListingRole(record, true)) || "<span>待披露</span>"}</div>
      </div>
      ${renderTransactionDisclosures(record)}
      ${renderIssuerFees(record)}
      ${renderListingEconomics(record)}
      <div class="detail-item">
        <span>证监会补充材料要求</span>
        <div>${escapeHtml(record.feedbackStatus)}</div>
        ${feedbackItems ? `<div class="feedback-list">${feedbackItems}</div>` : ""}
      </div>
      <div class="detail-item">
        <span>公开披露原件</span>
        <div class="source-list">${sourceLinks || '<span class="muted">暂无公开链接</span>'}</div>
      </div>
    </div>
  `;
}

function trackerTitle() {
  const stageTitles = {
    all: "监管节奏追踪 · 全部",
    applying: "监管节奏追踪 · 上市申请中",
    listed: "监管节奏追踪 · 已上市",
    other: "监管节奏追踪 · 搁置/撤回"
  };
  return stageTitles[state.hkexStage] || "监管节奏追踪";
}

// ============================================================
// 项目总录 (HKEX AP & Listing Master Directory — 858 Issuers)
// ============================================================
function isChapter18Record(record) {
  if (/- ?[bBpPcC]\b/.test(record.issuerName || "")) return true;
  const hay = [...(record.industryTags || []), ...(record.statusTags || []), record.structureType || ""].join(" ");
  return /18[AC]/i.test(hay);
}

function latestHkexDoc(record) {
  const apps = record.hkexPublishedApplications || [];
  const docs = apps.flatMap(a => a.documents || []).filter(d => d && d.date);
  const rankDoc = label => /PHIP/i.test(label) ? 4 : /Application Proof.*Revised/i.test(label) ? 3 : /Application Proof/i.test(label) ? 2 : /OC Announcement/i.test(label) ? 1 : 0;
  docs.sort((a, b) => b.date.localeCompare(a.date) || rankDoc(b.label) - rankDoc(a.label));
  const roundCount = docs.filter(d => /Application Proof/i.test(d.label || "")).length || apps.length;
  const liveBook = liveBookbuildingOffers().find(b => b.issuerId === record.id);
  if (liveBook) {
    return { kind: "bookbuilding", labelZh: liveBook.isRelaunch ? "搁置后重启招股中" : "公开招股中", date: liveBook.prospectusDate, url: liveBook.sources?.[0] || "", count: docs.length, roundCount, liveBook };
  }
  const notice = currentOfferingNotice(record);
  if (notice) {
    return { kind: "paused_offer", labelZh: offeringNoticeLabels(notice)[2], date: notice.date, url: notice.url, count: docs.length, roundCount };
  }
  const listDate = listingOrCompletionDate(record);
  if (hkexListingStage(record) === "listed" && listDate) {
    const routeLabel = record.specialListingRoute === "rto"
      ? "RTO 反向收购完成"
      : record.specialListingRoute === "introduction"
        ? "介绍上市挂牌"
        : record.specialListingRoute === "de_spac"
          ? "De-SPAC 并购挂牌"
          : record.specialListingRoute === "gem_to_main_transfer"
            ? "GEM 转主板挂牌"
            : "港交所挂牌";
    return { kind: "listed", labelZh: routeLabel, date: listDate, url: record.transactionCompletionSourceUrl || record.hkexListingSourceUrl || "", count: docs.length, roundCount };
  }
  if (docs.length) {
    const top = docs[0], lbl = top.label || "";
    const kind = /PHIP/i.test(lbl) ? "phip" : /Application Proof.*Revised/i.test(lbl) ? "ap_revised" : /Application Proof/i.test(lbl) ? "ap_first" : "oc";
    const labelZh = kind === "phip" ? "PHIP 聆讯后" : kind === "ap_revised" ? "修订 AP" : kind === "ap_first" ? "首次 AP" : /Termination/i.test(lbl) ? "OC 变更" : "OC 委任";
    return { kind, labelZh, date: top.date, url: top.url || "", count: docs.length, roundCount };
  }
  if (record.hkexConfidentialFilingDate) {
    return { kind: "confidential", labelZh: "密交申请", date: record.hkexConfidentialFilingDate, url: "", count: 0, roundCount: 1 };
  }
  if (record.currentA1Date || record.a1Date) {
    return { kind: "a1", labelZh: record.hkexApplicationStatusLabelZh || "A1 递表", date: record.currentA1Date || record.a1Date, url: "", count: 0, roundCount: 1 };
  }
  return { kind: "notice", labelZh: "证监会公示", date: record.noticeDate || record.csrcReceivedDate || "", url: "", count: 0, roundCount: 0 };
}

function directoryActivityDate(record) {
  const doc = latestHkexDoc(record);
  return [record.hkexLatestDocumentDate, doc.date, record.currentA1Date, listingOrCompletionDate(record), record.noticeDate, record.a1Date].filter(Boolean).sort().pop() || "";
}

function directoryRecent30Cutoff() {
  const asOf = state.data?.meta?.generatedAt?.slice(0, 10) || P0_WAITING.asOf;
  const ts = Date.parse(`${asOf}T00:00:00Z`);
  if (!Number.isFinite(ts)) return "";
  return new Date(ts - 30 * 864e5).toISOString().slice(0, 10);
}

function isDirectoryRecent30(record) {
  const cutoff = directoryRecent30Cutoff();
  return Boolean(cutoff) && directoryActivityDate(record) >= cutoff;
}

function directoryRecordMatchesDocStatus(record, docFilter) {
  if (!docFilter || docFilter === "all") return true;
  if (docFilter === "recent30") return isDirectoryRecent30(record);
  if (docFilter === "listed") return hkexListingStage(record) === "listed";
  if (docFilter === "paused_offer") return Boolean(currentOfferingNotice(record));
  const docs = (record.hkexPublishedApplications || []).flatMap(a => a.documents || []);
  if (docFilter === "phip") return docs.some(d => /PHIP/i.test(d.label || ""));
  if (docFilter === "ap_revised") return docs.some(d => /Application Proof/i.test(d.label || "") && /Revised/i.test(d.label || ""));
  if (docFilter === "ap_first") return docs.some(d => /Application Proof/i.test(d.label || "") && /1st/i.test(d.label || ""));
  if (docFilter === "oc") return docs.some(d => /OC Announcement/i.test(d.label || ""));
  return true;
}

function getDirectoryFilteredRecords() {
  const all = state.data?.records || [];
  const q = normalizeSearchText(state.dirQuery || "");
  const rows = all.filter(r => {
    if (state.dirStage !== "all" && hkexListingStage(r) !== state.dirStage) return false;
    if (state.dirType !== "all") {
      if (state.dirType === "chapter18") { if (!isChapter18Record(r)) return false; }
      else if (state.dirType === "other") { if (!["other", "de_spac", "hdr"].includes(issuerTypeKey(r))) return false; }
      else if (issuerTypeKey(r) !== state.dirType) return false;
    }
    if (!directoryRecordMatchesDocStatus(r, state.dirDocStatus)) return false;
    if (state.dirIndustry !== "all" && !effectiveIndustryMeta(r).csrcCats.includes(state.dirIndustry) && !effectiveIndustryMeta(r).bizTags.includes(state.dirIndustry)) return false;
    if (state.dirSponsor !== "all" && !(r.sponsors || []).includes(state.dirSponsor) && !sponsorLabels(r).includes(state.dirSponsor)) return false;
    if (q && !getRecordText(r).includes(q)) return false;
    return true;
  });

  const dir = state.dirSortDir === "asc" ? 1 : -1;
  const keyOf = r => {
    if (state.dirSort === "issuerName") return nameParts(r).primary || r.issuerName || "";
    if (state.dirSort === "currentA1Date") return r.currentA1Date || r.a1Date || "";
    if (state.dirSort === "a1Date") return r.a1Date || "";
    if (state.dirSort === "hkexListingDate") return listingOrCompletionDate(r) || "";
    if (state.dirSort === "marketCap") {
      if (r.listingMarketCapSampleEligible && Number.isFinite(r.listingMarketCapHkdBn)) return r.listingMarketCapHkdBn;
      if (isAhCandidate(r) && r.aShareMarketCapRankEligible && Number.isFinite(r.aShareMarketCapAtA1RmbBn)) return r.aShareMarketCapAtA1RmbBn;
      return null;
    }
    return directoryActivityDate(r);
  };
  return rows.sort((a, b) => {
    const ka = keyOf(a), kb = keyOf(b);
    const ma = ka === null || ka === "", mb = kb === null || kb === "";
    if (ma && mb) return String(a.issuerName).localeCompare(String(b.issuerName), "en", { sensitivity: "base" });
    if (ma) return 1;
    if (mb) return -1;
    if (typeof ka === "number" && typeof kb === "number") return (ka - kb) * dir;
    const cmp = String(ka).localeCompare(String(kb), "zh-Hans", { numeric: true, sensitivity: "base" });
    return cmp !== 0 ? cmp * dir : String(a.issuerName).localeCompare(String(b.issuerName), "en", { sensitivity: "base" });
  });
}

function populateDirectoryFilters() {
  if (!state.data?.records) return;
  const indEl = document.getElementById("dirIndustryFilter");
  if (indEl) populateSelect("dirIndustryFilter", getUniqueOptions(r => r.csrcIndustryTags || []), state.dirIndustry, "全部行业", "dirIndustry");
  const spEl = document.getElementById("dirSponsorFilter");
  if (spEl) populateSelect("dirSponsorFilter", getUniqueOptions(r => sponsorLabels(r)), state.dirSponsor, "全部保荐人", "dirSponsor");
}

function renderDirectoryPulse() {
  const root = document.getElementById("directoryPulseStrip");
  if (!root || !state.data?.records) return;
  const all = state.data.records;
  const counts = hkexListingStageCounts(all);
  const recent30 = all.filter(isDirectoryRecent30).length;
  const ahAll = all.filter(r => issuerTypeKey(r) === "a_h");
  const ahApplying = ahAll.filter(r => hkexListingStage(r) === "applying").length;
  const ahListed = ahAll.filter(r => hkexListingStage(r) === "listed").length;
  const pausedCount = all.filter(r => currentOfferingNotice(r)).length;
  const isAllClean = state.dirType === "all" && state.dirDocStatus === "all";

  const cards = [
    { key: "applying", label: "在审申请 (AP)", val: counts.applying, sub: "港交所活跃申报 / 审核中", active: state.dirStage === "applying" && isAllClean },
    { key: "recent30", label: "近30日递表 / 更新", val: recent30, sub: "新交表、PHIP 聆讯与挂牌", active: state.dirDocStatus === "recent30" },
    { key: "ah", label: "A+H 申报与上市", val: ahAll.length, sub: `在审 ${ahApplying} · 已上市 ${ahListed}`, active: state.dirType === "a_h" && state.dirStage === "all" && state.dirDocStatus === "all" },
    { key: "listed", label: "已挂牌上市", val: counts.listed, sub: "2023-03 以来港股主板新股", active: state.dirStage === "listed" && isAllClean },
    { key: "paused", label: "发售搁置 ↗", val: pausedCount, sub: "跳转发售搁置专题工作台", active: false },
    { key: "other", label: "搁置 / 撤回", val: counts.other, sub: "申请失效、撤回或发回", active: state.dirStage === "other" && isAllClean }
  ];

  root.innerHTML = cards.map(c => `<button type="button" class="stat-cell is-clickable dir-pulse-card${c.active ? " is-active" : ""}" data-dir-pulse="${c.key}" aria-pressed="${c.active}"><span class="stat-label">${c.label}</span><strong class="stat-val col-num">${formatNumber(c.val, "integer")}</strong><small class="stat-sub">${c.sub}</small></button>`).join("");

  document.querySelectorAll("[data-dir-stage]").forEach(btn => {
    const active = btn.dataset.dirStage === state.dirStage;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-dir-stage-count]").forEach(el => {
    el.textContent = formatNumber(counts[el.dataset.dirStageCount] || 0, "integer");
  });
}

function renderDirectory() {
  const tbody = document.getElementById("directoryRows");
  if (!tbody || !state.data?.records) return;
  const snap = document.getElementById("dirSnapshotMeta");
  if (snap && state.data.meta?.generatedAt) {
    snap.textContent = `港交所与证监会公开总库 · 共 ${formatNumber(state.data.records.length, "integer")} 家 · 更新于 ${state.data.meta.generatedAt.replace("T", " ").slice(0, 16)}（香港）`;
  }
  const setVal = (id, val) => { const el = document.getElementById(id); if (el && el.value !== val) el.value = val; };
  setVal("dirSearch", state.dirQuery);
  setVal("dirTypeFilter", state.dirType);
  setVal("dirDocFilter", state.dirDocStatus);
  setVal("dirIndustryFilter", state.dirIndustry);
  setVal("dirSponsorFilter", state.dirSponsor);
  setVal("dirSortSelect", state.dirSort);
  renderDirectoryPulse();

  const rows = getDirectoryFilteredRecords();
  const metaStrip = document.getElementById("directoryMetaStrip");
  if (metaStrip) {
    metaStrip.innerHTML = `<span>已筛选 <strong>${formatNumber(rows.length, "integer")}</strong> / ${formatNumber(state.data.records.length, "integer")} 家港股项目</span><span class="meta-strip-hint">港交所主板在审 AP、PHIP 及已挂牌发行人</span>`;
  }

  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="muted empty-row"><div class="empty-state-row"><p>未找到符合当前条件的港股项目</p><button type="button" data-reset-view="directory">清除筛选，恢复全部 ${state.data.records.length} 家</button></div></td></tr>`;
    const pg = document.getElementById("dirPaginationBar");
    if (pg) pg.innerHTML = "";
    return;
  }

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  state.dirPage = Math.min(Math.max(1, Number(state.dirPage) || 1), pageCount);
  const startIndex = (state.dirPage - 1) * PAGE_SIZE;
  const pageRows = rows.slice(startIndex, startIndex + PAGE_SIZE);
  const endIndex = startIndex + pageRows.length;
  const roundByIssuer = new Map([
    ...eligibleFeeRoster().map(r => [r.issuerId, r]),
    ...liveBookbuildingOffers().map(r => [r.issuerId, r])
  ]);
  const specialRouteBadgeLabels = {
    rto: "RTO 反向收购",
    de_spac: "De-SPAC",
    introduction: "介绍上市",
    gem_to_main_transfer: "GEM转主板",
    hdr: "HDR"
  };

  tbody.innerHTML = pageRows.map(record => {
    const names = nameParts(record);
    const stage = hkexListingStage(record);
    const doc = latestHkexDoc(record);
    const matchedRound = roundByIssuer.get(record.id);
    const matchedTx = txForRecord(record);
    const isCh18 = isChapter18Record(record);
    const spRoute = record.specialListingRoute || "";
    const spRouteLabel = specialRouteBadgeLabels[spRoute] || "";
    const codeTags = [
      record.hkexListingStockCode ? `<span class="mono-code">${escapeHtml(record.hkexListingStockCode)}.HK</span>` : "",
      spRoute === "rto" ? '<span class="dir-tag-route is-rto">RTO 反向收购</span>' : (spRouteLabel ? `<span class="dir-tag-route">${escapeHtml(spRouteLabel)}</span>` : ""),
      record.aShareCode ? `<span class="mono-code is-ashare">A股 ${escapeHtml(record.aShareCode)}</span>` : "",
      isCh18 ? '<span class="dir-tag-18a">18A</span>' : ""
    ].filter(Boolean).join("");
    const crossLinks = [
      matchedRound ? `<button type="button" class="cross-link-chip${matchedRound.route === "paused_offer" ? " is-paused" : matchedRound.route === "bookbuilding" ? " is-live" : ""}" data-dir-round="${escapeHtml(matchedRound.id)}">${matchedRound.route === "bookbuilding" ? "招股档案" : matchedRound.route === "paused_offer" ? "搁置档案" : "费用档案"} ↗</button>` : "",
      matchedTx ? `<button type="button" class="cross-link-chip is-tx" data-dir-tx="${escapeHtml(matchedTx.id)}">${spRoute === "rto" ? "RTO 拆解" : "重组先例"} ↗</button>` : ""
    ].filter(Boolean).join("");

    // Col 2: HKEX + CSRC unified status (zero empty holes)
    const hkexStagePill = doc.kind === "bookbuilding"
      ? '<span class="dir-hkex-pill is-live">招股中</span>'
      : doc.kind === "paused_offer"
        ? '<span class="dir-hkex-pill is-paused">发售搁置</span>'
        : stage === "listed"
          ? `<span class="dir-hkex-pill is-listed">${spRoute === "rto" ? "已挂牌 · RTO" : "已挂牌"}</span>`
          : doc.kind === "phip"
            ? '<span class="dir-hkex-pill is-phip">PHIP 聆讯后</span>'
            : stage === "applying"
              ? '<span class="dir-hkex-pill is-active">在审 AP</span>'
              : `<span class="dir-hkex-pill is-other">${escapeHtml(record.hkexApplicationStatusLabelZh || "失效/撤回")}</span>`;
    const csrcShort = spRoute === "rto" && record.status === "notice_issued" ? "反向收购备案通知" : statusLabel(record.status);

    // Col 3: Latest disclosure milestone
    const milestoneDate = doc.date || record.currentA1Date || record.a1Date || "—";
    const roundMeta = spRoute === "rto" && stage === "listed"
      ? `新上市申请 A1 ${record.a1Date || "—"}${record.currentA1Date && record.currentA1Date !== record.a1Date ? ` · 续发 ${record.currentA1Date}` : ""}`
      : stage === "listed"
        ? (record.hkexProspectusDate ? `招股书 ${record.hkexProspectusDate}` : (record.a1Date ? `首轮 A1 ${record.a1Date}` : "港交所主板"))
        : doc.roundCount > 1
          ? `第 ${doc.roundCount} 轮递表 · ${doc.count} 份文件`
          : record.a1Date && record.a1Date !== milestoneDate
            ? `首轮 A1 ${record.a1Date}`
            : (doc.count ? `${doc.count} 份公开文件` : "公开申请记录");

    // Col 4: Structure & Industry (858/858 populated, zero Undetermined)
    const typePrimary = issuerTypeInfo(record).primary;
    const effInd = effectiveIndustryMeta(record);
    const indTags = [...effInd.csrcCats.slice(0, 1), ...effInd.bizTags.slice(0, 1)];
    const fallbackIndLabel = effInd.fallbackLabel;
    const routeChipHtml = spRouteLabel && spRouteLabel !== typePrimary ? `<span class="dir-type-chip${spRoute === "rto" ? " is-rto" : ""}">${escapeHtml(spRouteLabel)}</span>` : "";

    // Col 5: Zero-Hole Market Cap / Gross / Progress Anchor
    let anchorHtml = "";
    if (stage === "listed" && record.listingMarketCapSampleEligible && Number.isFinite(record.listingMarketCapHkdBn)) {
      const isEst = record.listingMarketCapProvenance?.status === "estimate";
      anchorHtml = `<strong>HKD ${rmbYiFormatter.format(record.listingMarketCapHkdBn * 10)}亿${isEst ? '<sup class="mcap-est-tag" title="按招股书或股权公开口径估值">估</sup>' : ""}</strong><small>上市日总市值${matchedRound?.offered?.gross?.value ? ` · 募 ${formatChineseUnitAmount(matchedRound.offered.gross.value, "HKD")}` : ""}</small>`;
    } else if (doc.kind === "bookbuilding" && doc.liveBook) {
      const b = doc.liveBook;
      anchorHtml = `<strong>HKD ${(Number(b.gross.lowHkd) / 1e8).toFixed(2)}–${(Number(b.gross.highHkd) / 1e8).toFixed(2)}亿</strong><small>${escapeHtml(b.subStatusLabel || "招股建档中")}</small>`;
    } else if (doc.kind === "paused_offer") {
      const notice = currentOfferingNotice(record), f = notice?.research;
      if (f) {
        const hi = f.offerShares * f.priceHigh / 1e8, lo = f.priceLow == null ? null : f.offerShares * f.priceLow / 1e8;
        anchorHtml = `<strong>HKD ${lo == null ? "最高 " : offeringNumber(lo, 1) + "–"}${offeringNumber(hi, 1)}亿</strong><small>拟募资（绿鞋前）</small>`;
      }
    } else if (spRoute === "rto") {
      anchorHtml = `<strong>RTO 反向收购上市</strong><small>${record.transactionCompletionDate ? `交割 ${escapeHtml(record.transactionCompletionDate)}` : "LR 14.06B 新上市申请"}${record.id === "genor biopharma holdings limited" ? " · 联席保荐费 USD 390万" : ""}</small>`;
    } else if (spRoute === "introduction" && stage === "listed") {
      anchorHtml = `<strong>介绍上市（无募资）</strong><small>挂牌 ${escapeHtml(record.hkexListingDate || "—")}</small>`;
    } else if (spRoute === "de_spac" && stage === "listed") {
      anchorHtml = `<strong>De-SPAC 并购上市</strong><small>继承公司挂牌 ${escapeHtml(record.hkexListingDate || "—")}</small>`;
    } else if (spRoute === "gem_to_main_transfer" && stage === "listed") {
      anchorHtml = `<strong>GEM 转主板上市</strong><small>转板生效 ${escapeHtml(record.hkexListingDate || "—")}</small>`;
    } else if (isAhCandidate(record) && Number.isFinite(record.aShareMarketCapAtA1RmbBn) && record.aShareMarketCapAtA1RmbBn > 0) {
      anchorHtml = `<strong>CNY ${rmbYiFormatter.format(record.aShareMarketCapAtA1RmbBn * 10)}亿</strong><small>A1 日 A 股参考市值</small>`;
    }
    if (!anchorHtml) {
      const a1 = record.a1Date || record.currentA1Date;
      const elapsed = a1 && typeof p0Elapsed === "function" ? p0Elapsed(a1, "calendar") : null;
      anchorHtml = a1
        ? `<strong>首轮 ${escapeHtml(a1)}</strong><small>${stage === "applying" && typeof elapsed === "number" ? `在途 ${formatDayValue(elapsed)} 自然日` : stage === "listed" ? "非公开发售/特殊路径" : "历史申报轮次"}</small>`
        : `<strong>${escapeHtml(csrcShort)}</strong><small>${escapeHtml(record.noticeDate || record.csrcReceivedDate || "公开备案")}</small>`;
    }

    // Col 6: Clickable Sponsors
    const spEntries = sponsorDisplayEntries(record);
    const spHtml = record.sponsorAppointmentStatus === "waived"
      ? '<span class="muted">获豁免委聘</span>'
      : spEntries.length
        ? spEntries.slice(0, 3).map(e => renderSponsorJumpChip(e.shortName, sponsorIdForName(e.fullName) || sponsorIdForName(e.shortName), e.fullName)).join(" · ") + (spEntries.length > 3 ? ` <span class="cs-more-count">+${spEntries.length - 3}</span>` : "")
        : (renderListingRole(record) || '<span class="muted">待披露</span>');

    return `<tr class="dir-row" data-dir-record-id="${escapeHtml(record.id)}" tabindex="0" role="button" aria-label="查看 ${escapeHtml(names.primary)}">
      <td class="dir-cell-issuer">
        <div class="dir-issuer-top"><strong>${escapeHtml(names.primary)}</strong>${crossLinks}</div>
        <div class="dir-issuer-sub">${codeTags}<span>${escapeHtml(names.secondary || "")}</span></div>
      </td>
      <td class="dir-cell-status">${hkexStagePill}<span class="badge ${escapeHtml(record.status)}"><b>${escapeHtml(csrcShort)}</b></span></td>
      <td class="dir-cell-milestone"><strong class="col-num">${escapeHtml(milestoneDate)}</strong><span>${escapeHtml(doc.labelZh)}</span><small>${escapeHtml(roundMeta)}</small></td>
      <td class="dir-cell-industry"><div class="dir-type-chips"><span class="dir-type-chip">${escapeHtml(typePrimary)}</span>${routeChipHtml}</div><div class="tag-list">${indTags.map(t => `<span>${escapeHtml(t)}</span>`).join("") || escapeHtml(fallbackIndLabel)}</div></td>
      <td class="dir-cell-anchor col-num">${anchorHtml}</td>
      <td class="dir-cell-sponsors"><div class="dir-sponsors-list">${spHtml}</div></td>
    </tr>`;
  }).join("");

  const pg = document.getElementById("dirPaginationBar");
  if (pg) {
    pg.innerHTML = `
      <div class="pagination-copy"><strong>第 ${formatNumber(startIndex + 1, "integer")}–${formatNumber(endIndex, "integer")} 条</strong><span>共 ${formatNumber(rows.length, "integer")} 家 · 第 ${state.dirPage} / ${pageCount} 页</span></div>
      <div class="pagination-actions"><button type="button" data-dir-page="${state.dirPage - 1}"${state.dirPage <= 1 ? " disabled" : ""}>上一页</button><button type="button" data-dir-page="${state.dirPage + 1}"${state.dirPage >= pageCount ? " disabled" : ""}>下一页</button></div>
    `;
  }
}

function bindDirectoryControls() {
  const root = document.getElementById("directoryView");
  if (!root) return;
  const debouncedDir = debounce(() => { state.dirPage = 1; renderDirectory(); syncUrl(); }, 140);
  document.getElementById("dirSearch")?.addEventListener("input", e => { state.dirQuery = e.target.value; debouncedDir(); });
  for (const [id, key] of [["dirTypeFilter", "dirType"], ["dirDocFilter", "dirDocStatus"], ["dirIndustryFilter", "dirIndustry"], ["dirSponsorFilter", "dirSponsor"], ["dirSortSelect", "dirSort"]]) {
    document.getElementById(id)?.addEventListener("change", e => { state[key] = e.target.value; state.dirPage = 1; renderDirectory(); syncUrl(); });
  }
  document.getElementById("dirResetBtn")?.addEventListener("click", () => p0Reset("directory"));

  root.addEventListener("click", e => {
    const firmBtn = e.target.closest("[data-global-firm]");
    if (firmBtn) return; // handled by global click handler
    const roundBtn = e.target.closest("[data-dir-round]");
    if (roundBtn) { e.stopPropagation(); openOfferingDossier(roundBtn.dataset.dirRound); return; }
    const txBtn = e.target.closest("[data-dir-tx]");
    if (txBtn) { e.stopPropagation(); openTransaction(txBtn.dataset.dirTx, txBtn); return; }
    const pulse = e.target.closest("[data-dir-pulse]");
    if (pulse) {
      const k = pulse.dataset.dirPulse;
      if (k === "paused") { switchView("pausedOfferings"); return; }
      const wasActive = pulse.classList.contains("is-active");
      state.dirStage = "all"; state.dirType = "all"; state.dirDocStatus = "all"; state.dirPage = 1;
      if (!wasActive) {
        if (k === "applying" || k === "listed" || k === "other") state.dirStage = k;
        else if (k === "recent30") state.dirDocStatus = "recent30";
        else if (k === "ah") state.dirType = "a_h";
      }
      renderDirectory(); syncUrl(); return;
    }
    const stageBtn = e.target.closest("[data-dir-stage]");
    if (stageBtn) { state.dirStage = stageBtn.dataset.dirStage; state.dirPage = 1; renderDirectory(); syncUrl(); return; }
    const pageBtn = e.target.closest("[data-dir-page]");
    if (pageBtn && !pageBtn.disabled) { state.dirPage = Number(pageBtn.dataset.dirPage); renderDirectory(); syncUrl(); window.scrollTo(0, 0); return; }
    const row = e.target.closest("tr[data-dir-record-id]");
    if (row) openDetail(row.dataset.dirRecordId, true, row);
  });

  root.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.target.closest("button,a,input,select")) return;
    const row = e.target.closest("tr[data-dir-record-id]");
    if (!row) return;
    e.preventDefault();
    openDetail(row.dataset.dirRecordId, true, row);
  });
}

function bindCornerstoneControls() {
  const root = document.getElementById("cornerstonesView");
  if (!root) return;
  document.getElementById("csSearch")?.addEventListener("input", e => { state.csQuery = e.target.value; renderCornerstones(); syncUrl(); });
  document.getElementById("csResetBtn")?.addEventListener("click", () => { state.csQuery = ""; state.csArchetype = "all"; state.csId = ""; renderCornerstones(); syncUrl(); document.getElementById("csSearch")?.focus(); });
  root.addEventListener("click", e => {
    if (e.target.closest("[data-global-firm]")) return;
    const dealTrigger = e.target.closest("[data-cs-deal-round]");
    if (dealTrigger) { e.stopPropagation(); openOfferingDossier(dealTrigger.dataset.csDealRound); return; }
    const originBtn = e.target.closest("[data-cs-origin-back]");
    if (originBtn) { if (history.state?.fromUrl) history.back(); return; }
    const backBtn = e.target.closest("[data-cs-return]");
    if (backBtn) { returnCornerstones(); return; }
    const resetBtn = e.target.closest("[data-cs-reset]");
    if (resetBtn) { state.csQuery = ""; state.csArchetype = "all"; state.csId = ""; renderCornerstones(); syncUrl(); return; }
    const archBtn = e.target.closest("[data-cs-archetype]");
    if (archBtn) { state.csArchetype = archBtn.dataset.csArchetype; renderCornerstones(); syncUrl(); return; }
    const row = e.target.closest("tr[data-cs-id]");
    if (row) openCornerstoneProfile(row.dataset.csId, row);
  });
  root.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.target.closest("button,a,input,select")) return;
    const dealRow = e.target.closest("tr[data-cs-deal-round]");
    if (dealRow) { e.preventDefault(); openOfferingDossier(dealRow.dataset.csDealRound); return; }
    const row = e.target.closest("tr[data-cs-id]");
    if (row) { e.preventDefault(); openCornerstoneProfile(row.dataset.csId, row); }
  });
}

function bindPausedOfferingControls() {
  const root = document.getElementById("offeringsView");
  if (!root) return;
  root.addEventListener("click", e => {
    if (e.target.closest("[data-global-firm],[data-open-cornerstone],[data-offering-detail]")) return;
    const link = e.target.closest("a[data-round-id]");
    if (link) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      openOfferingDossier(link.dataset.roundId);
      return;
    }
    if (e.target.closest("button,a,input,select,details,summary")) return;
    const row = e.target.closest("tr[data-paused-round],article[data-offer-round]");
    const roundId = row?.dataset?.pausedRound || row?.dataset?.offerRound;
    if (roundId) openOfferingDossier(roundId);
  });
  root.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.target.closest("button,a,input,select,details,summary")) return;
    const row = e.target.closest("tr[data-paused-round],article[data-offer-round]");
    const roundId = row?.dataset?.pausedRound || row?.dataset?.offerRound;
    if (roundId) { e.preventDefault(); openOfferingDossier(roundId); }
  });
}

const transactionOpened = new Set();
const transactionRoles = {
  TrafficConsultant: "独立交通顾问",
  FA: "FA 财务顾问",
  IFA: "IFA 独立财务顾问",
  PlacingAgent: "配售代理／账簿管理人",
  Underwriter: "包销商",
  Sponsor: "保荐人",
  ReitManager: "REIT 基金管理人",
  RestructuringFA: "债务重组财务顾问",
  Accountant: "申报会计师",
  Valuer: "独立估值师",
  IndependentExpertAU: "澳洲独立专家"
};
const transactionServices = {
  listing_rules_forecast_due_enquiry: "上市规则14.60A(3) · 盈利预测审阅",
  listing_rules_dcf_compilation: "上市规则14.60A(2) · 折现现金流计算核验",
  listing_rules_proforma_assurance: "备考财务资料鉴证",
  business_equity_valuation: "企业股权估值",
  traffic_toll_forecast: "交通流量及通行费收入预测",
  scheme_opinion: "私有化独立意见",
  offer_opinion: "要约独立意见",
  offer_advice: "要约财务顾问",
  connected_ifa_opinion: "14A 关连交易独立意见",
  major_vsa_ifa_opinion: "主要／非常重大交易意见",
  whitewash_opinion: "清洗豁免独立意见",
  rto_opinion: "反向收购独立意见",
  spinoff_advisory: "PN15 分拆财务顾问／保荐",
  spinoff_listing_sponsor: "分拆申请文件列示保荐人",
  reit_manager: "公募 REIT 基金管理",
  debt_restructuring_advisory: "境外债务重组顾问",
  placing_bookrunning: "股票配售代理／账簿管理",
  cb_bookrunning: "可转债／可交换债承销",
  rights_underwriting: "供股／公开招股包销",
  takeovers_profit_forecast: "收购守则盈利预测报告",
  property_valuation: "物业估值",
  vessel_valuation: "船舶估值",
  acquisition_due_diligence: "收购及尽职审查",
  australian_scheme_expert: "澳洲安排计划独立专家报告"
};
const transactionEvents = {
  initial_disclosure: "首次披露",
  first_disclosure: "首次披露",
  announcement: "首次披露",
  first_announcement: "首次披露",
  rule_3_5_announcement: "首次披露（3.5 公告）",
  rule_3_7: "首次披露（3.7 公告）",
  memorandum: "首次披露（谅解备忘录）",
  ifa_appointed: "委任独立财务顾问",
  dispatch: "通函／计划文件寄发",
  circular_dispatch: "通函寄发",
  composite_dispatch: "综合要约文件寄发",
  court_meeting: "法院会议表决",
  vote: "股东批准",
  egm: "股东特别大会批准",
  sgm: "股东特别大会批准",
  unconditional: "宣布无条件",
  court_sanction: "法院批准",
  effective: "计划生效",
  delisting: "撤销上市",
  control_completion: "控股权交割",
  share_sale_completion: "控股权交割",
  offer_close: "要约截止",
  offer_closing: "要约截止",
  close_of_offer: "要约截止",
  first_closing: "首个要约截止",
  final_closing: "最终要约截止",
  completion: "合并／交割完成",
  completion_confirmed: "公告确认已完成",
  debt_amendment_effective: "旧可转债修订生效",
  pn15_status_notice: "分拆阶段披露",
  implementation: "计划实施及介绍上市",
  placing_completion: "配售／发行交割",
  lapsed: "要约／计划失效",
  terminated: "协议终止"
};
const TRANSACTION_TIMEZONE_LABELS = {
  "Atlantic/Bermuda": "百慕大当地日期",
  "America/Cayman": "开曼当地日期",
  "Australia/Perth": "澳洲珀斯日期",
  "Australia/Sydney": "澳洲悉尼日期",
  "America/New_York": "美东当地日期",
  "Europe/London": "伦敦当地日期",
  "Asia/Shanghai": "中国内地日期",
  "Asia/Singapore": "新加坡当地日期"
};
function transactionEventLabel(e) {
  if (!e) return "进展节点";
  if(e.kind==="implementation"&&e.scope==="consideration_shares")return "代价股份已发行";
  return e.label || transactionEvents[e.kind] || e.kind || "进展节点";
}
function transactionTimezoneNote(tz) {
  if (!tz || tz === "Asia/Hong_Kong") return "";
  return TRANSACTION_TIMEZONE_LABELS[tz] || `${tz} 当地日期`;
}
const transactionMetricLabels = {last_full_day_premium_pct:"较最后交易日收盘溢价",placing_discount_pct:"配售价折让",conversion_premium_pct:"初始转股溢价",vote_for_pct:"赞成票／无利害关系已投票",against_total_disinterested_pct:"反对票／全部无利害关系股份"};
function normalizeTransactionText(value) { return String(value || "").normalize("NFKC").toLowerCase().replace(/[\s:：()（）.,，\-]/g, ""); }
function transactionMatchesCategory(row, cat) {
  if (!cat || cat === "all") return true;
  const c = String(row?.category || "");
  const rulesBlob = (row?.rules || []).map(r => `${r.code || ""} ${r.label || ""} ${r.application || ""}`).join(" ");
  switch (cat) {
    case "ch14_14a":
      return ["disclosable","discloseable","disclosable_acquisition","disclosable_disposal","share_transaction","major","major_acquisition","major_disposal","vsa","vsd","vsa_vsd","very_substantial_acquisition","very_substantial_disposal","extreme","acquisition","disposal","equipment_purchase","asset_purchase","procurement","connected","continuing_connected"].includes(c)
        || (c !== "reverse_takeover" && /HKEX:14(\.06\([1-5]\)|\.06C|\.33|\.44|A)/i.test(rulesBlob));
    case "disclosable":
      return ["disclosable","discloseable","disclosable_acquisition","disclosable_disposal","share_transaction","equipment_purchase"].includes(c) || /HKEX:14\.06\([12]\)|须予披露|股份交易/.test(rulesBlob);
    case "share_transaction":
      return c === "share_transaction" || /HKEX:14\.06\(1\)|股份交易/.test(rulesBlob);
    case "major":
      return ["major","major_acquisition","major_disposal"].includes(c) || (["acquisition","disposal"].includes(c) && /HKEX:14\.06\(3\)|HKEX:14\.44|主要交易|主要出售|主要收购/.test(rulesBlob));
    case "vsa_vsd":
      return ["vsa","vsd","vsa_vsd","very_substantial_acquisition","very_substantial_disposal","extreme"].includes(c) || (["acquisition","disposal"].includes(c) && /HKEX:14\.06\([45]\)|HKEX:14\.06C|非常重大|极端交易/.test(rulesBlob));
    case "acquisition":
      return ["acquisition","vsa","major_acquisition","disclosable_acquisition","equipment_purchase","asset_purchase"].includes(c);
    case "disposal":
      return ["disposal","vsd","major_disposal","disclosable_disposal"].includes(c);
    case "connected":
      return ["connected","continuing_connected"].includes(c) || /HKEX:14A|关连交易|持续关连/.test(rulesBlob);
    case "continuing_connected":
      return c === "continuing_connected" || /14A\.31|14A\.53|持续关连/.test(rulesBlob);
    case "takeovers":
      return ["scheme","offer","partial_offer","voluntary_offer","mandatory_offer","whitewash","special_deal","share_buyback"].includes(c);
    case "scheme":
      return c === "scheme";
    case "offer":
      return ["offer","partial_offer","voluntary_offer","mandatory_offer"].includes(c);
    case "whitewash":
      return ["whitewash","special_deal"].includes(c) || /清洗豁免|Whitewash|TC:25/i.test(rulesBlob);
    case "share_buyback":
      return c === "share_buyback" || /股份回购守则|Share Buy-backs/i.test(rulesBlob);
    case "reorg":
      return ["reverse_takeover","holding_substitution","spin_off","ah_share_absorption","debt_restructuring"].includes(c);
    case "reorganisation":
      return ["reverse_takeover","holding_substitution"].includes(c);
    case "reverse_takeover":
      return c === "reverse_takeover";
    case "spin_off":
      return c === "spin_off" || /PN15|第15项应用指引/i.test(rulesBlob);
    case "holding_substitution":
      return c === "holding_substitution";
    case "ah_share_absorption":
      return c === "ah_share_absorption";
    case "debt_restructuring":
      return c === "debt_restructuring";
    case "ecm":
      return ["topup_placing","placing","subscription","convertible_bond","exchangeable_bond","cb","rights_issue","open_offer","rights_open_offer"].includes(c);
    case "topup_placing":
      return ["topup_placing","placing","subscription"].includes(c);
    case "convertible_bond":
      return ["convertible_bond","exchangeable_bond","cb"].includes(c);
    case "rights_open_offer":
      return ["rights_issue","open_offer","rights_open_offer"].includes(c);
    default:
      return c === cat;
  }
}
const FIRST_BATCH_PENDING_DIAGRAMS = new Set(["HK-01521-20261109-sanrex", "HK-00848-20260929-wf-scheme", "HK-01086-20260927-crystal-aurora", "HK-00751-20260120-scheme-buyback-photovoltaic", "HK-02688-20250326-xinneng-mixed-scheme-lapsed", "HK-09956-20251017-celestia-cayman-mixed-scheme"]);
const TX_LEAD_IB_ROLES = new Set(["Sponsor", "FA", "RestructuringFA", "PlacingAgent", "Underwriter"]);
const transactionIsLeadIB = m => TX_LEAD_IB_ROLES.has(m.role) && m.service !== "listing_rules_forecast_due_enquiry";
const TX_ROLE_SORT_RANK = { Sponsor: 1, FA: 2, RestructuringFA: 3, PlacingAgent: 4, Underwriter: 5, IFA: 10, IndependentExpertAU: 11, Accountant: 12, Valuer: 13 };
const TX_CASE_ENRICHMENTS = {
  "HK-06998-20241007-edding": {
    issuerId: "genor biopharma holdings limited",
    sponsorFee: { value: 3900000, currency: "USD", scope: "joint_aggregate" },
    extraMandates: [
      {
        firm: "Morgan Stanley Asia Limited",
        firmZh: "摩根士丹利亚洲有限公司",
        sponsorId: "ms",
        role: "Sponsor",
        service: "rto_new_listing_sponsor",
        side: "新上市申请联席保荐人（独立保荐人 · 符合 LR 3A.07）",
        feeNote: "联席保荐总费 USD 3.90m（约 HK$3,042万）",
        evidence: { documentId: "YS-20251205-01e78a31469b", pages: [1, 76, 1120] }
      },
      {
        firm: "SPDB International Capital Limited",
        firmZh: "浦银国际融资有限公司",
        sponsorId: "spdb",
        role: "Sponsor",
        service: "rto_new_listing_sponsor",
        side: "新上市申请联席保荐人（浦银系另持标的 2.61% 股权并提供并购授信）",
        feeNote: "共享 USD 3.90m 保荐总费 · 浦银系另供 USD 50m + RMB 508m 融资",
        evidence: { documentId: "YS-20251205-01e78a31469b", pages: [1, 76, 1120, 1121] }
      },
      {
        firm: "Quam Capital Limited",
        firmZh: "华富建业企业融资有限公司",
        sponsorId: "quam",
        role: "FA",
        service: "target_fa",
        side: "标的公司（亿腾医药 Edding Group）财务顾问",
        evidence: { documentId: "YS-20251205-01e78a31469b", pages: [76] }
      }
    ]
  },
  "HK-01712-20260429-holdco": {
    issuerId: "dragon mining limited"
  }
};

function effectiveTransactionMandates(row) {
  if (!row) return [];
  const raw = Array.isArray(row.mandates) ? row.mandates : [];
  const enrich = TX_CASE_ENRICHMENTS[row.id];
  const combined = [...(enrich?.extraMandates || []), ...raw];
  const seen = new Set();
  const deduped = combined.filter(m => {
    if (!m?.firm) return false;
    const k = `${m.firm}|${m.role}|${m.service || ""}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  return deduped.sort((a, b) => (TX_ROLE_SORT_RANK[a.role] || 99) - (TX_ROLE_SORT_RANK[b.role] || 99));
}

function transactionMatches(row, filters = state, asOf = state.transactionData?.asOf) {
  if (!transactionMatchesCategory(row, filters.transactionCategory)) return false;
  if (filters.transactionStatus !== "all" && row.stage?.status !== filters.transactionStatus) return false;
  const rules = Array.isArray(row.rules) ? row.rules : [];
  const terms = Array.isArray(row.terms) ? row.terms : [];
  const mandates = effectiveTransactionMandates(row);
  if (filters.transactionRule && filters.transactionRule !== "all" && !rules.some(r => r.code === filters.transactionRule)) return false;
  if (filters.transactionCurrency && filters.transactionCurrency !== "all" && !terms.some(t => t.currency === filters.transactionCurrency)) return false;
  const hasMandateFilter =
    (filters.transactionAdvisor && filters.transactionAdvisor !== "all") ||
    (filters.transactionRole && filters.transactionRole !== "all") ||
    (filters.transactionService && filters.transactionService !== "all");
  if (hasMandateFilter) {
    if (!mandates.some(m =>
      (!filters.transactionAdvisor || filters.transactionAdvisor === "all" || m.firm === filters.transactionAdvisor) &&
      (!filters.transactionRole || filters.transactionRole === "all" || m.role === filters.transactionRole) &&
      (!filters.transactionService || filters.transactionService === "all" || m.service === filters.transactionService)
    )) return false;
  }
  if (filters.transactionRecent && filters.transactionRecent !== "all") {
    const days = Number(filters.transactionRecent), age = (Date.parse(asOf) - Date.parse(row.progressDate)) / 86400000;
    if (![30, 90].includes(days) || age < 0 || age >= days) return false;
  }
  const qRaw = String(filters.transactionQuery || "").trim();
  if (!qRaw) return true;
  const text = normalizeTransactionText([
    row.name,
    row.code,
    ...(row.aliases || []),
    row.mechanism,
    row.category,
    row.stage?.label,
    ...Object.entries(row.parties || {}).flatMap(([k, v]) => [k, v]),
    ...rules.flatMap(r => [r.code, r.label, r.application]),
    ...terms.flatMap(t => [t.label, t.currency, t.basis, t.value != null ? String(t.value) : ""]),
    ...mandates.flatMap(m => [m.firm, m.firmZh, m.role, transactionRoles[m.role], transactionServices[m.service], m.side, m.feeNote, ...(m.signatories || [])])
  ].join(" "));
  return qRaw.split(/\s+/).filter(Boolean).every(q => text.includes(normalizeTransactionText(q)));
}
function transactionSource(evidence, text = "原件") {
  const doc = state.transactionData?.documents?.[evidence?.documentId];
  if (!doc) return "";
  const pages = evidence.pages || [];
  const suffix = pages.length ? ` · PDF ${pages.join("、")}页` : "";
  return `<a class="transaction-source" href="${escapeHtml(doc.url + (pages.length ? `#page=${pages[0]}` : ""))}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(doc.title + ' · ' + doc.date)}">${escapeHtml(text + suffix)} ↗</a>`;
}
function transactionAmount(term) {
  if (!term || !Number.isFinite(term.value)) return "—";
  if (term.unit === "ratio") return term.value.toFixed(term.precision) + " : 1";
  if (term.unit === "percent") return term.value.toFixed(term.precision) + "%";
  const number = term.unit === "money" ? term.value / 1e6 : term.value;
  const decimals = term.unit === "money" ? 2 : term.precision;
  return `${term.approximate ? "约 " : ""}${term.currency ? term.currency + " " : ""}${number.toLocaleString("en-US",{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}${term.unit === "shares" ? " 股" : term.unit === "per_share" ? "／股" : "m"}`;
}
function transactionExactMoney(term) {
  if (!term || !Number.isFinite(term.value) || term.unit !== "money") return "";
  const num = Number(term.value);
  const hasFrac = Math.abs(num - Math.round(num)) > 1e-6;
  const dec = hasFrac ? Math.max(2, Number.isInteger(term.precision) ? term.precision : 2) : 0;
  return `${term.approximate ? "约 " : ""}${term.currency ? term.currency + " " : ""}${num.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
}
function transactionDisplayAmount(term, preferExact = false) {
  if (!term || !Number.isFinite(term.value)) return "—";
  const raw = transactionAmount(term);
  if (term.unit !== "money") return escapeHtml(raw);
  const cn = formatChineseUnitAmount(term.value, term.currency || "", Boolean(term.approximate));
  const exact = transactionExactMoney(term);
  const hasSubMillionPrecision = !term.approximate && (Math.abs(term.value - Math.round(term.value)) > 1e-6 || Math.abs(term.value % 1000000) > 0.5);
  if (preferExact && !term.approximate) {
    return `<span class="amt-cn" title="${escapeHtml(raw + " · " + cn)}">${escapeHtml(exact)}</span>`;
  }
  if (hasSubMillionPrecision && term.value < 1e9) {
    return `<span class="amt-cn" title="${escapeHtml(raw + " · " + cn)}">${escapeHtml(exact)}</span>`;
  }
  return `<span class="amt-cn" title="${escapeHtml(raw + (exact ? " · " + exact : ""))}">${escapeHtml(cn)}</span>`;
}
function transactionTerm(row, key) { return (row.terms || []).find(t => t.key === key); }
function transactionHeadlineTerm(row) {
 if(row?.category==="spin_off"&&row.headlineKey===null)return undefined;
 return transactionTerm(row,row.headlineKey)||(row.terms||[])[0];
}
function resolveTransactionIssuerLinks(row) {
  if (!row) return { records: [], rounds: [] };
  const issuerIds = new Set();
  const roundIds = new Set();
  const addIssuer = v => { if (typeof v === "string" && v.trim()) issuerIds.add(v.trim()); };
  const addRound = v => { if (typeof v === "string" && v.trim()) roundIds.add(v.trim()); };
  addIssuer(row.issuerId);
  addIssuer(TX_CASE_ENRICHMENTS[row.id]?.issuerId);
  addIssuer(row.relatedIssuerId);
  addIssuer(row.trackerIssuerId);
  for (const link of state.transactionData?.issuerLinks || []) {
    if (link.caseId === row.id) addIssuer(link.issuerId);
  }
  addRound(row.roundId);
  addRound(row.offeringRoundId);
  addRound(row.dossierId);
  for (const obj of [row.issuerLink, row.issuerRelation, row.linkedIssuer, ...(Array.isArray(row.relatedIssuers) ? row.relatedIssuers : []), ...(Array.isArray(row.issuerLinks) ? row.issuerLinks : [])]) {
    if (!obj) continue;
    if (typeof obj === "string") addIssuer(obj);
    else if (typeof obj === "object") {
      addIssuer(obj.issuerId || obj.id || obj.recordId);
      addRound(obj.roundId || obj.offeringRoundId || obj.dossierId);
    }
  }
  const allRecords = state.data?.records || [];
  const allRounds = eligibleFeeRoster();
  const matchedRecords = [...issuerIds].map(id => allRecords.find(x => x.id === id)).filter(Boolean);
  const matchedRounds = [...roundIds].map(id => allRounds.find(x => x.id === id)).filter(Boolean);
  for (const rec of matchedRecords) {
    const rHit = allRounds.find(x => x.issuerId === rec.id);
    if (rHit && !matchedRounds.some(m => m.id === rHit.id)) matchedRounds.push(rHit);
  }
  return { records: matchedRecords, rounds: matchedRounds };
}
function renderTransactionIssuerLinkButtons(row, compact = false) {
  const { records, rounds } = resolveTransactionIssuerLinks(row);
  if (!records.length && !rounds.length) return "";
  const btns = [];
  for (const rd of rounds) {
    btns.push(`<button type="button" class="${compact ? "tx-advisor-chip" : "action-link-btn"} tx-issuer-jump" data-tx-jump-round="${escapeHtml(rd.id)}">${compact ? "新股档案 ↗" : `关联新股档案：${escapeHtml(rd.name)} (${rd.code}) ↗`}</button>`);
  }
  for (const rec of records) {
    if (rounds.some(rd => rd.issuerId === rec.id) && compact) continue;
    const nm = rec.issuerName || rec.csrcName || rec.hkexCoverChineseName || rec.id;
    btns.push(`<button type="button" class="${compact ? "tx-advisor-chip" : "action-link-btn"} tx-issuer-jump" data-tx-jump-issuer="${escapeHtml(rec.id)}">${compact ? "申报档案 ↗" : `关联发行人申报档案：${escapeHtml(nm)} ↗`}</button>`);
  }
  return `<div class="tx-issuer-links">${btns.join("")}</div>`;
}
function renderIssuerRelatedTransactions(issuerId) {
  if (!issuerId) return "";
  const cases = (state.transactionData?.cases || []).filter(c => {
    const { records } = resolveTransactionIssuerLinks(c);
    return records.some(r => r.id === issuerId);
  });
  if (!cases.length) return "";
  return `<div class="issuer-tx-crosslinks">${cases.map(c => `<a class="action-link-btn" href="${escapeHtml(transactionUrl(c.id))}" data-global-tx="${escapeHtml(c.id)}">关联并购／重组先例：${escapeHtml(c.name)} (${c.code}) · ${escapeHtml(c.mechanism)} ↗</a>`).join("")}</div>`;
}
function transactionSelection() {
  const valid = new Set((state.transactionData?.cases || []).map(r=>r.id));
  return [...new Set(state.transactionCompare.split(",").filter(id=>valid.has(id)))].slice(0,4);
}
function transactionConsolidatedSources(row) {
  const out = [], seen = new Set();
  const push = (ev, label) => {
    const html = transactionSource(ev, label);
    if (html && !seen.has(html)) { seen.add(html); out.push(html); }
  };
  for (const m of effectiveTransactionMandates(row)) {
    const signed = ["scheme_opinion","takeovers_profit_forecast","property_valuation","vessel_valuation","rto_opinion","australian_scheme_expert","connected_ifa_opinion","major_vsa_ifa_opinion","whitewash_opinion"].includes(m.service);
    push(m.evidence, signed ? "签署报告" : "角色原件");
    if (m.signatureEvidence) push(m.signatureEvidence, "签字页");
  }
  for (const t of (row.terms || [])) push(t.evidence, t.label);
  for (const [, ev] of Object.entries(row.comparisonEvidence || {})) push(ev, "披露");
  for (const r of (row.rules || [])) push(r.evidence, r.label);
  for (const e of (row.processEvents || [])) push(e.evidence, e.label || transactionProcessLabels[e.kind] || "进展");
  return `<div class="tx-consolidated-links">${out.join("") || '<span class="data-missing">—</span>'}</div>`;
}
function transactionComparisonRows(rows) {
  const diagramKit = typeof window !== "undefined" ? window.YingSightDealDiagramKit : null;
  const result = [
    ["交易结构", r => `${escapeHtml(r.mechanism)}${diagramKit && !FIRST_BATCH_PENDING_DIAGRAMS.has(r.id) ? diagramKit.renderCompactFlowBadge(r,state.transactionData?.documents) : ""}`],
    ["已确认阶段", r => `<span class="tx-stage-pill is-${escapeHtml(r.stage?.status || "active")}">${escapeHtml(r.stage?.label || "—")}</span><small>${r.stage?.date || ""}</small>`],
    ["核心条款（各案原币）", r => {
      const h = transactionHeadlineTerm(r);
      if (!h) return '<span class="data-missing">—</span>';
      const ccyTag = h.currency ? `<span class="tx-ccy-pill">${escapeHtml(h.currency)}</span> ` : "";
      return `${ccyTag}<strong class="col-num">${transactionDisplayAmount(h, true)}</strong><small>${escapeHtml(h.label + (h.basis ? " · " + h.basis : ""))}</small>`;
    }]
  ];
  const preferredKeys = ["scheme_cash","control_block","offer_value","offer_cash_cap","cash_settlement","contract_price","prepayment_offset","advance_payment_offset","proposed_purchase","translated_purchase","equity_value","asset_valuation","gross_proceeds","net_proceeds","annual_cap","per_scheme_share","offer_price","issue_price","placing_price","conversion_price","subscription_price","consideration_shares","exchange_ratio","enlarged_stake","highest_percentage_ratio_pct","placing_commission_bps","underwriting_commission_bps","coupon_pct"];
  const presentKeys = [...new Set(rows.flatMap(r => (r.terms || []).map(t => t.key)).filter(Boolean))];
  const orderedKeys = [...new Set([...preferredKeys.filter(k => presentKeys.includes(k)), ...presentKeys])];
  for (const key of orderedKeys) {
    const exemplar = rows.flatMap(r => r.terms || []).find(t => t.key === key);
    if (exemplar) result.push([key === "consideration_shares" ? "代价股份" : exemplar.label, r => {
      const t = transactionTerm(r, key);
      return t ? `<strong class="col-num">${transactionDisplayAmount(t, true)}</strong><small>${escapeHtml(t.basis || "")}</small>` : '<span class="data-missing">—</span>';
    }]);
  }
  for (const [key, label] of Object.entries(transactionMetricLabels)) {
    if (rows.some(r => Number.isFinite(r.comparables?.[key]))) result.push([label, r => Number.isFinite(r.comparables?.[key]) ? `<strong class="col-num">${r.comparables[key]}%</strong>` : '<span class="data-missing">—</span>']);
  }
  for (const [key, label] of [["announcementToDispatch","首次公告 → 文件寄发"],["dispatchToVote","文件寄发 → 股东批准"],["voteToEffective","股东批准 → 计划生效"]]) {
    if (rows.some(r => Number.isInteger(r.intervals?.[key]))) result.push([label, r => Number.isInteger(r.intervals?.[key]) ? `<strong class="col-num">${r.intervals[key]} 天</strong>` : '<span class="data-missing">—</span>']);
  }
  if (rows.some(r => r.lifecycle)) result.push(["首次公告 → 完成／实施", r => r.lifecycle ? `<strong class="col-num">${r.lifecycle.naturalDays} 天</strong><small>${r.lifecycle.start} → ${r.lifecycle.end}</small>` : '<span class="data-missing">—</span>']);
  if (rows.some(r => resolveTransactionIssuerLinks(r).records.length || resolveTransactionIssuerLinks(r).rounds.length)) {
    result.push(["关联发行人档案", r => renderTransactionIssuerLinkButtons(r, true) || '<span class="data-missing">—</span>']);
  }
  result.push(["规则与分类", r => (r.rules || []).map(x => `<div class="tx-rule-line"><b>${escapeHtml(x.label)}</b><small>${escapeHtml(x.application)}</small></div>`).join("") || '<span class="data-missing">—</span>']);
  result.push(["延寄与停复牌", r => transactionProcess(r)], ["中介与签署原件", r => transactionMandates(r)]);
  result.push(["披露原件与页码", r => transactionConsolidatedSources(r)]);
  return result;
}

const transactionFilterControls=[["transactionSearch","transactionQuery"],["transactionCategory","transactionCategory"],["transactionStatus","transactionStatus"],["transactionRole","transactionRole"],["transactionService","transactionService"],["transactionRecent","transactionRecent"],["transactionRule","transactionRule"],["transactionCurrency","transactionCurrency"],["transactionAdvisor","transactionAdvisor"]];
const transactionProcessLabels={pn15_observation:"分拆相关披露",dispatch_extension:"寄发延期",supplement:"补充文件",court_rescheduled:"法院排期调整",trading_halt:"股份停牌",trading_resume:"股份复牌"};
let transactionDisclosureState=new Map();
function transactionRows(filters=state){return (state.transactionData?.cases||[]).filter(r=>transactionMatches(r,{...defaults,...filters})).sort((a,b)=>b.progressDate.localeCompare(a.progressDate));}
function transactionCase(id){return (state.transactionData?.cases||[]).find(r=>r.id===id);}
function transactionUrl(id="",mode="list"){
 const p=new URLSearchParams(location.search);
 for(const k of trackedStateKeys){p.delete(k);const v=state[k];if(v!==defaults[k]&&v!==""&&v!=null)p.set(k,String(v));}
 for(const k of ["compare","mode","group","focus","from","to"])p.delete(k);
 p.set("view","transactions");if(id)p.set("transactionId",id);else p.delete("transactionId");
 if(mode==="compare")p.set("transactionMode","compare");else p.delete("transactionMode");
 return location.pathname+"?"+p;
}
function transactionTitleLink(row,origin="list"){
 return '<a class="transaction-title-link" data-tx-open="'+escapeHtml(row.id)+'" data-tx-origin="'+origin+'" href="'+escapeHtml(transactionUrl(row.id))+'"><strong>'+escapeHtml(row.name)+'</strong> <span class="mono-code">'+row.code+'</span></a>';
}
const TRANSACTION_MANDATE_LABELS = {
 "IFA:scheme_opinion": "IFA 独立财务顾问｜协议安排意见",
 "IFA:takeovers_profit_forecast": "IFA 独立财务顾问｜Rule 10 盈利预测报告",
 "Accountant:takeovers_profit_forecast": "申报会计师｜Rule 10 盈利预测报告",
 "Valuer:vessel_valuation": "估值师｜船舶估值",
 "Valuer:property_valuation": "估值师｜物业估值",
 "IndependentExpertAU:australian_scheme_expert": "澳洲独立专家｜Part 5.1 报告",
 "IFA:rto_opinion": "IFA 独立财务顾问｜反向收购独立意见",
 "IFA:offer_opinion": "IFA 独立财务顾问｜全面要约独立意见",
 "IFA:connected_ifa_opinion": "IFA 独立财务顾问｜14A 关连交易意见",
 "IFA:major_vsa_ifa_opinion": "IFA 独立财务顾问｜主要／非常重大交易意见",
 "IFA:whitewash_opinion": "IFA 独立财务顾问｜清洗豁免意见",
 "FA:offer_advice": "FA 财务顾问｜要约财务顾问",
 "FA:target_fa": "FA 财务顾问｜标的公司财务顾问",
 "FA:acquisition_due_diligence": "FA 财务顾问｜收购及尽职审查",
 "FA:spinoff_advisory": "FA 财务顾问｜PN15 分拆财务顾问",
 "Sponsor:spinoff_advisory": "保荐人｜PN15 分拆上市保荐",
 "Sponsor:rto_new_listing_sponsor": "联席保荐人｜LR 14.54 反向收购新上市保荐",
 "RestructuringFA:debt_restructuring_advisory": "重组财务顾问｜境外债务重组",
 "PlacingAgent:placing_bookrunning": "配售代理／账簿管理人｜股票配售",
 "PlacingAgent:cb_bookrunning": "牵头经办／配售代理｜可转债承销",
 "Underwriter:rights_underwriting": "包销商｜供股／公开招股包销"
};
function transactionMandateDisplay(m){
 return TRANSACTION_MANDATE_LABELS[`${m.role}:${m.service}`] || `${transactionRoles[m.role]||m.role}｜${transactionServices[m.service]||m.service}`;
}
function transactionTimingMetrics(row, asOf = state.transactionData?.asOf){
 const dayDiff=(a,b)=>{if(!a||!b)return null;const d=Math.round((Date.parse(b)-Date.parse(a))/86400000);return Number.isFinite(d)&&d>=0?d:null;};
 const disp=Number.isInteger(row.intervals?.announcementToDispatch)?`${row.intervals.announcementToDispatch} 天`:(row.stage.status==="active"?"待寄发":"—");
 const vote=Number.isInteger(row.intervals?.dispatchToVote)?`${row.intervals.dispatchToVote} 天`:"—";
 const firstDate=row.events?.[0]?.date||"";
 let totalLabel="总历时",totalVal="—",totalSub="",isLive=false;
 const issue=(row.events||[]).find(e=>e.kind==="implementation"&&e.scope==="consideration_shares"&&e.state==="actual");
 if(issue&&row.stage.status==="implemented"){
  totalLabel="首公至发股";totalVal=`${dayDiff(firstDate,issue.date)} 天`;totalSub=`${firstDate} → ${issue.date}`;
 }else if(row.stage.eventKind==="debt_amendment_effective"&&row.stage.status==="closed"){
  const d=dayDiff(firstDate,row.stage.date);
  totalLabel="首公至修订生效";totalVal=d!=null?`${d} 天`:"—";totalSub=`生效日 ${row.stage.date}`;
 }else if(row.stage.eventKind==="completion_confirmed"&&row.stage.status==="closed"){
  const d=dayDiff(firstDate,row.stage.date);
  totalLabel="首公至完成公告";totalVal=d!=null?`${d} 天`:"—";totalSub=`公告日 ${row.stage.date}`;
 }else if(row.lifecycle&&Number.isInteger(row.lifecycle.naturalDays)){
  totalLabel="总历时";totalVal=`${row.lifecycle.naturalDays} 天`;totalSub=`${row.lifecycle.start} → ${row.lifecycle.end}`;
 }else if(row.stage.status==="closed"){
  const d=dayDiff(firstDate,row.stage.date);
  totalLabel="总历时";totalVal=d!=null?`${d} 天`:"—";totalSub=firstDate?`${firstDate} → ${row.stage.date}`:row.stage.date;
 }else if(row.stage.status==="terminated"){
  const d=dayDiff(firstDate,row.stage.date);
  totalLabel="历时至终止";totalVal=d!=null?`${d} 天`:"—";totalSub=firstDate?`${firstDate} → ${row.stage.date}`:row.stage.date;
 }else{
  const d=dayDiff(firstDate,asOf||row.stage.date);
  totalLabel=row.stage.status==="approved"?"已历（待交割）":"已历（进行中）";
  totalVal=d!=null?`${d} 天`:"—";totalSub=firstDate?`首公 ${firstDate} 起`:row.stage.date;isLive=true;
 }
 return {disp,vote,totalLabel,totalVal,totalSub,isLive};
}
function renderSingleTxMandateCard(row, m, isLeadIb = false) {
 const spId = m.sponsorId || sponsorIdForName(m.firm) || sponsorIdForName(m.firmZh || "");
 const firmPrimary = m.firmZh ? `${escapeHtml(m.firmZh)} <span class="tx-mandate-en">${escapeHtml(m.firm)}</span>` : escapeHtml(m.firm);
 const firmHtml = spId
  ? `<button type="button" class="sponsor-jump-link tx-mandate-firm-btn" data-global-firm="${escapeHtml(spId)}" title="查看 ${escapeHtml(m.firmZh || m.firm)} 保荐与FA执业档案">${firmPrimary} ↗</button>`
  : `<b>${firmPrimary}</b>`;
 const feeBadge = m.feeNote ? `<span class="tx-mandate-fee-note">${escapeHtml(m.feeNote)}</span>` : "";
 const sigHtml = m.signatureEvidence && Array.isArray(m.signatories) && m.signatories.length ? `<span class="transaction-signatories">签署人：${escapeHtml(m.signatories.join(" · "))}</span>` : "";
 return `<div class="tx-mandate-card${isLeadIb ? " is-lead-ib" : " is-opinion"}" data-tx-id="${escapeHtml(row.id)}"><div class="tx-mandate-head">${firmHtml}<small>${escapeHtml(m.side || "")}</small></div><div class="tx-mandate-meta"><span class="tx-mandate-role">${escapeHtml(transactionMandateDisplay(m))}</span>${feeBadge}</div>${sigHtml}</div>`;
}
function transactionMandates(row){
 const list=effectiveTransactionMandates(row);
 if(!list.length)return '<span class="data-missing">公告暂未披露外聘中介机构</span>';
 const leadList=list.filter(m=>transactionIsLeadIB(m));
 const opinionList=list.filter(m=>!transactionIsLeadIB(m));
 if(leadList.length&&opinionList.length){
  return `<div class="transaction-mandates is-tiered"><div class="tx-mandate-group"><div class="tx-mandate-group-head"><span>主导投行 · 保荐 / 财务顾问 / 承销</span><em>核心收费席位 (${leadList.length})</em></div>${leadList.map(m=>renderSingleTxMandateCard(row,m,true)).join("")}</div><div class="tx-mandate-group is-secondary"><div class="tx-mandate-group-head"><span>独立意见与鉴证签署 · IFA / 会计师 / 估值师</span><em>法定意见机构 (${opinionList.length})</em></div>${opinionList.map(m=>renderSingleTxMandateCard(row,m,false)).join("")}</div></div>`;
 }
 return `<div class="transaction-mandates">${list.map(m=>renderSingleTxMandateCard(row,m,transactionIsLeadIB(m))).join("")}</div>`;
}
function transactionProcess(row){
 return (row.processEvents||[]).map(e=>'<div class="transaction-process-event"><time>'+e.date+'</time><b>'+escapeHtml(e.label||transactionProcessLabels[e.kind]||e.kind||"进展")+'</b>'+(e.detail?'<span>'+escapeHtml(e.detail)+'</span>':"")+'</div>').join("")||'<span class="data-missing">—</span>';
}
function transactionDisclosure(row,key,title,body){
 const k=row.id+":"+key,defaultOpen=key!=="documents"&&!window.matchMedia?.("(max-width: 767px)").matches,open=transactionDisclosureState.has(k)?transactionDisclosureState.get(k):defaultOpen;
 return '<details class="transaction-section" data-tx-section="'+escapeHtml(k)+'"'+(open?" open":"")+'><summary>'+title+'</summary><div class="transaction-section-body">'+body+'</div></details>';
}
function transactionDetail(row){
 const headline=transactionHeadlineTerm(row),ids=transactionSelection(),inCompare=ids.includes(row.id);
 const allRefs=[
  ...(effectiveTransactionMandates(row)).flatMap(m=>{const signed=["scheme_opinion","takeovers_profit_forecast","property_valuation","vessel_valuation","rto_opinion","australian_scheme_expert","connected_ifa_opinion","major_vsa_ifa_opinion","whitewash_opinion"].includes(m.service);return [{evidence:m.evidence,label:signed?"签署报告":"角色原件"},...(m.signatureEvidence?[{evidence:m.signatureEvidence,label:"签字页"}]:[])];}),
  ...(row.terms||[]).map(t=>({evidence:t.evidence,label:t.label})),
  ...(row.rules||[]).map(r=>({evidence:r.evidence,label:r.label})),
  ...(row.events||[]).map(e=>({evidence:e.evidence,label:transactionEventLabel(e)})),
  ...(row.processEvents||[]).map(e=>({evidence:e.evidence,label:e.label||transactionProcessLabels[e.kind]||e.kind||"进展"}))
 ].filter(x=>x.evidence?.documentId);
 const sourceIds=new Set(allRefs.map(x=>x.evidence.documentId));
 const docs=[...sourceIds].map(id=>state.transactionData?.documents?.[id]).filter(Boolean).sort((a,b)=>String(b.date||b.documentDate||"").localeCompare(String(a.date||a.documentDate||"")));
 const terms='<dl class="transaction-terms">'+(row.terms||[]).map(t=>'<div><dt>'+escapeHtml(t.label)+'</dt><dd><strong class="col-num">'+transactionDisplayAmount(t,true)+'</strong><span>'+escapeHtml(t.basis||"")+'</span></dd></div>').join("")+'</dl><dl class="transaction-parties">'+Object.entries(row.parties||{}).map(([k,v])=>'<div><dt>'+escapeHtml(k)+'</dt><dd>'+escapeHtml(v)+'</dd></div>').join("")+'</dl>';
 const timeline='<ol class="transaction-timeline">'+(row.events||[]).map(e=>{const tzNote=transactionTimezoneNote(e.timeZone||e.timezone);return '<li class="'+(e.state==="actual"?"is-actual":"is-scheduled")+'" data-tx-id="'+row.id+'" data-tx-event-kind="'+escapeHtml(e.kind||"")+'"><time>'+e.date+'</time><div><b>'+escapeHtml(transactionEventLabel(e))+(e.state!=="actual"?"（公告预计）":"")+'</b>'+(tzNote?'<small>'+escapeHtml(tzNote)+'</small>':"")+'</div></li>';}).join("")+'</ol>';
 const rules='<div class="transaction-rules">'+(row.rules||[]).map(r=>'<div><b>'+escapeHtml(r.label)+'</b><span>'+escapeHtml(r.application||"")+'</span></div>').join("")+'</div>';
 const documents='<div class="transaction-doc-list">'+docs.map(d=>{
  const docRefs=[],seenHref=new Set();
  for(const ref of allRefs.filter(x=>x.evidence.documentId===d.id)){
   const isMandateLabel=["签署报告","角色原件","签字页"].includes(ref.label);
   if(!isMandateLabel&&!(ref.evidence.pages||[]).length)continue;
   const linkHtml=transactionSource(ref.evidence,ref.label);
   const dedupKey=isMandateLabel?linkHtml:(ref.evidence.pages||[]).join(",");
   if(linkHtml&&!seenHref.has(dedupKey)){seenHref.add(dedupKey);docRefs.push(linkHtml);}
  }
  return '<div class="transaction-document"><div class="tx-doc-main"><time>文件 '+(d.date||d.documentDate||"")+'</time><a href="'+escapeHtml(d.url)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(d.title)+' ↗</a>'+(d.publishedAt?'<small>发布 '+escapeHtml(d.publishedAt.slice(0,16).replace("T"," "))+' 香港</small>':"")+'</div>'+(docRefs.length?'<div class="tx-doc-pages">'+docRefs.join("")+'</div>':"")+'</div>';
 }).join("")+'</div>';
 const compBadges=Object.entries(transactionMetricLabels).filter(([k])=>Number.isFinite(row.comparables?.[k])).map(([k,l])=>`<span class="tx-hero-comp">${escapeHtml(l)} <strong class="col-num">${row.comparables[k]}%</strong></span>`).join("");
 const issuerLinkHtml=renderTransactionIssuerLinkButtons(row,false);
 const diagramKit=typeof window!=="undefined"?window.YingSightDealDiagramKit:null;
 const diagramHtml=diagramKit && !FIRST_BATCH_PENDING_DIAGRAMS.has(row.id)?diagramKit.renderDealDiagram(row,{documents:state.transactionData?.documents,sourceLink:transactionSource}):"";
 const tm=transactionTimingMetrics(row);
 const timingStripHtml=`<div class="tx-timing-strip"><div><span>首公 → 寄发</span><strong class="col-num">${escapeHtml(tm.disp)}</strong></div><div><span>寄发 → 表决</span><strong class="col-num">${escapeHtml(tm.vote)}</strong></div><div class="${tm.isLive?"is-live":""}"><span>${escapeHtml(tm.totalLabel)}</span><strong class="col-num">${escapeHtml(tm.totalVal)}</strong><small>${escapeHtml(tm.totalSub)}</small></div></div>`;
 const txFrom=p0FromUrlInfo();
 const txFromCompare=Boolean(txFrom&&txFrom.view==="precedents"&&!txFrom.params.get("transactionId")&&(txFrom.params.get("transactionMode")==="compare"||txFrom.params.get("mode")==="compare"));
 const txOtherOrigin=txFrom&&txFrom.view!=="precedents"?({directory:"项目总录",tracker:"监管节奏",fees:"新股与费用",pausedOfferings:"发售搁置",cornerstones:"基石画像",sponsorLeaderboard:"保荐人龙虎榜",sponsorPk:"保荐人擂台",dossiers:"新股档案"}[txFrom.view]||""):"";
 const txBackBar=txFromCompare
  ? '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><button type="button" class="back-pill" data-tx-return>← 返回并列比较</button><button type="button" class="back-pill" data-tx-force-list>返回交易列表</button></div>'
  : '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><button type="button" class="back-pill" data-tx-return>← 返回交易列表</button>'+(txOtherOrigin?'<button type="button" class="back-pill" data-tx-origin-back>↩ 返回'+escapeHtml(txOtherOrigin)+'</button>':'')+'</div>';
 return '<header class="transaction-detail-heading"><div class="tx-detail-topbar">'+txBackBar+'<button type="button" class="tx-compare-btn" data-compare-transaction="'+row.id+'" aria-pressed="'+inCompare+'"'+(ids.length>=4&&!inCompare?" disabled":"")+'>'+(inCompare?"已入对比篮 ✓":"＋ 加入对比篮")+'</button></div><div class="tx-detail-hero"><div><p class="tx-detail-kicker"><span class="tx-stage-pill is-'+escapeHtml(row.stage.status)+'">'+escapeHtml(row.stage.label)+'</span> · 更新至 '+row.stage.date+'</p><h2 id="transactionDetailTitle" tabindex="-1">'+escapeHtml(row.name)+' <span class="mono-code">'+row.code+'.HK</span></h2><p class="tx-detail-mech">'+escapeHtml(row.mechanism)+'</p>'+(compBadges?'<div class="tx-hero-comps">'+compBadges+'</div>':"")+issuerLinkHtml+'</div>'+(headline?'<div class="transaction-detail-value"><span>'+escapeHtml(headline.label)+'</span><strong class="col-num">'+transactionDisplayAmount(headline,true)+'</strong></div>':"")+'</div></header>'+diagramHtml+'<div class="tx-detail-grid">'+
 transactionDisclosure(row,"structure","交易结构与核心条款",terms)+transactionDisclosure(row,"events","批准与交割时间线",timingStripHtml+(row.lifecycle?'<p class="transaction-lifecycle"><strong class="col-num">'+row.lifecycle.naturalDays+' 天</strong><span>首次公告 → '+escapeHtml(transactionEvents[row.lifecycle.endKind]||row.lifecycle.endKind)+'（'+row.lifecycle.start+' → '+row.lifecycle.end+'）</span></p>':"")+timeline)+
 ((row.processEvents||[]).length?transactionDisclosure(row,"process",row.category==="spin_off"?"分拆相关披露":"延寄与停复牌事件",transactionProcess(row)):"")+
 transactionDisclosure(row,"mandates","中介与签署机构",transactionMandates(row))+transactionDisclosure(row,"rules","规则与分类依据",rules)+transactionDisclosure(row,"documents","公告与通函原件 · "+docs.length,documents)+'</div>';
}
function transactionSlots(ids=transactionSelection()){
 if(!ids.includes(state.transactionA))state.transactionA=ids[0]||"";
 if(!ids.includes(state.transactionB)||state.transactionB===state.transactionA)state.transactionB=ids.find(id=>id!==state.transactionA)||"";
 return [state.transactionA,state.transactionB];
}
function transactionSlotClass(id){return id===state.transactionA?" tx-slot-a":id===state.transactionB?" tx-slot-b":"";}
function updateTransactionSlots(){
 transactionSlots();
 document.querySelectorAll("#transactionComparison [data-tx-id]").forEach(el=>{
  el.classList.toggle("tx-slot-a",el.dataset.txId===state.transactionA);
  el.classList.toggle("tx-slot-b",el.dataset.txId===state.transactionB);
 });
 for(const slot of ["A","B"]){const select=document.getElementById("transactionSlot"+slot);if(select){select.value=state["transaction"+slot];Array.from(select.options||[]).forEach(o=>o.disabled=o.value===state["transaction"+(slot==="A"?"B":"A")]);}}
}
function renderTransactionComparison(){
 const node=document.getElementById("transactionComparison"),ids=transactionSelection(),rows=ids.map(transactionCase);
 node.hidden=state.transactionMode!=="compare";if(node.hidden){node.innerHTML="";return;}
 transactionSlots(ids);
 const slot=(key)=>'<label><span>对比 '+key+'</span><select id="transactionSlot'+key+'" data-tx-slot="'+key+'" aria-label="对比槽位 '+key+'">'+rows.map(r=>'<option value="'+r.id+'"'+(state["transaction"+key]===r.id?' selected':"")+'>'+escapeHtml(r.name)+' ('+r.code+')</option>').join("")+'</select></label>';
 node.innerHTML='<header class="transaction-compare-heading"><button type="button" class="back-pill" data-tx-return>← 返回交易列表</button><h2 id="transactionCompareTitle" tabindex="-1">交易先例并列比较 <span>'+rows.length+' / 4 宗</span></h2><label class="transaction-differences"><input type="checkbox" id="transactionDifferences"'+(state.transactionDifferences==="true"?" checked":"")+'>仅看差异</label></header><div class="transaction-slot-switch">'+slot("A")+slot("B")+'</div><div class="transaction-compare-grid" style="--compare-count:'+Math.max(rows.length,1)+'"><div class="transaction-compare-row transaction-compare-names"><div class="transaction-compare-label">先例项目</div>'+rows.map(r=>'<div class="transaction-compare-cell'+transactionSlotClass(r.id)+'" data-tx-id="'+r.id+'">'+transactionTitleLink(r,"comparison")+'<button type="button" class="tx-remove-inline" data-remove-comparison="'+r.id+'" aria-label="移除 '+escapeHtml(r.name)+'">移除</button></div>').join("")+'</div>'+transactionComparisonRows(rows).filter(([,cell])=>state.transactionDifferences!=="true"||new Set(rows.map(r=>cell(r).replace(/<a\b[^>]*>.*?<\/a>/gs,"").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim())).size>1).map(([label,cell])=>'<div class="transaction-compare-row"><div class="transaction-compare-label">'+escapeHtml(label)+'</div>'+rows.map(r=>'<div class="transaction-compare-cell'+transactionSlotClass(r.id)+'" data-tx-id="'+r.id+'">'+cell(r)+'</div>').join("")+'</div>').join("")+'</div>';
 updateTransactionSlots();
}
const TRANSACTION_PILLAR_CONFIG = [
 {
  key: "ch14_14a",
  label: "第 14 / 14A 章 · 并购与关连",
  sub: "须予披露 (<25%) · 主要 · VSA/VSD · 14A",
  defaultArch: "disclosable_major",
  subtiers: [
   { key: "ch14_14a", label: "全部 14/14A 章", arch: "disclosable_major" },
   { key: "disclosable", label: "须予披露 / 股份 (<25% · 仅公告)", arch: "disclosable_major" },
   { key: "major", label: "主要交易 (Major · 25%+)", arch: "disclosable_major" },
   { key: "vsa_vsd", label: "非常重大 / 极端 (VSA / VSD)", arch: "acquisition" },
   { key: "connected", label: "14A 关连及持续关连 (CCT)", arch: "connected_whitewash" }
  ]
 },
 {
  key: "takeovers",
  label: "收购守则 · 私有化与要约",
  sub: "TC 2.10 私有化 · TC 26.1 要约 · 清洗豁免",
  defaultArch: "scheme",
  subtiers: [
   { key: "takeovers", label: "全部收购守则", arch: "scheme" },
   { key: "scheme", label: "协议安排私有化 (TC 2.10)", arch: "scheme" },
   { key: "offer", label: "全面 / 部分要约 (TC 26.1 / 28)", arch: "offer" },
   { key: "whitewash", label: "清洗豁免 / 特别交易", arch: "connected_whitewash" },
   { key: "share_buyback", label: "场外 / 要约股份回购", arch: "offer" }
  ]
 },
 {
  key: "reorg",
  label: "集团重组 · 分拆与化债",
  sub: "RTO · PN15 分拆 · 控司/A+H 换股 · 化债",
  defaultArch: "reverse_takeover",
  subtiers: [
   { key: "reorg", label: "全部重组分拆", arch: "reverse_takeover" },
   { key: "reorganisation", label: "反收购 / 更换控司", arch: "reverse_takeover" },
   { key: "reverse_takeover", label: "反向收购 RTO (LR 14.06B)", arch: "reverse_takeover" },
   { key: "spin_off", label: "PN15 分拆上市", arch: "spin_off" },
   { key: "ah_share_absorption", label: "A+H 换股吸收合并", arch: "ah_share_absorption" },
   { key: "debt_restructuring", label: "境外债务重组 / 债转股", arch: "debt_restructuring" }
  ]
 },
 {
  key: "ecm",
  label: "再融资配售 · CB 与供股",
  sub: "先旧后新 / 新股配售 · 可转债 CB · 供股包销",
  defaultArch: "topup_placing",
  subtiers: [
   { key: "ecm", label: "全部再融资 ECM", arch: "topup_placing" },
   { key: "topup_placing", label: "先旧后新 / 新股配售", arch: "topup_placing" },
   { key: "convertible_bond", label: "可转债 / 可交换债 (CB/EB)", arch: "convertible_bond" },
   { key: "rights_open_offer", label: "供股 / 公开招股包销", arch: "rights_open_offer" }
  ]
 }
];
function txActivePillarForCategory(cat) {
 if (!cat || cat === "all") return null;
 if (["acquisition","disposal","share_transaction","continuing_connected"].includes(cat)) {
  return TRANSACTION_PILLAR_CONFIG[0];
 }
 if (cat === "holding_substitution") return TRANSACTION_PILLAR_CONFIG[2];
 return TRANSACTION_PILLAR_CONFIG.find(p => p.key === cat || p.subtiers.some(s => s.key === cat)) || null;
}
function txDefaultArchetypeForCategory(cat) {
 const map = {
  ch14_14a: "disclosable_major",
  disclosable: "disclosable_major",
  share_transaction: "disclosable_major",
  major: "disclosable_major",
  vsa_vsd: "acquisition",
  acquisition: "acquisition",
  disposal: "disposal",
  connected: "connected_whitewash",
  continuing_connected: "connected_whitewash",
  takeovers: "scheme",
  scheme: "scheme",
  offer: "offer",
  whitewash: "connected_whitewash",
  share_buyback: "offer",
  reorg: "reverse_takeover",
  reorganisation: "reverse_takeover",
  reverse_takeover: "reverse_takeover",
  spin_off: "spin_off",
  holding_substitution: "holding_substitution",
  ah_share_absorption: "ah_share_absorption",
  debt_restructuring: "debt_restructuring",
  ecm: "topup_placing",
  topup_placing: "topup_placing",
  convertible_bond: "convertible_bond",
  rights_open_offer: "rights_open_offer"
 };
 return map[cat] || "";
}
function renderTransactionSummaryStrip(all, compare, row){
 const strip=document.getElementById("transactionSummaryStrip");if(!strip)return;
 strip.hidden=compare||Boolean(row)||!all.length;
 if(strip.hidden){strip.innerHTML="";return;}
 const schemes=all.filter(r=>["scheme","scheme_privatisation"].includes(r.category));
 const schemeClosed=schemes.filter(r=>["closed","completed","effective"].includes(r.stage?.status)).length;
 const schemeActive=schemes.filter(r=>["active","approved"].includes(r.stage?.status)).length;
 const schemeTerm=schemes.filter(r=>["terminated","lapsed"].includes(r.stage?.status)).length;
 const schemeStageSub=schemes.length
  ? `安排计划 ${schemes.length} 宗：${schemeClosed} 完成 · ${schemeActive} 进行中${schemeTerm?` · ${schemeTerm} 终止`:""}`
  : "暂无安排计划样本";
 const premiums=schemes.map(r=>r.comparables?.last_full_day_premium_pct).filter(Number.isFinite);
 const reorgs=all.filter(r=>["reverse_takeover","holding_substitution"].includes(r.category));
 const reorgDays=reorgs.map(r=>r.lifecycle?.naturalDays).filter(Number.isInteger).sort((a,b)=>a-b);
 const noMandateCount=all.filter(r=>!effectiveTransactionMandates(r).length).length;
 const advisorCounts=new Map();
 for(const r of all)for(const firm of new Set(effectiveTransactionMandates(r).map(m=>m.firm).filter(Boolean)))advisorCounts.set(firm,(advisorCounts.get(firm)||0)+1);
 const topAdvisors=[...advisorCounts.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,3);
 const activePillar=txActivePillarForCategory(state.transactionCategory);
 const currencies=[...new Set(all.flatMap(r=>(r.terms||[]).map(t=>t.currency)).filter(Boolean))];
 const pillarCards=[
  {key:"all",label:"全部先例",sub:`已收录 ${all.length} 宗${noMandateCount?`（含 ${noMandateCount} 宗待披露中介）`:""}`,n:all.length,badge:`${all.length} 宗`},
  ...TRANSACTION_PILLAR_CONFIG.map(p=>{
   const cnt=all.filter(r=>transactionMatchesCategory(r,p.key)).length;
   return {key:p.key,label:p.label,sub:p.sub,n:cnt,badge:`${cnt} 宗`};
  })
 ];
 const subtierHtml=activePillar
  ? `<div class="tx-subtier-ribbon" role="group" aria-label="${escapeHtml(activePillar.label)} 细分结构">
      <span class="tx-subtier-kicker">${escapeHtml(activePillar.label)} · 细分：</span>
      <div class="tx-subtier-pills">${activePillar.subtiers.map(s=>{
       const cnt=all.filter(r=>transactionMatchesCategory(r,s.key)).length;
       const active=state.transactionCategory===s.key;
       return `<button type="button" class="tx-subtier-pill${active?' is-active':''}" data-tx-cat="${escapeHtml(s.key)}" aria-pressed="${active}">${escapeHtml(s.label)}${cnt>0?` <em>${cnt}</em>`:""}</button>`;
      }).join('')}</div>
     </div>`
  : "";
 strip.innerHTML=`<div class="terminal-stat-strip tx-insight-strip">
  <div class="stat-cell"><span class="stat-label">安排计划私有化阶段分布</span><strong class="stat-val col-num">${premiums.length?`中位溢价 ${offeringNumber(p0Quantile(premiums,.5),1)}%`:`${schemes.length} 宗`}</strong><small class="stat-sub">${escapeHtml(schemeStageSub)}</small></div>
  <div class="stat-cell"><span class="stat-label">重组周期与原币披露</span><strong class="stat-val col-num">${reorgDays.length?`${reorgDays[0]}–${reorgDays.at(-1)} 天`:`${currencies.length||1} 种原币`}</strong><small class="stat-sub">覆盖 ${currencies.length?currencies.join(" / "):"HKD"} 原币条款 · 14/14A 章、收购守则、重组与再融资</small></div>
  <div class="stat-cell"><span class="stat-label">活跃签署中介（仅点选时过滤）</span><div class="tx-advisor-pills">${topAdvisors.map(([firm,cnt])=>`<button type="button" class="tx-advisor-chip${state.transactionAdvisor===firm?' is-active':''}" data-tx-advisor-pick="${escapeHtml(firm)}">${escapeHtml(firm.replace(/ Limited$/i,''))} (${cnt})</button>`).join('')}</div><small class="stat-sub">默认展示全量案例（含暂未披露中介案例）</small></div>
 </div>
 <div class="terminal-stat-strip tx-category-strip">${pillarCards.map(c=>{const active=c.key==="all"?state.transactionCategory==="all":(activePillar?.key===c.key);return `<button type="button" class="stat-cell is-clickable tx-summary-card${active?' is-active':''}" data-tx-cat="${c.key}" aria-pressed="${active}"><span class="stat-label">${c.label}</span><strong class="stat-val col-num">${c.badge}</strong><small class="stat-sub">${c.sub}</small></button>`;}).join('')}</div>${subtierHtml}`;
}
let activeTxAtlasArchetype="scheme";
let activeTxAtlasPillar="takeovers";
function renderTransactionArchetypeAtlas(all,compare,row){
 const atlas=document.getElementById("transactionArchetypeAtlas");
 const toggleBtn=document.getElementById("transactionAtlasToggle");
 const devAtlas=typeof location!=="undefined"&&new URLSearchParams(location.search).get("devAtlas")==="1";
 const kit=typeof window!=="undefined"?window.YingSightDealDiagramKit:null;
 if(!devAtlas||!atlas||!kit||!kit.ARCHETYPES){
  if(atlas){atlas.hidden=true;atlas.innerHTML="";}
  if(toggleBtn)toggleBtn.hidden=true;
  return;
 }
 if(toggleBtn)toggleBtn.hidden=compare||Boolean(row);
 atlas.hidden=compare||Boolean(row);
 if(atlas.hidden)return;
 const archetypes=Object.values(kit.ARCHETYPES);
 if(!kit.ARCHETYPES[activeTxAtlasArchetype])activeTxAtlasArchetype=archetypes[0]?.id||"scheme";
 const pillars=Array.isArray(kit.PILLAR_GROUPS)&&kit.PILLAR_GROUPS.length?kit.PILLAR_GROUPS:[{id:"all",labelZh:"全部标准架构",shortZh:"全部架构",subZh:"",archetypes:archetypes.map(a=>a.id)}];
 if(!pillars.some(p=>p.id===activeTxAtlasPillar||p.archetypes.includes(activeTxAtlasArchetype))){
  activeTxAtlasPillar=pillars[0].id;
 }
 const activePillarObj=pillars.find(p=>p.id===activeTxAtlasPillar&&p.archetypes.includes(activeTxAtlasArchetype))||pillars.find(p=>p.archetypes.includes(activeTxAtlasArchetype))||pillars[0];
 activeTxAtlasPillar=activePillarObj.id;
 const liveByArch=new Map();
 for(const c of all){
  const k=kit.detectArchetype(c);
  if(!liveByArch.has(k))liveByArch.set(k,[]);
  liveByArch.get(k).push(c);
 }
 const current=kit.ARCHETYPES[activeTxAtlasArchetype];
 const currentCases=liveByArch.get(current.id)||[];
 const pillarTabsHtml=pillars.length>1
  ? `<div class="tx-atlas-pillar-bar" role="tablist" aria-label="四大投行收入板块">${pillars.map(p=>{
     const active=p.id===activePillarObj.id;
     const liveCnt=[...new Set(p.archetypes)].reduce((sum,aid)=>sum+(liveByArch.get(aid)?.length||0),0);
     return `<button type="button" class="tx-atlas-pillar-btn${active?" is-active":""}" data-tx-atlas-pillar="${escapeHtml(p.id)}" aria-pressed="${active}"><span>${escapeHtml(p.shortZh||p.labelZh)}</span><small>${p.archetypes.length} 范式${liveCnt?` · ${liveCnt}实案`:""}</small></button>`;
    }).join("")}</div>`
  : "";
 const visibleArchetypes=activePillarObj.archetypes.map(id=>kit.ARCHETYPES[id]).filter(Boolean);
 const tabsHtml=visibleArchetypes.map(a=>{
  const cnt=(liveByArch.get(a.id)||[]).length;
  const active=a.id===current.id;
  return `<button type="button" class="dir-stage-btn${active?" is-active":""}" data-tx-atlas-arch="${escapeHtml(a.id)}" aria-pressed="${active}">${escapeHtml(a.shortZh)}<strong>${cnt?`${cnt}宗`:"模板"}</strong></button>`;
 }).join("");
 const rulesHtml=(current.ruleTriggers||[]).map(r=>`<span class="tx-rule-chip">${escapeHtml(r)}</span>`).join("");
 const caseLinksHtml=currentCases.length
  ? currentCases.map(c=>`<button type="button" class="tx-advisor-chip" data-tx-atlas-case="${escapeHtml(c.id)}">查看实案：${escapeHtml(c.name)} (${c.code}) →</button>`).join("")
  : '<span class="ddk-rule-pill">标准交易架构与收费范式</span>';
 atlas.innerHTML=`<summary><span>港股投行并购重组与再融资十四大标准架构图谱 <small style="font-weight:500;color:var(--muted);margin-left:6px">14/14A 章 · 收购守则 · 重组分拆化债 · 配售 / CB / 供股 · 14 大范式</small></span></summary><div class="transaction-section-body">${pillarTabsHtml}<div class="dir-stage-tabs" role="tablist" aria-label="${escapeHtml(activePillarObj.labelZh)}标准架构" style="width:100%;margin-bottom:10px">${tabsHtml}</div><div style="display:flex;align-items:center;justify-content:space-between;gap:8px 14px;flex-wrap:wrap;padding:8px 12px;background:var(--bg-subtle);border:1px solid var(--line);border-radius:4px;font-size:12px"><div style="min-width:0;flex:1 1 360px"><strong>${escapeHtml(current.labelZh)}</strong> <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-left:4px">${escapeHtml(current.labelEn)}</span><p style="margin:4px 0 0;color:var(--ink-2);line-height:1.45">${escapeHtml(current.summaryZh)}</p></div><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">${rulesHtml}${caseLinksHtml}</div></div>${kit.renderDealDiagram(current.codexTemplate)}</div>`;
}
function renderTransactions(){
 const all=state.transactionData?.cases||[],ids=transactionSelection();state.transactionCompare=ids.join(",");
 const diagramKit=typeof window!=="undefined"?window.YingSightDealDiagramKit:null;
 const options=(id,values,label)=>{const n=document.getElementById(id);n.innerHTML='<option value="all">'+label+'</option>'+values.map(([v,t])=>'<option value="'+escapeHtml(v)+'">'+escapeHtml(t)+'</option>').join("");};
 const rules=new Map(all.flatMap(r=>(r.rules||[]).map(x=>[x.code,x.label])));options("transactionRule",[...rules],"全部规则");
 options("transactionCurrency",[...new Set(all.flatMap(r=>(r.terms||[]).map(t=>t.currency)).filter(Boolean))].sort().map(x=>[x,x]),"全部币种");
 options("transactionAdvisor",[...new Set(all.flatMap(r=>effectiveTransactionMandates(r).map(m=>m.firm)).filter(Boolean))].sort().map(x=>[x,x]),"全部机构");
 for(const [id,key] of transactionFilterControls)document.getElementById(id).value=state[key];
 const rows=transactionRows(),row=transactionCase(state.transactionId),compare=state.transactionMode==="compare";
 renderTransactionSummaryStrip(all,compare,row);
 document.getElementById("transactionCount").textContent=state.transactionData?"精选交易 "+rows.length+" / "+all.length+" 宗 · 截至 "+state.transactionData.asOf:"交易资料暂时无法读取";
 const workspace=document.getElementById("transactionWorkspace");workspace.hidden=compare;workspace.classList.toggle("has-detail",!!row);
 const emptyTxHtml='<div class="transaction-empty empty-state-row"><p>未找到符合当前筛选的交易先例</p><button type="button" data-tx-reset>清除筛选条件</button></div>';
 document.getElementById("transactionCards").innerHTML=rows.length?'<div class="tx-table-wrap"><table class="tx-table"><thead><tr><th scope="col">公司 / 交易各方</th><th scope="col">交易结构与规则</th><th scope="col">确认阶段</th><th scope="col" class="col-num">核心对价 / 比率</th><th scope="col" class="col-num">首公→寄发 / 寄发→表决 / 总历时</th><th scope="col" class="col-action">比较</th></tr></thead><tbody>'+rows.map(r=>{
  const effM=effectiveTransactionMandates(r),leadM=effM.filter(m=>transactionIsLeadIB(m));
  const t=transactionHeadlineTerm(r),partyEntry=Object.entries(r.parties||{})[0],advisors=[...new Set((leadM.length?leadM:effM).map(m=>m.firmZh||m.firm).filter(Boolean))].slice(0,3).join(" · ");
  const rulePills=(r.rules||[]).slice(0,3).map(x=>'<span class="tx-rule-chip">'+escapeHtml(x.label)+'</span>').join("");
  const flowBadge=diagramKit && !FIRST_BATCH_PENDING_DIAGRAMS.has(r.id)?diagramKit.renderCompactFlowBadge(r,state.transactionData?.documents):"";
  const ratioTerm=transactionTerm(r,"exchange_ratio");
  const extraMetric=Number.isFinite(r.comparables?.last_full_day_premium_pct)?`溢价 ${r.comparables.last_full_day_premium_pct}%`:(ratioTerm&&ratioTerm.key!==t?.key?`换股 ${transactionAmount(ratioTerm)}`:"");
  const tm=transactionTimingMetrics(r);
  const cycleHtml=`<div class="tx-timing-mini"><strong class="col-num${tm.isLive?" is-live":""}">${escapeHtml(tm.totalLabel)} ${escapeHtml(tm.totalVal)}</strong><small class="col-num">寄发 ${escapeHtml(tm.disp)} · 表决 ${escapeHtml(tm.vote)}</small><small>${escapeHtml(tm.totalSub)}</small></div>`;
  return '<tr tabindex="0" role="button" class="transaction-result'+(r.id===state.transactionId?' is-selected':"")+'" data-transaction-id="'+r.id+'"><th scope="row" class="tx-col-company">'+transactionTitleLink(r)+(partyEntry?'<small class="tx-party-sub">'+escapeHtml(partyEntry[0]+'：'+partyEntry[1])+'</small>':"")+'</th><td class="tx-col-mech" data-label="结构与规则"><span class="tx-mech-text">'+escapeHtml(r.mechanism)+'</span><div class="tx-rule-chips">'+rulePills+'</div>'+flowBadge+(advisors?'<small class="tx-advisor-sub">'+escapeHtml(advisors)+'</small>':"")+'</td><td class="tx-col-stage" data-label="阶段"><span class="tx-stage-pill is-'+escapeHtml(r.stage.status)+'">'+escapeHtml(r.stage.label)+'</span><time>'+r.stage.date+'</time></td><td class="col-num tx-col-amount" data-label="核心条款"><div class="transaction-result-value"><strong>'+(t?transactionDisplayAmount(t):'—')+'</strong><span>'+(t?escapeHtml(t.label)+(extraMetric?' · '+escapeHtml(extraMetric):''):'')+'</span></div></td><td class="col-num tx-col-cycle" data-label="节点周期">'+cycleHtml+'</td><td class="tx-col-action"><button type="button" data-compare-transaction="'+r.id+'" class="tx-compare-btn" aria-pressed="'+ids.includes(r.id)+'" aria-label="'+(ids.includes(r.id)?"取消比较 ":"加入比较 ")+escapeHtml(r.name)+'"'+(ids.length>=4&&!ids.includes(r.id)?" disabled":"")+'>'+(ids.includes(r.id)?"已选 ✓":"＋对比")+'</button></td></tr>';
 }).join("")+'</tbody></table></div>':emptyTxHtml;
 const detail=document.getElementById("transactionDetail");detail.hidden=!row;detail.innerHTML=row?transactionDetail(row):"";
 const empty=document.getElementById("transactionDetailEmpty");empty.hidden=true;empty.textContent="";
 renderTransactionArchetypeAtlas(all,compare,row);
 const basket=document.getElementById("transactionBasket");basket.hidden=!ids.length||compare;
 basket.innerHTML=ids.length?'<span class="tx-basket-count">已选 '+ids.length+' / 4 宗</span><div class="tx-basket-pills">'+ids.map(id=>{const r=transactionCase(id);return '<button type="button" class="tx-basket-pill" data-remove-comparison="'+id+'" aria-label="移除 '+escapeHtml(r.name)+'">'+escapeHtml(r.name)+' ('+r.code+') ×</button>';}).join("")+'</div><div class="tx-basket-actions"><button type="button" id="transactionCompareOpen" class="tx-basket-go" data-tx-compare-open'+(ids.length<2?" disabled":"")+'>'+(ids.length<2?"再选 1 宗可并排对比":"并排对比 ("+ids.length+") →")+'</button><button type="button" class="tx-basket-clear" data-clear-comparison>清空</button></div>':"";
 renderTransactionComparison();
}
function openTransaction(id,trigger=document.activeElement){
 if(!transactionCase(id))return false;
 p0SaveLocation(trigger);const previous=location.pathname+location.search;const needSwitch=state.view!=="precedents";state.transactionId=id;state.transactionMode="list";state.view="precedents";syncUrl("push",previous);if(needSwitch)switchView("precedents",false);else renderTransactions();document.getElementById("transactionDetailTitle")?.focus({preventScroll:true});if(needSwitch||window.matchMedia?.("(max-width: 767px)").matches)window.scrollTo(0,0);return true;
}
function openTransactionComparison(trigger=document.activeElement){
 if(transactionSelection().length<2)return false;
 p0SaveLocation(trigger);const previous=location.pathname+location.search;state.view="precedents";state.transactionId="";state.transactionMode="compare";transactionSlots();syncUrl("push",previous);renderTransactions();document.getElementById("transactionCompareTitle")?.focus({preventScroll:true});window.scrollTo(0,0);return true;
}
function returnTransaction(forceList=false){
 const info=p0FromUrlInfo();
 if(!forceList&&info&&info.view==="precedents"&&!info.params.get("transactionId")){
  const fromCompare=info.params.get("transactionMode")==="compare"||info.params.get("mode")==="compare";
  if(state.transactionMode!=="compare"||!fromCompare){history.back();return;}
 }
 const id=state.transactionId;state.transactionId="";state.transactionMode="list";state.view="precedents";renderTransactions();syncUrl("push","");window.scrollTo(0,0);
 (id&&document.querySelector('#transactionCards [data-tx-open="'+CSS.escape(id)+'"]')||document.getElementById("transactionSearch"))?.focus({preventScroll:true});
}
function openReorganisationExamples(trigger=document.activeElement){
 p0SaveLocation(trigger);const previous=location.pathname+location.search;
 for(const [,key] of transactionFilterControls)state[key]=defaults[key];
 state.transactionCategory="reorganisation";state.transactionId="";state.transactionMode="list";state.view="precedents";
 renderTransactions();syncUrl("push",previous);document.getElementById("transactionSearch")?.focus({preventScroll:true});
}
function resetTransactionFilters(){
 for(const [,key] of transactionFilterControls)state[key]=defaults[key];renderTransactions();syncUrl();document.getElementById("transactionSearch")?.focus({preventScroll:true});
}
function transactionCompareAction(button){
 const toggle=button.dataset.compareTransaction,remove=button.dataset.removeComparison,clear=button.hasAttribute("data-clear-comparison"),id=toggle||remove;
 if(!toggle&&!remove&&!clear)return false;
 let ids=transactionSelection();
 if(clear)ids=[];else if(remove)ids=ids.filter(x=>x!==remove);else if(ids.includes(id))ids=ids.filter(x=>x!==id);else if(transactionCase(id)&&ids.length<4)ids.push(id);else return true;
 state.transactionCompare=ids.join(",");if(ids.length<2&&state.transactionMode==="compare")state.transactionMode="list";
 renderTransactions();syncUrl();
 const focus=clear?document.getElementById("transactionSearch"):state.transactionMode==="compare"?document.querySelector("#transactionComparison [data-remove-comparison]"):document.querySelector('#transactionCards [data-compare-transaction="'+CSS.escape(id)+'"]')||document.querySelector('#transactionBasket [data-remove-comparison]')||document.getElementById("transactionSearch");
 focus?.focus({preventScroll:true});return true;
}
function bindTransactionControls(){
 for(const [id,key] of transactionFilterControls)document.getElementById(id).addEventListener(id==="transactionSearch"?"input":"change",e=>{state[key]=e.target.value;renderTransactions();syncUrl();});
 document.getElementById("clearTransactions").addEventListener("click",resetTransactionFilters);
 const root=document.getElementById("precedentsView");
 root.addEventListener("click",e=>{
  const a=e.target.closest("a[data-tx-open]");
  if(a&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&(e.button==null||e.button===0)){e.preventDefault();openTransaction(a.dataset.txOpen,a);return;}
  const b=e.target.closest("button");
  if(b){
   if(b.hasAttribute("data-ddk-filter-btn"))return;
   if(b.hasAttribute("data-tx-atlas-toggle")){
    const atlas=document.getElementById("transactionArchetypeAtlas");
    if(atlas){atlas.hidden=false;atlas.open=!atlas.open;if(atlas.open)atlas.scrollIntoView?.({behavior:"smooth",block:"nearest"});}
    return;
   }
   if(b.dataset.txAtlasPillar){
    const kit=typeof window!=="undefined"?window.YingSightDealDiagramKit:null;
    const pObj=kit?.PILLAR_GROUPS?.find(p=>p.id===b.dataset.txAtlasPillar);
    if(pObj){
     activeTxAtlasPillar=pObj.id;
     if(!pObj.archetypes.includes(activeTxAtlasArchetype))activeTxAtlasArchetype=pObj.archetypes[0];
     renderTransactionArchetypeAtlas(state.transactionData?.cases||[],state.transactionMode==="compare",transactionCase(state.transactionId));
     const atlas=document.getElementById("transactionArchetypeAtlas");
     if(atlas)atlas.open=true;
    }
    return;
   }
   if(b.dataset.txOpenAtlasArch){
    activeTxAtlasArchetype=b.dataset.txOpenAtlasArch;
    const kit=typeof window!=="undefined"?window.YingSightDealDiagramKit:null;
    const pObj=kit?.PILLAR_GROUPS?.find(p=>p.archetypes.includes(activeTxAtlasArchetype));
    if(pObj)activeTxAtlasPillar=pObj.id;
    renderTransactionArchetypeAtlas(state.transactionData?.cases||[],state.transactionMode==="compare",transactionCase(state.transactionId));
    const atlas=document.getElementById("transactionArchetypeAtlas");
    if(atlas){atlas.hidden=false;atlas.open=true;atlas.scrollIntoView?.({behavior:"smooth",block:"nearest"});}
    return;
   }
   if(b.dataset.txAtlasArch){
    activeTxAtlasArchetype=b.dataset.txAtlasArch;
    renderTransactionArchetypeAtlas(state.transactionData?.cases||[],state.transactionMode==="compare",transactionCase(state.transactionId));
    const atlas=document.getElementById("transactionArchetypeAtlas");
    if(atlas)atlas.open=true;
    return;
   }
   if(b.dataset.txJumpRound){openOfferingDossier(b.dataset.txJumpRound);return;}
   if(b.dataset.txJumpIssuer){openDetail(b.dataset.txJumpIssuer);return;}
   if(b.dataset.txAtlasCase){openTransaction(b.dataset.txAtlasCase,b);return;}
   if(b.dataset.txCat){
    const targetCat=b.dataset.txCat;
    state.transactionCategory=targetCat==="all"?"all":(state.transactionCategory===targetCat?"all":targetCat);
    const syncedArch=txDefaultArchetypeForCategory(state.transactionCategory);
    if(syncedArch){
     activeTxAtlasArchetype=syncedArch;
     const kit=typeof window!=="undefined"?window.YingSightDealDiagramKit:null;
     const pObj=kit?.PILLAR_GROUPS?.find(p=>p.archetypes.includes(syncedArch));
     if(pObj)activeTxAtlasPillar=pObj.id;
    }
    state.transactionId="";renderTransactions();syncUrl();return;
   }
   if(b.dataset.txAdvisorPick){state.transactionAdvisor=state.transactionAdvisor===b.dataset.txAdvisorPick?"all":b.dataset.txAdvisorPick;state.transactionId="";renderTransactions();syncUrl();return;}
   if(b.hasAttribute("data-tx-reorganisation")){openReorganisationExamples(b);return;}
   if(transactionCompareAction(b))return;
   if(b.hasAttribute("data-tx-origin-back")){if(history.state?.fromUrl)history.back();return;}
   if(b.hasAttribute("data-tx-force-list")){returnTransaction(true);return;}
   if(b.hasAttribute("data-tx-return"))returnTransaction(false);
   else if(b.hasAttribute("data-tx-compare-open"))openTransactionComparison(b);
   else if(b.hasAttribute("data-tx-reset"))resetTransactionFilters();
   return;
  }
  if(e.target.closest("a,input,select,summary,label,.ddk-board"))return;
  const row=e.target.closest("tr[data-transaction-id]");
  if(row){const link=row.querySelector("a[data-tx-open]");openTransaction(row.dataset.transactionId,link||row);return;}
  const cmpCell=e.target.closest(".transaction-compare-names .transaction-compare-cell[data-tx-id]");
  if(cmpCell){const link=cmpCell.querySelector("a[data-tx-open]");openTransaction(cmpCell.dataset.txId,link||cmpCell);}
 });
 root.addEventListener("keydown",e=>{
  if(e.key!=="Enter"&&e.key!==" ")return;
  if(e.target.closest("button,a,input,select,summary"))return;
  const row=e.target.closest("tr[data-transaction-id]");
  if(!row)return;
  e.preventDefault();
  const link=row.querySelector("a[data-tx-open]");
  openTransaction(row.dataset.transactionId,link||row);
 });
 root.addEventListener("toggle",e=>{if(e.target.dataset?.txSection&&e.target.isConnected)transactionDisclosureState.set(e.target.dataset.txSection,e.target.open);},true);
 root.addEventListener("change",e=>{
  const slot=e.target.dataset.txSlot;
  if(slot){const value=e.target.value,other=slot==="A"?"B":"A";if(transactionSelection().includes(value)&&value!==state["transaction"+other]){state["transaction"+slot]=value;updateTransactionSlots();syncUrl();}return;}
  if(e.target.id==="transactionDifferences"){state.transactionDifferences=e.target.checked?"true":"";renderTransactionComparison();syncUrl();document.getElementById("transactionDifferences")?.focus({preventScroll:true});}
 });
}
if (typeof window !== "undefined") {
  window.YingSightTransactions=Object.freeze({schemaVersion:1,getCases:()=>structuredClone(state.transactionData?.cases||[]),getEffectiveMandates:rowOrId=>{const r=typeof rowOrId==="string"?transactionCase(rowOrId):rowOrId;return structuredClone(effectiveTransactionMandates(r));},getCaseEnrichment:id=>structuredClone(TX_CASE_ENRICHMENTS[id]||null),select:filters=>structuredClone(transactionRows({...defaults,...filters})),getCase:id=>structuredClone(transactionCase(id)||null),getDocuments:()=>structuredClone(state.transactionData?.documents||{})});
}

function switchView(view, updateLocation=true) {
  const aliases={ap:"directory",pace:"tracker",paused:"pausedOfferings",offerings:"pausedOfferings",sponsors:"sponsorLeaderboard",dossier:"dossiers",transactions:"precedents"};view=aliases[view]||view;
  if(["signals","research"].includes(view))view="tracker";
  const previous=window.location.pathname+window.location.search;
  const moved=p0CanonicalLocationView()!==view||(view==='dossiers'&&(new URLSearchParams(location.search).get('roundId')||new URLSearchParams(location.search).get('dossierId'))!==(state.roundId||state.dossierId));
  if(updateLocation&&moved)p0SaveLocation();
  state.view=viewTitles[view]?view:"directory";
  const panelId=state.view==="pausedOfferings"?"offeringsView":`${state.view}View`;
  document.querySelectorAll('.view-panel').forEach(p=>{
    const visible=p.id===panelId;
    p.classList.toggle('is-visible',visible);
    if(p.id==='offeringsView')p.hidden=!visible;
  });
  const active=state.view==="dossiers"?"fees":state.view==="sponsorPk"?"sponsorLeaderboard":state.view;
  document.querySelectorAll('.nav-item').forEach(n=>{n.classList.toggle('is-active',n.dataset.view===active);if(n.dataset.view===active)n.setAttribute('aria-current','page');else n.removeAttribute('aria-current');});
  document.getElementById('viewTitle').textContent=viewTitles[state.view]||'追瑞';
  document.getElementById('mobileViewTitle').textContent=active==="directory"?'项目总录':active==="fees"?'新股与费用':active==="pausedOfferings"?'发售搁置':active==="cornerstones"?'基石画像':active==="sponsorLeaderboard"?(state.view==="sponsorPk"?'保荐人擂台':'保荐人龙虎榜'):active==="precedents"?'交易与重组':'监管节奏';
  document.getElementById('sourcePill').textContent=state.view==='fees'?feeCoverageLabel():state.view==='dossiers'?'':state.view==='directory'||state.view==='tracker'?`${state.data?.records?.length||0} 家发行人`:'';
  document.getElementById('listingStagePanel').style.display=state.view==='tracker'?'':'none';
  if(state.view==='directory'&&state.data)renderDirectory();
  if(state.view==='fees')renderFeeComparison();
  if(state.view==='pausedOfferings'&&state.data)renderOfferings();
  if(state.view==='cornerstones')renderCornerstones();
  if(state.view==='dossiers')renderDossiers();
  if(state.view==='precedents')renderTransactions();
  if(state.view==='tracker'&&state.data)renderRows();
  if(updateLocation){syncUrl(moved?'push':'replace',state.view==='dossiers'?previous:'');if(moved){window.scrollTo(0,0);if(state.view==='dossiers')renderDossiers();}}
  window.dispatchEvent(new CustomEvent('yingsight:view',{detail:{view:state.view,firm:state.firm}}));
}

function renderChrome() {
  const meta = state.data.meta || {};
  const summary = state.data.summary || {};
  const coverage = summary.listingMarketCapCoverage;
  const coverageNote = document.getElementById("listingMarketCapCoverageNote");
  if (coverageNote) {
    const valid = [coverage?.total, coverage?.verified, coverage?.estimate, coverage?.excluded]
      .every(n => Number.isSafeInteger(n) && n >= 0)
      && coverage.verified + coverage.estimate + coverage.excluded === coverage.total;
    coverageNote.hidden = !valid;
    coverageNote.textContent = valid
      ? `上市市值覆盖 ${coverage.total} 家：已核实 ${coverage.verified} 家，估算 ${coverage.estimate} 家，未纳入 ${coverage.excluded} 家。 / Listing market caps: ${coverage.verified} verified, ${coverage.estimate} estimated, ${coverage.excluded} excluded (${coverage.total} total).`
      : "";
  }
  document.getElementById("sourcePill").textContent = state.view === "fees" ? feeCoverageLabel() : state.view === "dossiers" ? `新股发行 · ${eligibleOfferingDossiers().length} 家` : `公开披露 · ${formatNumber(summary.trackedIssuers || state.data.records.length, "integer")} 家`;
  document.getElementById("dataMode").textContent =
    meta.sourceMode === "live_snapshot" ? "公开资料" : "限量样本";
  document.getElementById("snapshotMeta").textContent =
    meta.generatedAt
      ? `港交所及中国证监会公开资料 · 更新时间 ${meta.generatedAt.replace("T", " ").slice(0, 16)}（香港）`
      : meta.disclaimerZh || meta.marketCapNoteZh || "";
  if (state.view === "tracker") {
    document.getElementById("viewTitle").textContent = trackerTitle();
  }
  syncListingStageButtons();
  syncTrackerTableMode();
}

function emptyPayload(message) {
  return {
    meta: { labelZh: "加载失败", marketCapNoteZh: message },
    summary: {},
    records: []
  };
}

function applyStateFromUrl() {
  const p=new URLSearchParams(window.location.search);
  for(const k of trackedStateKeys) state[k]=defaults[k];
  for(const k of trackedStateKeys) if(p.has(k)) state[k]=["page","feePage","dirPage"].includes(k)?Math.max(1,Math.floor(Number(p.get(k))||1)):k==="cohortCollapsed"?p.get(k)==="true":p.get(k);
  const alias={ap:"directory",pace:"tracker",paused:"pausedOfferings",offerings:"pausedOfferings",sponsors:"sponsorLeaderboard",dossier:"dossiers",transactions:"precedents"};state.view=alias[state.view]||state.view;
  if(p.has("group"))state.feePhase={paused:"paused",priced:"listed",other:"other"}[p.get("group")]||state.feePhase;
  state.roundId=p.get("roundId")||p.get("dossierId")||"";state.dossierId=state.roundId;
  if(p.get("structure")==="AH")state.structure="a_h";
  if(p.has("focus"))state.feeRoundId=p.get("focus");
  if(p.has("compare"))state[state.view==="precedents"?"transactionCompare":"feeCompare"]=p.get("compare");
  if(state.view==="precedents"&&p.get("mode")==="compare")state.transactionMode="compare";
  if(p.has("from"))state[state.view==="fees"?"feeDateFrom":"dateFrom"]=p.get("from");
  if(p.has("to"))state[state.view==="fees"?"feeDateTo":"dateTo"]=p.get("to");
  if((state.hkexStage==="applying"||state.hkexStage==="other")&&state.cohortMetric==="a1ToListing")state.cohortMetric="a1ToReceived";
}

function syncUrl(mode="replace", fromUrl="") {
  const p=new URLSearchParams(window.location.search);
  for(const k of trackedStateKeys){p.delete(k);const v=state[k];if(v!==defaults[k]&&v!==""&&v!==null&&v!==undefined)p.set(k,String(v));}
  p.set("view",({directory:"directory",tracker:"pace",pausedOfferings:"paused",cornerstones:"cornerstones",sponsorLeaderboard:"sponsors",dossiers:"dossier",precedents:"transactions"})[state.view]||state.view);
  if(state.view==="dossiers"){p.set("roundId",state.roundId||state.dossierId);p.delete("dossierId");}
  else {p.delete("roundId");p.delete("dossierId");}
  for(const k of ["group","focus","compare","mode","from","to"])p.delete(k);
  const next=window.location.pathname+"?"+p;
  const current=window.history.state||{};
  const inDetail=Boolean(state.view==="dossiers"||state.roundId||state.dossierId||state.transactionId||state.transactionMode==="compare"||state.csId||state.peek||state.firm);
  if(mode==="push")window.history.pushState({fromUrl:inDetail?fromUrl:"",scrollY:0,triggerSelector:p0LastTrigger},"",next);
  else window.history.replaceState({...current,fromUrl:inDetail?(current.fromUrl||""):"",scrollY:window.scrollY},"",next);
}

function syncControls() {
  const listed = state.hkexStage === "listed";
  if (listed && state.sortField === "aShareMarketCapAtA1RmbBn") state.sortField = "listingMarketCapHkdBn";
  if (!listed && state.sortField === "listingMarketCapHkdBn") state.sortField = "aShareMarketCapAtA1RmbBn";
  state.daySortField = fieldForDayMode(state.daySortField, state.dayCountMode);
  if (daySortFields.includes(state.sortField)) state.sortField = fieldForDayMode(state.sortField, state.dayCountMode);
  setDaySelectOptions();
  syncTrackerTableMode();
  document.getElementById("issuerSearch").value = state.query;
  document.getElementById("dateField").value = state.dateField;
  document.getElementById("dateFrom").value = state.dateFrom;
  document.getElementById("dateTo").value = state.dateTo;
  document.getElementById("structureFilter").value = state.structure;
  document.getElementById("industryFilter").value = state.industry;
  document.getElementById("sponsorFilter").value = state.sponsor;
  document.getElementById("marketCapMin").value = state.marketCapMin;
  document.getElementById("marketCapMax").value = state.marketCapMax;
  document.getElementById("sortField").value = daySortFields.includes(state.sortField) ? "__days__" : state.sortField;
  document.getElementById("daySortField").value = state.daySortField;
  document.querySelectorAll("[data-day-count-mode]").forEach((button) => {
    const active = button.dataset.dayCountMode === state.dayCountMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const dayModeHint = document.getElementById("dayModeHint");
  if (dayModeHint) dayModeHint.textContent = dayBasisNote();
  document.getElementById("sortDirection").textContent = state.sortDir === "asc" ? "升序" : "降序";
  document.getElementById("sortDirection").dataset.dir = state.sortDir;
  document.querySelectorAll(".segment").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.status === state.status);
  });
  syncListingStageButtons();
  syncSortHeaders();
}

function updateTracker(partial = {}, options = {}) {
  Object.assign(state, partial);
  if ((state.hkexStage === "applying" || state.hkexStage === "other") && state.cohortMetric === "a1ToListing") {
    state.cohortMetric = "a1ToReceived";
    state.cohort = "";
    if (dayMetricForField(state.daySortField) === "a1ToListing") state.daySortField = dayMetricField("a1ToReceived");
    if (dayMetricForField(state.sortField) === "a1ToListing") state.sortField = state.daySortField;
  }
  if (options.resetPage !== false) state.page = 1;
  if (!state.data) {
    syncUrl();
    return;
  }
  if (options.debounce) {
    renderInputLater();
    return;
  }
  syncControls();
  syncUrl();
  renderChrome();
  renderRows();
  if (document.getElementById("detailModal")?.classList.contains("is-open")) {
    renderDetail(state.data.records.find((item) => item.id === state.selectedId));
  }
}

function defaultSortDir(field) {
  return descendingDefaultSortFields.has(field) ? "desc" : "asc";
}

function syncSortHeaders() {
  document.querySelectorAll(".th-sort").forEach((button) => {
    const field = button.dataset.sortField === "__days__" ? state.daySortField : button.dataset.sortField;
    const active = field === state.sortField;
    button.classList.toggle("is-active", active);
    const th = button.closest("th");
    if (th) th.setAttribute("aria-sort", active ? (state.sortDir === "asc" ? "ascending" : "descending") : "none");
    const indicator = button.querySelector(".sort-indicator");
    if (indicator) indicator.textContent = active ? (state.sortDir === "asc" ? "↑" : "↓") : "";
  });
}

function updateSortField(field) {
  const nextField = field === "__days__" ? state.daySortField : field;
  const nextDir = state.sortField === nextField
    ? (state.sortDir === "asc" ? "desc" : "asc")
    : defaultSortDir(nextField);
  updateTracker({ sortField: nextField, sortDir: nextDir });
}

async function loadData() {
  setLoading(true);
  const read = async url => {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };
  const [tracker, fees, dossiers, transactions, roster] = await Promise.allSettled([read(DATA_URL), read(OFFERING_FEES_URL), read(OFFERING_DOSSIERS_URL), read(TRANSACTION_CASES_URL), read(FEE_ROSTER_URL)]);
  state.data = tracker.status === "fulfilled" ? applyVerifiedReceiptCycles(tracker.value) : emptyPayload(`无法读取 ${DATA_URL}，请检查本地 server。`);
  if (typeof window !== "undefined") window.__yingsightCsrcRecords = state.data.records || [];
  state.feeData = fees.status === "fulfilled" ? fees.value : null;
  state.feeRosterData = roster.status === "fulfilled" ? roster.value : null;
  state.dossierData = dossiers.status === "fulfilled" ? dossiers.value : null;
  state.transactionData = transactions.status === "fulfilled" ? transactions.value : null;
  if (typeof window !== "undefined") window.dispatchEvent?.(new CustomEvent("yingsight:fees-ready"));
  stageCountsCache = null;
  sponsorShortNameCache.clear();
  for (const record of state.data.records || []) {
    getRecordText(record);
  }
  if (!["calendar", "business"].includes(state.dayCountMode)) state.dayCountMode = "calendar";
  if (state.sortField === "__days__") state.sortField = state.daySortField;
  state.daySortField = fieldForDayMode(state.daySortField, state.dayCountMode);
  if (daySortFields.includes(state.sortField)) {
    state.sortField = fieldForDayMode(state.sortField, state.dayCountMode);
    state.daySortField = state.sortField;
  }
  state.selectedId = state.data.records[0]?.id || null;
  populateFilters();
  populateDirectoryFilters();
  syncControls();
  render();
  switchView(state.view, false);
  if(state.peek)openDetail(state.peek,false);
  window.setTimeout(() => setLoading(false), 160);
}

function render() {
  renderChrome();
  renderDirectory();
  renderRows();
  renderOfferings();
  renderCornerstones();
  renderFeeComparison();
  renderDossiers();
  renderTransactions();
}

function activateTopNavView(rawView) {
  closeDetail(false);
  if (rawView === "precedents" || rawView === "transactions") {
    const inSub = Boolean(state.transactionId) || state.transactionMode === "compare";
    state.transactionId = "";
    state.transactionMode = "list";
    if (state.view === "precedents" && inSub) {
      renderTransactions();
      syncUrl("push", "");
      window.scrollTo(0, 0);
      return;
    }
  } else if (rawView === "cornerstones") {
    const inSub = Boolean(state.csId);
    state.csId = "";
    if (state.view === "cornerstones" && inSub) {
      renderCornerstones();
      syncUrl("push", "");
      window.scrollTo(0, 0);
      return;
    }
  } else if (rawView === "fees") {
    state.roundId = "";
    state.dossierId = "";
  } else if (rawView === "sponsorLeaderboard") {
    state.firm = "";
  }
  switchView(rawView);
}

document.querySelectorAll(".nav-item[data-view]").forEach((button) => {
  button.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    activateTopNavView(button.dataset.view);
  });
});

document.querySelector(".brand-home")?.addEventListener("click", event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  activateTopNavView("directory");
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => updateTracker({ status: button.dataset.status }));
});

document.querySelectorAll("[data-hkex-stage]").forEach((button) => {
  button.addEventListener("click", () => updateTracker({ hkexStage: button.dataset.hkexStage }));
});

function debounce(fn, wait = 160) {
  let timer = null;
  return (...args) => {
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  };
}

// Capture input immediately; debounce only rendering so hydration cannot erase a keystroke.
const renderInputLater = debounce(() => updateTracker({}, { resetPage: false }));
for (const [id, key] of [["issuerSearch", "query"], ["marketCapMin", "marketCapMin"], ["marketCapMax", "marketCapMax"]]) {
  document.getElementById(id).addEventListener("input", event => updateTracker({ [key]: event.target.value }, { debounce: true }));
}

document.getElementById("dateField").addEventListener("change", (event) => {
  updateTracker({ dateField: event.target.value });
});

document.getElementById("dateFrom").addEventListener("change", (event) => {
  updateTracker({ dateFrom: event.target.value });
});

document.getElementById("dateTo").addEventListener("change", (event) => {
  updateTracker({ dateTo: event.target.value });
});

document.getElementById("structureFilter").addEventListener("change", (event) => {
  updateTracker({ structure: event.target.value });
});

document.getElementById("industryFilter").addEventListener("change", (event) => {
  updateTracker({ industry: event.target.value });
});

document.getElementById("sponsorFilter").addEventListener("change", (event) => {
  updateTracker({ sponsor: event.target.value });
});

document.getElementById("sortField").addEventListener("change", (event) => {
  const nextField = event.target.value === "__days__" ? state.daySortField : event.target.value;
  const patch = { sortField: nextField };
  if (daySortFields.includes(nextField)) patch.daySortField = nextField;
  updateTracker(patch);
});

document.getElementById("daySortField").addEventListener("change", (event) => {
  updateTracker({
    daySortField: event.target.value,
    sortField: event.target.value,
    sortDir: defaultSortDir(event.target.value)
  });
});

document.querySelectorAll("[data-day-count-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextMode = button.dataset.dayCountMode;
    const nextDaySortField = fieldForDayMode(state.daySortField, nextMode);
    const nextSortField = daySortFields.includes(state.sortField)
      ? fieldForDayMode(state.sortField, nextMode)
      : state.sortField;
    updateTracker({
      dayCountMode: nextMode,
      daySortField: nextDaySortField,
      sortField: nextSortField
    });
  });
});

document.getElementById("sortDirection").addEventListener("click", () => {
  updateTracker({ sortDir: state.sortDir === "asc" ? "desc" : "asc" });
});

document.querySelectorAll(".th-sort").forEach((button) => {
  button.addEventListener("click", () => updateSortField(button.dataset.sortField));
});

const trackerRowsBody = document.getElementById("trackerRows");
trackerRowsBody.addEventListener("click", (event) => {
  const offering = event.target.closest("[data-offering-id]");
  if (offering) {
    const record = state.data.records.find(item => item.id === offering.dataset.offeringId);
    state.offeringQuery = currentOfferingNotice(record)?.stockCode || "";
    closeDetail();
    switchView("paused");
    return;
  }
  const row = event.target.closest("[data-record-id]");
  if (row) selectRecord(row.dataset.recordId, row);
});
trackerRowsBody.addEventListener("keydown", (event) => {
  if (event.target.closest("[data-offering-id]")) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  const row = event.target.closest("[data-record-id]");
  if (!row) return;
  event.preventDefault();
  selectRecord(row.dataset.recordId, row);
});

document.getElementById("metricsGrid").addEventListener("click", (event) => {
  const paceStatusBtn = event.target.closest("[data-pace-filter-status]");
  if (paceStatusBtn?.dataset?.paceFilterStatus) {
    const s = paceStatusBtn.dataset.paceFilterStatus;
    updateTracker({ hkexStage: "applying", status: s === "all" ? "all" : (state.hkexStage === "applying" && publicStatusKey(state.status) === s ? "all" : s) });
    return;
  }
  const stageBtn = event.target.closest("[data-hkex-stage]");
  if (stageBtn) {
    updateTracker({ hkexStage: stageBtn.dataset.hkexStage });
    return;
  }
  const status = event.target.closest("[data-count-status]")?.dataset.countStatus;
  if (status) {
    updateTracker({status: publicStatusKey(state.status) === status ? "all" : status});
    return;
  }
  const button = event.target.closest("[data-record-id][data-sort-field]");
  if (!button) return;
  focusRecordInTable(button.dataset.recordId, button.dataset.sortField, button.dataset.sortDir, true, button);
});

document.getElementById("detailBackdrop").addEventListener("click", closeDetail);
document.getElementById("detailClose").addEventListener("click", closeDetail);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDetail();
  trapModalFocus(event);
});

document.getElementById("clearFilters").addEventListener("click", () => {
  p0Reset('tracker');
});

document.getElementById("refreshButton").addEventListener("click", loadData);

document.getElementById("offeringSearch").addEventListener("input", event => {
  state.offeringQuery = event.target.value;
  renderOfferings();
  syncUrl();
});
document.getElementById("clearOfferingSearch").addEventListener("click", () => {
  state.offeringQuery = "";
  renderOfferings();
  syncUrl();
  document.getElementById("offeringSearch").focus();
});
document.getElementById("returnToTracker")?.addEventListener("click", () => switchView("tracker"));
document.getElementById("offeringCards").addEventListener("click", event => {
  const button = event.target.closest("[data-offering-detail]");
  if (button) openDetail(button.dataset.offeringDetail);
});

document.getElementById("feeSearch").addEventListener("input", event => {
  state.feeQuery = event.target.value;
  state.feePage = 1;
  renderFeeComparison();
  syncUrl();
});
document.getElementById("clearFeeSearch").addEventListener("click", () => {
  state.feeQuery = "";
  state.feePage = 1;
  renderFeeComparison();
  syncUrl();
  document.getElementById("feeSearch").focus();
});
document.getElementById("feesView").addEventListener("click", handleFeeRosterClick);
document.getElementById("feesView").addEventListener("change", handleFeeRosterChange);
document.getElementById("feesView").addEventListener("mouseover", event => {
  const dot = event.target?.closest?.("[data-fee-dot-round]");
  if (dot) showFeeDotPopover(dot, false);
});
document.getElementById("feesView").addEventListener("mouseout", event => {
  const dot = event.target?.closest?.("[data-fee-dot-round]");
  if (dot && !dot.contains?.(event.relatedTarget)) hideFeeDotPopover(false);
});
document.getElementById("feesView").addEventListener("focusin", event => {
  const dot = event.target?.closest?.("[data-fee-dot-round]");
  if (dot) showFeeDotPopover(dot, false);
});
document.getElementById("feesView").addEventListener("focusout", event => {
  const dot = event.target?.closest?.("[data-fee-dot-round]");
  if (dot) hideFeeDotPopover(false);
});
document.getElementById("feesView").addEventListener("keydown", event => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const dot = event.target.closest("[data-fee-dot-round]");
  if (dot?.dataset?.feeDotRound) { event.preventDefault(); openOfferingDossier(dot.dataset.feeDotRound); return; }
  const roleRow = event.target.closest("[data-fee-role]");
  if (roleRow?.dataset?.feeRole && roleRow.tagName !== "BUTTON") {
    event.preventDefault();
    const r = roleRow.dataset.feeRole;
    state.feeSponsorRole = r === "all" ? "all" : (state.feeSponsorRole === r ? "all" : r);
    state.feePage = 1;
    renderFeeComparison();
    syncUrl();
    return;
  }
  if (event.target.closest("button,a,input,select,summary")) return;
  const card = event.target.closest("tr[data-fee-round],article[data-fee-compare-round]");
  const roundId = card?.dataset?.feeRound || card?.dataset?.feeCompareRound;
  if (!roundId) return;
  event.preventDefault();
  const link = card.querySelector?.("[data-round-id]");
  link?.focus?.({ preventScroll: true });
  openOfferingDossier(roundId);
});

document.getElementById("dossierSearch").addEventListener("input", event => {
  state.dossierQuery = event.target.value;
  renderDossiers();
  syncUrl();
});
document.getElementById("clearDossierSearch").addEventListener("click", () => {
  state.dossierQuery = "";
  renderDossiers();
  syncUrl();
});
document.getElementById("dossierCards").addEventListener("click", event => {
  if (event.target.closest("[data-dossier-fee-comparison]")) {
    state.feePhase = "listed";
    state.feeRoundId = state.dossierId || eligibleOfferingDossiers()[0]?.roundId || "";
    switchView("fees");
  }
});

let p0LastTrigger='';
let p0FeeCompareExpanded=null;
function p0FeeCompareRows(all=eligibleFeeRoster()) {
 const eligible=new Map(all.filter(r=>r.route==='listed_offering').map(r=>[r.id,r]));
 return [...new Set(String(state.feeCompare||'').split(',').map(id=>id.trim()))].map(id=>eligible.get(id)).filter(Boolean).slice(0,4);
}
function p0FeeCompareButton(r) {
 if(state.feePhase!=='listed'||r.route!=='listed_offering')return '';
 const selected=p0FeeCompareRows(),active=selected.some(row=>row.id===r.id),limit=selected.length>=4&&!active;
 return `<button type="button" class="fee-compare-toggle" data-fee-compare-toggle="${escapeHtml(r.id)}" aria-pressed="${active}" aria-label="${active?'取消对比':'加入对比'} ${escapeHtml(r.name)} ${r.code}"${limit?' disabled':''}>${active?'已选':'＋对比'}</button>`;
}
function p0EffectiveSponsorFee(r) {
 if(r.sponsorFee)return {...r.sponsorFee,fallback:false};
 const rec=state.data?.records?.find(x=>x.id===r.issuerId);
 const ft=rec?.listingFeeTerms;
 const fb=ft?.fee||ft?.feeApprox;
 if(!fb||fb.value==null||!Number.isFinite(Number(fb.value)))return null;
 const page=Array.isArray(fb.pages)&&fb.pages[0]?fb.pages[0]:null;
 const source=ft?.url?(page?`${ft.url}#page=${page}`:ft.url):'';
 const scopeLabel=r.institutions?.length===1?'独家':'招股书披露';
 return {
  currency:fb.currency,
  value:fb.value,
  approximate:Boolean(ft?.feeApprox&&!ft?.fee),
  exactComparisonEligible:false,
  scope:r.institutions?.length===1?'sole_sponsor':'disclosed',
  scopeLabel,
  source,
  fallback:true
 };
}
function p0SponsorFeeHtml(r, asLink = false) {
 const sp=p0EffectiveSponsorFee(r),scope={sole_sponsor:'独家',engagement:'整单',per_sponsor:'每家',joint_aggregate:'联席合计',disclosed:'招股书披露'};
 if(!sp)return p0Missing(r.feeStates?.sponsor);
 const rawM=`${sp.approximate?'约 ':''}${sp.currency} ${feeRosterMillion(sp.value)}m`;
 const cn=formatChineseUnitAmount(sp.value,sp.currency,Boolean(sp.approximate));
 const title=`${sp.approximate?'约 ':''}${sp.currency} ${offeringNumber(Number(sp.value))} · ${rawM}`;
 const srcAttr=sp.source?` data-source="${escapeHtml(sp.source)}"`:'';
 const inner=asLink&&sp.source?feeRosterSource(sp.source,cn):escapeHtml(cn);
 return `<span class="sponsor-fee-val" title="${escapeHtml(title)}"${srcAttr}>${inner}</span><small>${escapeHtml(sp.scopeLabel||scope[sp.scope]||'')}</small>`;
}
function p0RenderFeeCompareSelection(all) {
 const root=document.getElementById('feeSelection');if(!root)return;
 const previous=root.querySelector('details[data-fee-compare-details]');
 if(previous?.tagName==='DETAILS')p0FeeCompareExpanded=previous.open;
 const selected=p0FeeCompareRows(all);
 if(state.feeRosterData?.schemaVersion===3&&Array.isArray(state.data?.records))state.feeCompare=selected.map(r=>r.id).join(',');
 if(state.feePhase!=='listed'||!selected.length){root.innerHTML='';return;}
 const count=selected.length,basis=state.shoeBasis==='actual'?'绿鞋后实际额':'绿鞋前最终额';
 const open=p0FeeCompareExpanded??!window.matchMedia?.('(max-width:767px)').matches;
 const columns=selected.map(r=>{
  const amount=p0FeeAmount(r,state.shoeBasis),gross=feeRosterGross(r),source=r[state.shoeBasis]?.gross?.sources?.[0];
  const grossLink=source?.url?source.url+(source.page?'#page='+source.page:''):'';
  const sp=p0EffectiveSponsorFee(r);
  const linkMap=new Map();
  const addLink=(url,label)=>{if(!url)return;linkMap.set(url,linkMap.has(url)?linkMap.get(url)+'/'+label:label);};
  addLink(grossLink,'规模');
  addLink(r.commissionSource,'佣金');
  addLink(r.discretionarySource,'酌情');
  addLink(sp?.source,'保荐费');
  const sources=[...linkMap].map(([url,label])=>feeRosterSource(url,feeRosterSourceLabel(url,label))).join(' · ');
  return `<article class="fee-compare-column" data-fee-compare-round="${escapeHtml(r.id)}" tabindex="0" role="button"><header><a href="${escapeHtml(p0DossierUrl(r.id))}" data-round-id="${escapeHtml(r.id)}"><strong>${escapeHtml(r.name)}</strong><span>${r.code} · ${r.listingDate}</span></a></header><dl><div><dt>规模 (HKD 百万)</dt><dd class="col-num"${amount===null?'':` title="HKD ${offeringNumber(amount,2)}"`}>${escapeHtml(gross)}</dd></div><div><dt>固定佣金</dt><dd class="col-num">${p0FeeRate(r,'fixed')}</dd></div><div><dt>酌情上限</dt><dd class="col-num">${p0FeeRate(r,'extra')}</dd></div><div><dt>保荐费 (原币)</dt><dd class="col-num">${p0SponsorFeeHtml(r,false)}</dd></div></dl><footer>${sources}</footer></article>`;
 }).join('');
 root.innerHTML=`<section class="fee-compare" aria-label="发售费用对比"><div class="fee-compare-bar"><span role="status" aria-live="polite">已选 ${count}/4${count===1?' · 再选 1 宗开始对比':count===4?' · 已达上限':''}</span><div class="fee-compare-picks">${selected.map(r=>`<button type="button" data-fee-compare-remove="${escapeHtml(r.id)}" aria-label="移除 ${escapeHtml(r.name)} ${r.code}" title="${escapeHtml(r.name)}">${escapeHtml(r.name)} (${r.code}) ×</button>`).join('')}</div><button type="button" class="fee-compare-clear" data-fee-compare-clear>清空</button></div>${count>=2?`<details data-fee-compare-details${open?' open':''}><summary>并排对比条款 <span>${basis}</span></summary><div class="fee-compare-grid" style="--fee-compare-columns:${count}">${columns}</div></details>`:''}</section>`;
}
function p0HandleFeeCompareClick(el) {
 const toggle=el.dataset.feeCompareToggle,remove=el.dataset.feeCompareRemove,clear=el.hasAttribute('data-fee-compare-clear');
 if(!toggle&&!remove&&!clear)return false;
 if(state.feePhase!=='listed')return true;
 const selected=p0FeeCompareRows(),id=toggle||remove;
 if(clear){state.feeCompare='';p0FeeCompareExpanded=null;}
 else if(remove)state.feeCompare=selected.filter(r=>r.id!==remove).map(r=>r.id).join(',');
 else {
  const row=eligibleFeeRoster().find(r=>r.id===toggle&&r.route==='listed_offering');if(!row)return true;
  const active=selected.some(r=>r.id===toggle);if(!active&&selected.length>=4)return true;
  state.feeCompare=(active?selected.filter(r=>r.id!==toggle):[...selected,row]).map(r=>r.id).join(',');
 }
 renderFeeComparison();syncUrl();
 const focus=clear?document.getElementById('feeSearch'):document.querySelector(`#feeComparison [data-fee-compare-toggle="${CSS.escape(id)}"]`)||document.querySelector('#feeSelection [data-fee-compare-remove]')||document.getElementById('feeSearch');
 focus?.focus({preventScroll:true});return true;
}

function p0CanonicalLocationView(){const v=new URLSearchParams(location.search).get('view')||'directory';return({ap:'directory',directory:'directory',pace:'tracker',paused:'pausedOfferings',cornerstones:'cornerstones',sponsors:'sponsorLeaderboard',dossier:'dossiers',offerings:'pausedOfferings',transactions:'precedents'})[v]||v;}
function p0SaveLocation(el=document.activeElement){p0LastTrigger=el?.dataset?.txOpen?('#'+(el.dataset.txOrigin==='comparison'?'transactionComparison':'transactionCards')+' [data-tx-open="'+CSS.escape(el.dataset.txOpen)+'"]'):el?.dataset?.compareTransaction?('#transactionCards [data-compare-transaction="'+CSS.escape(el.dataset.compareTransaction)+'"]'):el?.dataset?.dirRecordId?`#directoryRows [data-dir-record-id="${CSS.escape(el.dataset.dirRecordId)}"]`:el?.dataset?.csId?`#cornerstoneListWrap [data-cs-id="${CSS.escape(el.dataset.csId)}"]`:el?.dataset?.recordId&&el.closest?.('#trackerRows')?`#trackerRows [data-record-id="${CSS.escape(el.dataset.recordId)}"]`:el?.dataset?.roundId?`${el.closest?.('#feeSelection')?'#feeSelection ':el.closest?.('#feeComparison')?'#feeComparison ':''}[data-round-id="${CSS.escape(el.dataset.roundId)}"]`:el?.id?`#${CSS.escape(el.id)}`:el?.dataset?.recordId?`[data-record-id="${CSS.escape(el.dataset.recordId)}"]`:'';history.replaceState({...history.state,scrollY:window.scrollY,triggerSelector:p0LastTrigger},'',location.href);}
function p0DossierUrl(roundId){const p=new URLSearchParams(location.search);for(const k of trackedStateKeys){p.delete(k);const v=state[k];if(v!==defaults[k]&&v!==''&&v!==null&&v!==undefined)p.set(k,String(v));}for(const k of ['group','focus','compare','from','to'])p.delete(k);p.set('view','dossier');p.set('roundId',roundId);p.delete('dossierId');return location.pathname+'?'+p;}
function p0FeeAmount(row,basis='offered'){if(row.route==='paused_offer'||row.route==='bookbuilding')return null;const v=row[basis]?.gross?.value;return v==null?null:Number(v);}
function p0SizeRange(c){if(c.min!==''&&c.min!=null||c.max!==''&&c.max!=null)return[c.min===''||c.min==null?null:Number(c.min)*1e6,c.max===''||c.max==null?null:Number(c.max)*1e6];return({'600_900':[600e6,900e6],under500:[null,500e6],over2000:[2000e6,null]})[c.sizeBand]||[null,null];}
function p0ActualLabel(r){return r.actualStatus==='stabilising'?'稳定期中':'尚未核实';}
function p0ShoeLabel(r){return({full_exercised:'绿鞋全额行使',partially_exercised:'绿鞋部分行使',not_exercised:'绿鞋未行使',no_option:'无绿鞋权',full:'绿鞋全额行使',partial:'绿鞋部分行使',exercised:'绿鞋已行使'})[r.shoe?.value]||(r.actualStatus==='stabilising'?'稳定期中':'');}
function p0Missing(status){return `<span class="data-missing">${status==='undisclosed'?'未披露':status==='conditional'?'条件费率*':'待核实'}</span>`;}
function p0FeeRate(r,key){const value=r[{fixed:'fixedBps',extra:'maximumExtraBps',upper:'upperBps'}[key]];if(value==null)return p0Missing(r.feeStates?.[key]);return key==='extra'&&value===0?'无 (0.00%)':feePercent(value);}
function p0Quantile(values,p){if(!values.length)return null;const a=[...values].sort((a,b)=>a-b),i=(a.length-1)*p,l=Math.floor(i);return a[l]+(a[Math.ceil(i)]-a[l])*(i-l);}
function p0FeeSummary(rows){
 const basis=state.shoeBasis||'offered';
 const st=p0EffectiveCommissionStats(rows,basis);
 if(state.feePhase==='bookbuilding'){
  const lowSum=rows.reduce((s,r)=>s+Number(r.gross?.lowHkd||0),0);
  const highSum=rows.reduce((s,r)=>s+Number(r.gross?.highHkd||0),0);
  return `<span class="summary-kicker">招股中与待挂牌</span><span class="summary-stat">拟募区间合计 <b>HKD ${offeringNumber(lowSum/1e8,2)}–${offeringNumber(highSum/1e8,2)}亿</b><small>n=${rows.length}</small></span><span class="summary-stat">有效固定佣金 <b>${st.effectiveFixedBps!==null?feePercent(st.effectiveFixedBps):'—'}</b><small>按上限加权</small></span><span class="summary-stat">有效合计上限 <b>${st.effectiveUpperBps!==null?feePercent(st.effectiveUpperBps):'—'}</b></span>`;
 }
 if(state.feePhase==='paused'){
  return `<span class="summary-kicker">搁置样本有效费率</span><span class="summary-stat" title="按拟募上限总额加权">有效固定佣金 <b>${st.effectiveFixedBps!==null?feePercent(st.effectiveFixedBps):'—'}</b><small>n=${st.fixedN}</small></span><span class="summary-stat" title="按拟募上限总额加权">有效酌情上限 <b>${st.effectiveExtraBps!==null?feePercent(st.effectiveExtraBps):'—'}</b><small>n=${st.extraN}</small></span><span class="summary-stat" title="按拟募上限总额加权">有效合计上限 <b>${st.effectiveUpperBps!==null?feePercent(st.effectiveUpperBps):'—'}</b><small>n=${st.upperN}</small></span>`;
 }
 return `<span class="summary-kicker">合计与有效佣金率</span><span class="summary-stat" title="当前筛选样本总发行规模">总发行规模 <b>${st.grossN?escapeHtml(formatChineseUnitAmount(st.totalGross,'HKD')):'—'}</b><small>n=${st.grossN}</small></span><span class="summary-stat" title="当前筛选样本预估固定承销佣金总和">总固定佣金 <b>${st.fixedN?escapeHtml(formatChineseUnitAmount(st.fixedComm,'HKD')):'—'}</b><small>n=${st.fixedN}</small></span><span class="summary-stat" title="有效固定佣金率 = 所有项目固定佣金总和 ÷ 对应发行规模总和">有效固定佣金率 <b>${st.effectiveFixedBps!==null?feePercent(st.effectiveFixedBps):'—'}</b><small>Σ佣金/Σ规模</small></span><span class="summary-stat" title="有效合计上限费率 = 所有项目最高总佣金总和 ÷ 对应发行规模总和">有效合计上限 <b>${st.effectiveUpperBps!==null?feePercent(st.effectiveUpperBps):'—'}</b>${st.effectiveExtraBps!==null?`<small>含酌情 ${feePercent(st.effectiveExtraBps)}</small>`:`<small>n=${st.upperN}</small>`}</span>`;
}
function p0EmptyFilterChipText(key, val) {
 if (key === 'feeSponsorRole') return feeSponsorRoleLabel(val);
 if (key === 'feeInstitution') return feeInstitutionLabel(val) || val;
 return val;
}
function p0EmptyState(view,count){const fields=view==='fees'?['feeQuery','feeIndustry','feeInstitution','feeSponsorRole','feeCurrency','feeMin','feeMax','sizeBand','feeType','feeDateFrom','feeDateTo']:['query','structure','industry','sponsor','status','dateFrom','dateTo','cohort'];const chips=fields.filter(k=>state[k]!==defaults[k]&&state[k]!==''&&state[k]!=null).map(k=>`<button type="button" data-clear-filter="${k}" data-filter-view="${view}">${escapeHtml(p0EmptyFilterChipText(k,state[k]))} ×</button>`).join('');return `<div class="empty-state-row"><p>未找到匹配当前筛选条件的项目</p><div>${chips}</div><button type="button" data-reset-view="${view}">清除全部筛选，恢复全量${count?` (${count})`:''}</button></div>`;}
function p0Reset(view){
 const keys=view==='fees'?['feeQuery','feeIndustry','feeInstitution','feeSponsorRole','feeEconMetric','feeEconSplit','feeCurrency','feeMin','feeMax','sizeBand','feeType','feeDateFrom','feeDateTo','feeSort','feeSortDir','feePage']:view==='directory'?['dirQuery','dirStage','dirType','dirIndustry','dirSponsor','dirDocStatus','dirSort','dirSortDir','dirPage']:['query','structure','industry','sponsor','status','dateFrom','dateTo','dateField','marketCapMin','marketCapMax','cohort','page','sortField','sortDir','daySortField'];
 for(const key of keys)state[key]=defaults[key];
 if(view==='fees')renderFeeComparison();
 else if(view==='directory')renderDirectory();
 else{syncControls();renderRows();}
 syncUrl();
 document.getElementById(view==='fees'?'feeSearch':view==='directory'?'dirSearch':'issuerSearch')?.focus();
}
function p0FromUrlInfo(){
 const raw=history.state?.fromUrl;if(!raw)return null;
 try{
  const u=new URL(raw,location.href),p=u.searchParams,rawView=p.get('view')||'directory';
  const view=({ap:'directory',directory:'directory',pace:'tracker',paused:'pausedOfferings',cornerstones:'cornerstones',sponsors:'sponsorLeaderboard',dossier:'dossiers',offerings:'pausedOfferings',transactions:'precedents'})[rawView]||rawView;
  return {raw,params:p,view};
 }catch{return null;}
}
function p0Return(){
 const info=p0FromUrlInfo();
 if(info&&info.view!=='dossiers'){history.back();return;}
 const round=state.roundId||state.dossierId,row=findAnyOfferingRound(round);
 state.roundId='';state.dossierId='';
 if(row?.route==='bookbuilding'){state.feePhase='bookbuilding';switchView('fees');return;}
 switchView(row?.route==='paused_offer'?'pausedOfferings':'fees');
}
function restoreFromUrl(){closeDetail(false);applyStateFromUrl();if(state.data){syncControls();render();switchView(state.view,false);if(state.peek)openDetail(state.peek,false);}const y=history.state?.scrollY||0,selector=history.state?.triggerSelector;requestAnimationFrame(()=>requestAnimationFrame(()=>{window.scrollTo(0,y);if(selector)document.querySelector(selector)?.focus({preventScroll:true});}));}
function initP0(){
 window.addEventListener('popstate',restoreFromUrl);
 document.addEventListener('click',e=>{
  const el=e.target.closest('button');if(!el)return;
  if(el.dataset.resetView)p0Reset(el.dataset.resetView);
  if(el.dataset.clearFilter){
   state[el.dataset.clearFilter]=defaults[el.dataset.clearFilter];
   if(el.dataset.clearFilter==='feeInstitution'&&['joint_lead','joint_co'].includes(state.feeSponsorRole))state.feeSponsorRole='all';
   if(el.dataset.filterView==='fees'){state.feePage=1;renderFeeComparison();}
   else if(el.dataset.filterView==='directory')renderDirectory();
   else{syncControls();renderRows();}
   syncUrl();
  }
  if(el.hasAttribute('data-return-context'))p0Return();
 });
 initVisitCounter();
}
function p0RegulatoryTimeline(issuerOrId, options = {}) {
 const r = issuerOrId && typeof issuerOrId === "object"
  ? issuerOrId
  : state.data?.records?.find(x => x.id === issuerOrId);
 if (!r) return "";
 const notice = currentOfferingNotice(r);
 const firstRec = r.csrcFirstReceivedDate || r.csrcReceivedDate;
 const rawItems = [
  ["首轮 A1", r.a1Date, "a1"],
  ["证监会接收", firstRec, "received"],
  ["当前 A1", r.currentA1Date && r.currentA1Date !== r.a1Date ? r.currentA1Date : null, "a1_renew"],
  ["当前接收", r.csrcCurrentReceivedDate && r.csrcCurrentReceivedDate !== firstRec ? r.csrcCurrentReceivedDate : null, "received"],
  ["备案通知", r.noticeDate, "notice"],
  ...(notice
   ? [
      ["招股章程", notice.research?.date || null, "prospectus"],
      [offeringNoticeLabels(notice)[0] || "发售搁置", notice.date || null, "paused"],
      ...(RELAUNCH_COMPARISONS[notice.stockCode] ? [["重启招股", RELAUNCH_COMPARISONS[notice.stockCode].round2.prospectusDate, "prospectus"]] : [])
     ]
   : [
      ...(liveBookbuildingOffers().filter(b => b.issuerId === r.id).map(b => ["刊发招股书", b.prospectusDate, "prospectus"])),
      ...(r.specialListingRoute === "rto" && r.transactionCompletionDate ? [["RTO 交割完成", r.transactionCompletionDate, "listed"]] : [["挂牌", r.hkexListingDate, "listed"]])
     ])
 ]
  .filter(([, d]) => d && /^\d{4}-\d{2}-\d{2}$/.test(String(d)))
  .map(([name, date, kind]) => ({ name, date: String(date), kind, proposed: false }))
  .sort((a, b) => a.date.localeCompare(b.date));

 const merged = [];
 for (const item of rawItems) {
  const prev = merged.at(-1);
  if (prev && prev.date === item.date) {
   if (!prev.name.includes(item.name)) prev.name += ` / ${item.name}`;
   prev.kind = item.kind;
  } else {
   merged.push({ ...item });
  }
 }

 const asOf = state.data?.meta?.generatedAt?.slice(0, 10) || P0_WAITING.asOf;
 if (
  options.includeLiveTail &&
  merged.length >= 1 &&
  hkexListingStage(r) === "applying" &&
  r.hkexApplicationStatusGroup === "active" &&
  !notice &&
  asOf &&
  /^\d{4}-\d{2}-\d{2}$/.test(asOf) &&
  asOf > merged.at(-1).date
 ) {
  merged.push({ name: "在审至今", date: asOf, kind: "live_wait", proposed: true });
 }

 if (!merged.length) return "";
 if (merged.length === 1) {
  const m = merged[0];
  return `<div class="prop-timeline is-single"><div class="prop-timeline-head"><span class="prop-timeline-title">关键节点</span><span class="prop-timeline-span col-num"><strong>${escapeHtml(m.name)}</strong> · ${m.date}</span></div></div>`;
 }

 const parseUtc = iso => Date.parse(`${iso}T00:00:00Z`);
 const t0 = parseUtc(merged[0].date);
 const tEnd = parseUtc(merged.at(-1).date);
 const totalDays = Math.max(1, Math.round((tEnd - t0) / 864e5));

 const W = 860, H = 132, padL = 64, padR = 64, trackY = 66, trackW = W - padL - padR;
 const nodes = merged.map((m, i) => {
  const ms = parseUtc(m.date);
  const daysFromStart = Math.round((ms - t0) / 864e5);
  const deltaDays = i === 0 ? 0 : Math.round((ms - parseUtc(merged[i - 1].date)) / 864e5);
  const dotX = padL + (daysFromStart / totalDays) * trackW;
  const lane = i % 2 === 0 ? "top" : "bottom";
  return { ...m, i, daysFromStart, deltaDays, dotX, labelX: dotX, lane };
 });

 // Relax labelX within each lane separately so close dates never collide while dots stay 100% proportionate
 const minGap = 132, minX = 56, maxX = W - 56;
 for (const laneName of ["top", "bottom"]) {
  const ln = nodes.filter(n => n.lane === laneName);
  if (!ln.length) continue;
  for (const n of ln) n.labelX = Math.min(maxX, Math.max(minX, n.dotX));
  for (let j = 1; j < ln.length; j++) {
   if (ln[j].labelX - ln[j - 1].labelX < minGap) ln[j].labelX = ln[j - 1].labelX + minGap;
  }
  if (ln.at(-1).labelX > maxX) ln.at(-1).labelX = maxX;
  for (let j = ln.length - 2; j >= 0; j--) {
   if (ln[j + 1].labelX - ln[j].labelX < minGap) ln[j].labelX = ln[j + 1].labelX - minGap;
  }
  for (const n of ln) n.labelX = Math.min(maxX, Math.max(minX, n.labelX));
 }

 const segsSvg = [];
 const inlineBadgesSvg = [];
 for (let i = 1; i < nodes.length; i++) {
  const prev = nodes[i - 1], curr = nodes[i];
  const segW = curr.dotX - prev.dotX;
  const segCls = curr.proposed
   ? "is-wait"
   : curr.kind === "paused"
    ? "is-paused"
    : curr.kind === "listed"
     ? "is-listed"
     : curr.kind === "a1_renew"
      ? "is-renew"
      : "is-core";
  segsSvg.push(`<line class="ptl-seg ${segCls}" x1="${prev.dotX.toFixed(1)}" y1="${trackY}" x2="${curr.dotX.toFixed(1)}" y2="${trackY}" />`);
  if (segW >= 54) {
   curr.hasInlineDelta = true;
   const midX = (prev.dotX + curr.dotX) / 2;
   const txt = `+${curr.deltaDays}d`;
   const pillW = Math.max(36, txt.length * 6.8 + 10);
   inlineBadgesSvg.push(`<g class="ptl-delta-pill ${segCls}"><rect x="${(midX - pillW / 2).toFixed(1)}" y="${(trackY - 8.5).toFixed(1)}" width="${pillW.toFixed(1)}" height="17" rx="8.5" /><text x="${midX.toFixed(1)}" y="${(trackY + 3.5).toFixed(1)}" text-anchor="middle">${txt}</text></g>`);
  } else {
   curr.hasInlineDelta = false;
  }
 }

 const nodesSvg = nodes.map(n => {
  const isTop = n.lane === "top";
  const stemY1 = isTop ? trackY - 7 : trackY + 7;
  const kneeY = isTop ? trackY - 15 : trackY + 15;
  const stemY2 = isTop ? trackY - 24 : trackY + 24;
  const titleY = isTop ? 22 : 103;
  const dateY = isTop ? 37 : 118;
  const shortDelta = n.i > 0 && !n.hasInlineDelta ? ` (+${n.deltaDays}d)` : "";
  const tip = `${n.name}：${n.date}${n.i > 0 ? `（距上一节点 ${n.deltaDays} 天，距起点 ${n.daysFromStart} 天）` : "（起点）"}`;
  return `<g class="ptl-node is-${n.kind}">
   <title>${escapeHtml(tip)}</title>
   <polyline class="ptl-stem" points="${n.dotX.toFixed(1)},${stemY1} ${n.dotX.toFixed(1)},${kneeY} ${n.labelX.toFixed(1)},${stemY2}" fill="none" />
   ${n.kind === "listed" || n.kind === "paused" ? `<circle class="ptl-halo is-${n.kind}" cx="${n.dotX.toFixed(1)}" cy="${trackY}" r="9" />` : ""}
   <circle class="ptl-dot is-${n.kind}" cx="${n.dotX.toFixed(1)}" cy="${trackY}" r="5.5" />
   <text class="ptl-title" x="${n.labelX.toFixed(1)}" y="${titleY}" text-anchor="middle">${escapeHtml(n.name)}${shortDelta ? `<tspan class="ptl-inline-delta">${escapeHtml(shortDelta)}</tspan>` : ""}</text>
   <text class="ptl-date" x="${n.labelX.toFixed(1)}" y="${dateY}" text-anchor="middle">${n.date}</text>
  </g>`;
 }).join("");

 const maxDelta = Math.max(1, ...nodes.slice(1).map(n => n.deltaDays));
 const mobileItemsHtml = nodes.map((n, i) => {
  const segH = i === 0 ? 0 : Math.round(18 + (n.deltaDays / maxDelta) * 52);
  const segCls = n.proposed ? "is-wait" : n.kind === "paused" ? "is-paused" : n.kind === "listed" ? "is-listed" : n.kind === "a1_renew" ? "is-renew" : "is-core";
  return `<li class="ptl-m-step is-${n.kind}">
   ${i > 0 ? `<div class="ptl-m-connector ${segCls}" style="height:${segH}px"><span>+${n.deltaDays}d</span></div>` : ""}
   <div class="ptl-m-row"><i class="ptl-m-dot is-${n.kind}" aria-hidden="true"></i><b>${escapeHtml(n.name)}</b><time>${n.date}</time>${i > 0 ? `<em class="col-num">累计 ${n.daysFromStart}d</em>` : `<em class="col-num">起点</em>`}</div>
  </li>`;
 }).join("");

 const endLabel = merged.at(-1).proposed ? "在审累计" : `${merged[0].name} → ${merged.at(-1).name}`;
 return `<div class="prop-timeline${options.compactHeader ? " is-modal-banner" : ""}" role="group" aria-label="监管申报与挂牌时间线">
  <div class="prop-timeline-head">
   <span class="prop-timeline-title">${options.compactHeader ? "申报与挂牌里程碑" : `${nodes.length} 个披露节点`}</span>
   <span class="prop-timeline-span col-num">${escapeHtml(endLabel)} · <strong>${totalDays} 天</strong> <small>（${merged[0].date} → ${merged.at(-1).date}）</small></span>
  </div>
  <svg class="prop-timeline-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHtml(nodes.map(n => `${n.name} ${n.date}`).join(" → "))}">
   <line class="ptl-rail-bg" x1="${padL}" y1="${trackY}" x2="${W - padR}" y2="${trackY}" />
   ${segsSvg.join("")}
   ${inlineBadgesSvg.join("")}
   ${nodesSvg}
  </svg>
  <ol class="deal-timeline prop-timeline-mobile">${mobileItemsHtml}</ol>
 </div>`;
}
function p0PausedWindowBar(f){
 const m=f?.market;if(!m)return '';
 const chg=Number(m.changePercent),chgStr=`${chg>0?'+':''}${offeringNumber(chg,2)}%`;
 return `<div class="paused-window-bar" aria-label="发行窗口与认购披露">
  <div><span>公告日恒指 (${escapeHtml(m.date)})</span><strong class="col-num">${offeringNumber(m.hsiClose,0)} <em class="${chg>0?'is-up':chg<0?'is-down':''}">${chgStr}</em></strong></div>
  <div><span>港股主板成交</span><strong class="col-num">HKD ${offeringNumber(m.turnoverHkd/1e8,0)}亿</strong></div>
  <div><span>前 7 日新挂牌</span><strong class="col-num">${m.listedLast7Days} 宗</strong></div>
  <div><span>${f.publicSubscription?'公开发售认购披露':'公告措辞'}</span><strong>${f.publicSubscription?`<span class="paused-sub-pill">${escapeHtml(f.publicSubscription)}</span>`:escapeHtml(f.announcementWording||'现时市况')}</strong></div>
 </div>`;
}
function p0DossierDisclosures(d){
 const o=d.offer,fl=d.float,states=d.disclosureStates;
 const fact=(label,value)=>`<div><dt>${label}</dt><dd>${value}</dd></div>`;
 const shares=n=>n==null?'—':`${offeringNumber(n)} 股`;
 const count=n=>n==null?'—':`${offeringNumber(n,2)} 倍`;
 const money=n=>n==null?'—':`HKD ${feeRosterMillion(n)} 百万`;
 const csState=states.cornerstones.state;
 const csHtml=csState==='confirmed_zero'?'<p>无基石投资者</p>':csState==='unknown'?'<p>基石资料待核</p>':`<div class="deal-allocation-list">${d.cornerstones.map((c,i)=>`<div><button type="button" class="cs-inline-jump" data-open-cornerstone="cs:${d.code}-cs-${i}">${escapeHtml(c.name)} <small>画像 →</small></button><strong class="col-num">${shares(c.shares)}</strong>${feeRosterSource(c.source,'原件 ↗')}</div>`).join('')}</div>`;
 const allocations=fl.deductions.filter(x=>x.kind!=='cornerstone');
 const details=allocations.length?`<details class="deal-light-detail"><summary>其他已披露获配 · ${allocations.length}</summary>${allocations.map(x=>`<p>${escapeHtml(x.name)} · ${shares(x.shares)} ${feeRosterSource(x.source,'原件 ↗')}</p>`).join('')}${fl.accounts.map(a=>`<article><h4>${escapeHtml(a.displayName)} · ${escapeHtml(a.structure||'')}</h4><p>法律获配：${escapeHtml(a.legalHolder)}${a.manager?' · 管理人：'+escapeHtml(a.manager):''}</p>${a.fund||a.economicParty?`<p>${a.fund?'账户：'+escapeHtml(a.fund):''}${a.fund&&a.economicParty?' · ':''}${a.economicParty?'经济敞口：'+escapeHtml(a.economicParty):''}</p>`:''}${[a.ownershipFact,a.fundingFact,a.rightsFact].filter(Boolean).map(t=>`<p>${escapeHtml(t)}</p>`).join('')}${feeRosterSource(a.source,'账户原件 ↗')}${a.structureSource?feeRosterSource(a.structureSource,'结构原件 ↗'):''}</article>`).join('')}</details>`:'';
 const execution=d.execution.length?`<section class="deal-section" id="execution"><details class="deal-light-detail"><summary>执行参考 · ${d.execution.length} 项</summary>${d.execution.map(x=>`<article class="deal-execution"><div class="deal-exec-head"><h4>${escapeHtml(x.title)}</h4><button type="button" class="exec-ref-search-btn" data-exec-search="${escapeHtml(x.title)}">检索执行先例 ⌕</button></div><p>${escapeHtml(x.fact)}</p>${x.action?`<p class="deal-execution-action">${escapeHtml(x.action)}</p>`:''}<div class="consolidated-page-links">${x.pages.map(p=>feeRosterSource(`${x.sourceUrl}#page=${p}`,`原件 p.${p} ↗`)).join('')}</div></article>`).join('')}</details></section>`:'';
 return `<section class="deal-section" id="allocation"><header><h3>配售与上市时流通结构</h3></header><div class="deal-columns"><div><dl class="deal-facts">${fact('招股区间',`HKD ${offeringNumber(o.low,2)}–${offeringNumber(o.high,2)}`)}${fact('香港公开发售（最终分配）',`${shares(o.publicShares)} · ${offeringNumber(o.publicShares/o.shares*100,2)}%`)}${fact('公开发售认购',count(o.publicSubscription))}${fact('国际配售认购',count(o.internationalSubscription))}${fact('估计所得净额',o.netReportedMillions==null?'—':`HKD ${offeringNumber(o.netReportedMillions,2)} 百万`)}</dl><h4>基石获配${csState==='unknown'?'':` · ${shares(o.cornerstoneShares)}`}</h4>${csHtml}</div><div><dl class="deal-facts">${fact('港交所公众持股',`${shares(fl.officialPublicShares)}${fl.officialPublicRatio==null?'':` · ${offeringNumber(fl.officialPublicRatio,2)}%`}`)}${fact('官披自由流通市值',money(fl.officialFreeFloatHkd))}${fact('官披上市时无禁售股数',shares(fl.unlockedShares))}${states.adjustedShares.state==='unknown'?'':fact('发售调整余量',shares(fl.adjustedShares))}</dl>${details}</div></div></section>${execution}`;
}

function p0StandardDossier(row){
 const record=state.data.records.find(r=>r.id===row.issuerId),notice=row.route==='paused_offer'?currentOfferingNotice(record):null;
 const dossier=eligibleOfferingDossiers().find(d=>d.roundId===row.id&&d.disclosureStates);
 const spEff=p0EffectiveSponsorFee(row);
 const desktopOpen=!window.matchMedia?.('(max-width: 767px)').matches;
 const sponsorLinks=(row.institutions||[]).map(i=>renderSponsorJumpChip(i.legalName,i.sponsorId,i.displayName)).join(' · ');
 const stat=(k,v)=>`<div><dt>${k}</dt><dd>${v}</dd></div>`;

 if(row.route==='bookbuilding'){
  const srcLinks=(row.sources||[]).map((u,i)=>feeRosterSource(u,i===0?'招股章程 ↗':'正式通告 ↗')).join('');
  const mcapTxt=Number.isFinite(row.plannedMcapLowBn)&&Number.isFinite(row.plannedMcapHighBn)?`HKD ${(row.plannedMcapLowBn*10).toFixed(2)}–${(row.plannedMcapHighBn*10).toFixed(2)}亿${row.plannedMcapFloorBn?`<small>10%下调底价 ${(row.plannedMcapFloorBn*10).toFixed(2)}亿</small>`:''}`:'—';
  const bookHeading=`<header class="deal-header"><div><p><span class="deal-status-pill is-bookbuilding">${escapeHtml(row.statusLabel)}</span> · ${row.code}.HK · 招股书 ${row.prospectusDate} · 预计挂牌 ${row.expectedListingDate||'—'}</p><h2>${escapeHtml(row.name)}</h2></div><div class="deal-header-meta"><div class="deal-sponsors-line">${sponsorLinks}</div></div></header>`;
  return `<article class="deal-sheet is-bookbuilding-sheet" data-dossier-round="${escapeHtml(row.id)}">${bookHeading}<dl class="deal-kpis">${stat('计划发售总额（绿鞋前 · HKD 百万）',`${feeRosterGross(row)}${row.gross?.floorHkd?`<small>10%下调底价 ${feeRosterMillion(row.gross.floorHkd)}</small>`:''}`)}${stat('招股价区间（HKD／股）',`${escapeHtml(row.priceRangeText||'—')}<small>${row.downwardFloorPrice?`含-10%下调权至 HK$${row.downwardFloorPrice} · `:''}每手${row.lotShares||100}股 HK$${offeringNumber(row.entryFeeHkd||0,2)}</small>`)}${stat('拟上市总市值',mcapTxt)}${stat('承销合计上限',`${p0FeeRate(row,'upper')}<small>固定 ${p0FeeRate(row,'fixed')} · 酌情 ${p0FeeRate(row,'extra')}</small>`)}</dl>${RELAUNCH_COMPARISONS[row.code]?renderRelaunchComparisonPanel(row.code):''}<section class="deal-section"><header><h3>招股日程、分配机制与费用合同</h3><button type="button" class="action-link-btn" data-open-regulatory="${escapeHtml(row.issuerId)}">监管与申报档案 →</button></header><dl class="deal-facts">${stat('公开招股窗口',escapeHtml(row.bookWindow||'—'))}${stat('预计定价 / 挂牌',`${escapeHtml(row.pricingDate||'—')} 定价 · ${escapeHtml(row.expectedListingDate||'—')} 挂牌`)}${stat('发售股数与机制',`${offeringNumber(row.offerShares||0)} 股（占发行后 ${offeringNumber((row.offerShares||0)/(row.postShares||1)*100,2)}%） · ${escapeHtml(row.mechanism||'—')}`)}</dl>${p0RoundFeeTerms(row)}</section><section class="deal-section"><header><h3>监管申报时间线</h3></header>${p0RegulatoryTimeline(row.issuerId)}</section><details class="deal-sources-fold" id="sources"><summary><span>公告与招股章程原件</span><small>展开备查链接</small></summary><div class="deal-sources-fold-body"><div class="consolidated-page-links">${srcLinks}</div></div></details></article>`;
 }

 if(notice){
  const labels=offeringNoticeLabels(notice),f=notice.research,feeObj=eligibleOfferingFees().find(x=>x.roundId===f.roundId);
  const rlInfo=RELAUNCH_COMPARISONS[row.code];
  const rlHeadBtn=rlInfo?`<button type="button" class="relaunch-jump-pill" data-jump-relaunch="${escapeHtml(rlInfo.liveRoundId)}">已于 11-23 调价重启招股 ↗</button>`:'';
  const pausedHeading=`<header class="deal-header"><div><p><span class="deal-status-pill is-paused">${escapeHtml(labels[0])} · ${notice.date}</span> ${rlHeadBtn} · ${row.code}.HK · 招股书 ${f.date}${f.announcementWording?` · ${escapeHtml(f.announcementWording)}`:''}</p><h2>${escapeHtml(row.name)}</h2></div><div class="deal-header-meta"><button type="button" class="action-link-btn" data-open-regulatory="${escapeHtml(row.issuerId)}">监管与申报档案 →</button></div></header>`;
  const hasValLadder=f.roundId===HEMEI_VALUATION_LADDER.roundId;
  const anchors=`<nav class="deal-anchors"><a href="#paused-structure">发售结构</a><a href="#paused-cornerstones">认购与基石</a>${f.preIpo?'<a href="#paused-preipo">上市前投资</a>':''}${hasValLadder?'<a href="#paused-valuation">历轮估值阶梯</a>':''}<a href="#paused-fees">发行费用</a><a href="#paused-timeline">监管时间线</a></nav>`;
  return `<article class="deal-sheet is-paused-sheet" data-dossier-round="${escapeHtml(row.id)}">${pausedHeading}${p0PausedOverview(f)}${p0PausedWindowBar(f)}${rlInfo?renderRelaunchComparisonPanel(row.code,{context:'paused'}):''}${anchors}${renderOfferingResearch(f,notice,{openPrimary:desktopOpen})}${hasValLadder?renderHemeiValuationLadder(f,desktopOpen):''}<section class="deal-section" id="paused-timeline"><header><h3>监管申报时间线</h3><button type="button" class="action-link-btn" data-open-regulatory="${escapeHtml(row.issuerId)}">完整监管档案 →</button></header>${p0RegulatoryTimeline(row.issuerId)}</section>${renderOfferingSources(f,notice,feeObj)}</article>`;
 }

 const mcapBn=dossier?dossier.offer.postShares*dossier.offer.final/1e9:Number.isFinite(Number(row.marketCapHkdBn))?Number(row.marketCapHkdBn):(record?.listingMarketCapSampleEligible&&Number.isFinite(Number(record.listingMarketCapHkdBn))?Number(record.listingMarketCapHkdBn):null);
 const closeQ=listingDebutClose(record,row),offerPrice=Number(row.offered?.price?.value);
 let debutHtml='';
 if(closeQ&&Number.isFinite(Number(closeQ.price))&&Number.isFinite(offerPrice)&&offerPrice>0){
  const rawChg=(Number(closeQ.price)/offerPrice-1)*100,chg=Math.abs(rawChg)<0.05?0:rawChg;
  debutHtml=`<small class="debut-chg ${chg>0?'is-up':chg<0?'is-down':''}">首日收 HK$${escapeHtml(closeQ.price)} (${chg>0?'+':''}${offeringNumber(chg,1)}%)</small>`;
 }
 const srcItems=[];const seenSrc=new Set();
 const addSrc=(url,label)=>{if(!url||seenSrc.has(url))return;seenSrc.add(url);srcItems.push(feeRosterSource(url,feeRosterSourceLabel(url,label)+' ↗'));};
 const grossSrc=row.offered?.gross?.sources?.[0];
 if(grossSrc?.url)addSrc(grossSrc.url+(grossSrc.page?'#page='+grossSrc.page:''),'基础规模');
 const actSrc=row.actual?.gross?.sources?.[0];
 if(actSrc?.url)addSrc(actSrc.url+(actSrc.page?'#page='+actSrc.page:''),'鞋后实际额');
 addSrc(row.commissionSource,'承销佣金条款');
 addSrc(row.discretionarySource,'酌情费用条款');
 addSrc(spEff?.source,'保荐费条款');
 if(closeQ?.sourceUrl)addSrc(closeQ.sourceUrl,'首日收市行情');
 (row.sources||[]).forEach((u,i)=>addSrc(u,`公告原件 ${i+1}`));

 const heading=`<header class="deal-header"><div><p><span class="deal-status-pill is-listed">已上市 ${row.listingDate||row.date}</span> · ${row.code}.HK${p0ShoeLabel(row)?' · '+p0ShoeLabel(row):''}</p><h2>${escapeHtml(row.name)}</h2></div><div class="deal-header-meta"><div class="deal-sponsors-line">${sponsorLinks}</div></div></header>`;
 return `<article class="deal-sheet" data-dossier-round="${escapeHtml(row.id)}">${heading}<dl class="deal-kpis">${stat('发行规模（绿鞋前 · HKD 百万）',row.offered?.gross?.value?feeRosterMillion(row.offered.gross.value):'—')}${stat('最终发售价（HKD／股）',`${row.offered?.price?.value?offeringNumber(row.offered.price.value,2):'—'}${debutHtml}`)}${stat(dossier?'发行价总市值':'上市日总市值',mcapBn!==null?`HKD ${rmbYiFormatter.format(mcapBn*10)}亿`:'—')}${stat('承销合计上限',`${p0FeeRate(row,'upper')}<small>固定 ${p0FeeRate(row,'fixed')} · 酌情 ${p0FeeRate(row,'extra')}</small>`)}</dl>${RELAUNCH_COMPARISONS[row.code]?renderRelaunchComparisonPanel(row.code):''}<section class="deal-section"><header><h3>费用合同与保荐机构</h3><button type="button" class="action-link-btn" data-open-regulatory="${escapeHtml(row.issuerId)}">监管与申报档案 →</button></header><p class="deal-sponsors-line">${sponsorLinks}</p>${p0RoundFeeTerms(row)}</section>${dossier?p0DossierDisclosures(dossier):p0CornerstoneCoverageSection(row)}<section class="deal-section"><header><h3>监管时间线</h3></header>${p0RegulatoryTimeline(row.issuerId)}</section><details class="deal-sources-fold" id="sources"><summary><span>公告与招股章程原件</span><small>展开备查链接</small></summary><div class="deal-sources-fold-body"><div class="consolidated-page-links">${srcItems.join('')}</div></div></details></article>`;
}
function p0GlobalSearch(){
 const rawQ=document.getElementById('globalSearchInput').value,q=normalizeSearchText(rawQ),root=document.getElementById('globalSearchResults');if(!q){root.innerHTML='';return;}
 const txs=(state.transactionData?.cases||[]).filter(t=>transactionMatches(t,{...defaults,transactionQuery:rawQ})).slice(0,5);
 const liveHits=liveBookbuildingOffers().filter(r=>feeRosterSearchText(r).includes(q));
 const rounds=[...liveHits,...eligibleFeeRoster().filter(r=>feeRosterSearchText(r).includes(q))].slice(0,6),docs=eligibleOfferingDossiers().filter(d=>normalizeSearchText(['执行参考',...d.execution.flatMap(x=>[x.title,x.fact,x.action]),...d.float.accounts.flatMap(a=>[a.displayName,a.structure,a.legalHolder,a.economicParty])].join(' ')).includes(q));
 const execHits=eligibleOfferingDossiers().flatMap(d=>d.execution.filter(x=>normalizeSearchText(`执行参考 ${x.title} ${x.fact} ${x.action} ${d.issuer} ${d.code}`).includes(q)).map(x=>({d,x})));
 const seen=new Set(rounds.map(r=>r.id));for(const d of docs)if(!seen.has(d.roundId)){const r=eligibleFeeRoster().find(r=>r.id===d.roundId);if(r)rounds.push(r);}
 const csMatches=buildCornerstoneProfiles().filter(p=>normalizeSearchText([p.name,p.roleLabel,p.profile,...(p.searchNames||[]),...p.signatories.map(s=>s.name),...(p.allocations||[]).map(a=>a.label),...(p.relationships||[]).map(r=>`${r.role} ${r.name}`)].join(' ')).includes(q)).slice(0,4);
 const issuers=(state.data?.records||[]).filter(r=>normalizeSearchText([r.issuerName,r.csrcName,r.hkexCoverChineseName,r.aShareCode].join(' ')).includes(q)&&!rounds.some(o=>o.issuerId===r.id)).slice(0,5);
 const firms=[...new Map(eligibleFeeRoster().flatMap(r=>r.institutions).filter(i=>i.sponsorId&&normalizeSearchText(i.displayName+' '+i.legalName).includes(q)).map(i=>[i.sponsorId,i])).values()].slice(0,4);
 root.innerHTML=execHits.map(({d,x})=>`<a href="${escapeHtml(p0DossierUrl(d.roundId))}#execution" data-global-round="${escapeHtml(d.roundId)}"><span class="exec-ref-tag">执行参考</span> ${escapeHtml(x.title)} · ${escapeHtml(d.issuer)} (${d.code}) <small>${escapeHtml(x.fact)}</small></a>`).join('')
  +txs.map(t=>`<a href="${escapeHtml(transactionUrl(t.id))}" data-global-tx="${escapeHtml(t.id)}">交易 · ${escapeHtml(t.name)} (${t.code}) <small>${escapeHtml(t.mechanism)}</small></a>`).join('')
  +rounds.map(r=>`<a href="${escapeHtml(p0DossierUrl(r.id))}" data-global-round="${escapeHtml(r.id)}">${r.code} · ${escapeHtml(r.name)} <small>${r.route==='bookbuilding'?r.statusLabel+' · '+r.date:r.route==='paused_offer'?r.statusLabel:'新股 · '+r.date}</small></a>`).join('')
  +csMatches.map(p=>`<button type="button" data-open-cornerstone="${escapeHtml(p.id)}">基石 · ${escapeHtml(p.name)} <small>${escapeHtml(p.archetypeLabel)} · ${escapeHtml(p.deals[0]?.issuer||'')}</small></button>`).join('')
  +issuers.map(r=>`<button type="button" data-global-issuer="${escapeHtml(r.id)}">${escapeHtml(nameParts(r).primary)} <small>项目 · ${escapeHtml(statusLabel(r.status))}</small></button>`).join('')
  +firms.map(i=>`<button type="button" data-global-firm="${escapeHtml(i.sponsorId)}">保荐人 · ${escapeHtml(i.displayName)}</button>`).join('')
  ||'<p class="search-empty-msg">未找到匹配的已收录资料</p>';
}
function p0CohortEntry(r,metric=state.cohortMetric){
 if(isSpecialTimingRoute(r))return null;
 const completed=durationValueForStats(r,{metric}),stage=hkexListingStage(r);let start,end;
 if(metric==='a1ToReceived'){start=r.a1ReceiptTiming?.a1Date||(stage!=='listed'&&r.calendarDaysA1ToReceived>180?r.currentA1Date:r.a1Date);end=r.a1ReceiptTiming?.receivedDate||r.csrcReceivedDate;}
 else if(metric==='receivedToNotice'){start=r.csrcReceivedDate;end=r.noticeDate;}else{start=r.a1Date;end=r.hkexListingDate;}
 if(typeof completed==='number'&&start)return{month:start.slice(0,7),days:completed,pending:false};
 if(stage!=='applying'||r.hkexApplicationStatusGroup!=='active'||end||r.hkexConfidentialFilingDate||(r.timelineFlags||[]).includes('confidential_route_suspected')||metric!=='a1ToListing'&&(r.csrcFilingRequired!==true||r.noticeSupersededByCurrentFiling)||metric==='a1ToReceived'&&(r.status!=='waiting_received'||r.csrcCurrentReceivedDate||r.csrcFirstReceivedDate))return null;
 if(metric==='a1ToReceived')start=r.currentA1Date||r.a1Date;
 const days=P0_WAITING.asOf===state.data.meta.generatedAt?.slice(0,10)&&P0_WAITING.dates[start]?P0_WAITING.dates[start][state.dayCountMode]:p0Elapsed(start,state.dayCountMode);if(!start||start<(state.data.meta.csrcRegimeEffectiveDate||'2023-03-31')||typeof days!=='number')return null;
 return{month:start.slice(0,7),days,pending:true};
}
function p0Cohorts(records){const groups=new Map();for(const r of records){const e=p0CohortEntry(r);if(!e)continue;if(!groups.has(e.month))groups.set(e.month,{month:e.month,complete:[],waiting:[]});groups.get(e.month)[e.pending?'waiting':'complete'].push(e.days);}return [...groups.values()].sort((a,b)=>b.month.localeCompare(a.month)).map(g=>({month:g.month,n:g.complete.length,N:g.complete.length+g.waiting.length,pending:g.waiting.length,pts:[...g.complete].sort((a,b)=>a-b),mid:p0Quantile(g.complete,.5),p25:p0Quantile(g.complete,.25),p75:p0Quantile(g.complete,.75),wait:p0Quantile(g.waiting,.5),waitMin:g.waiting.length?Math.min(...g.waiting):null}));}
function p0RecentCohortSummary(records,asOf) {
 const d=new Date(asOf+'T00:00:00Z');
 if(Number.isNaN(d.getTime()))return null;
 const end=asOf.slice(0,7);
 d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()-2);
 const start=d.toISOString().slice(0,7);
 const groups={complete:[],waiting:[]};
 for(const r of records){const e=p0CohortEntry(r);
  if(e&&e.month>=start&&e.month<=end)groups[e.pending?'waiting':'complete'].push(e.days);
 }
 return {start,end,completeN:groups.complete.length,waitingN:groups.waiting.length,
  completeMedian:p0Quantile(groups.complete,.5),waitingMedian:p0Quantile(groups.waiting,.5)};
}
function p0FoldedCohort(records) {
 const v=p0RecentCohortSummary(records,state.data?.meta?.generatedAt?.slice(0,10)||P0_WAITING.asOf);
 if(!v)return '';
 const t=(n,count,min=1)=>min>1&&count<min?'样本未熟（'+count+' 宗）':count?formatDayValue(n)+' 天（'+count+' 宗）':'—';
 return `<p class="cohort-key cohort-summary" title="${v.start} 至 ${v.end} · ${state.dayCountMode==='business'?'工作日':'自然日'}"><span>近三个月 · 办结中位 ${t(v.completeMedian,v.completeN,5)}</span><span>在途中位已等待 ${t(v.waitingMedian,v.waitingN)}</span></p>`;
}
function p0BindInteractions(){
 const dialog=document.getElementById('globalSearchDialog'),input=document.getElementById('globalSearchInput');let searchTrigger=null;
 const openSearch=()=>{searchTrigger=document.activeElement;dialog.showModal();input.focus();};
 const closeSearch=()=>{if(dialog.open)dialog.close();searchTrigger?.focus({preventScroll:true});};
 document.getElementById('globalSearchOpen').addEventListener('click',openSearch);document.getElementById('globalSearchClose').addEventListener('click',closeSearch);dialog.addEventListener('close',()=>searchTrigger?.focus({preventScroll:true}));input.addEventListener('input',p0GlobalSearch);
 document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();}else if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)){e.preventDefault();document.getElementById(state.view==='directory'?'dirSearch':state.view==='fees'?'feeSearch':state.view==='pausedOfferings'?'offeringSearch':state.view==='cornerstones'?'csSearch':state.view==='precedents'?'transactionSearch':state.view==='sponsorLeaderboard'?'slSearchInput':'issuerSearch')?.focus();}});
 document.addEventListener('click',e=>{const el=e.target.closest('button,a');if(!el)return;
 if(el.dataset.globalTx){if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();closeSearch();closeDetail(false);openTransaction(el.dataset.globalTx,searchTrigger||document.getElementById('globalSearchOpen'));}
 if(el.dataset.globalRound){if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();closeSearch();openOfferingDossier(el.dataset.globalRound);}
 if(el.dataset.globalIssuer){closeSearch();if(state.view!=='directory'&&state.view!=='tracker')switchView('directory');openDetail(el.dataset.globalIssuer);}
 if(el.dataset.globalFirm){e.stopPropagation();closeSearch();closeDetail(false);state.firm=el.dataset.globalFirm;switchView('sponsorLeaderboard');}
 if(el.dataset.jumpSponsorFees){e.stopPropagation();closeSearch();closeDetail(false);state.feePhase='listed';p0Reset('fees');state.feeInstitution=el.dataset.jumpSponsorFees;state.feeSponsorRole=el.dataset.jumpSponsorRole||'all';state.feePage=1;renderFeeComparison();switchView('fees');}
 if(el.dataset.jumpRelaunch){e.stopPropagation();closeSearch();closeDetail(false);state.feePhase='bookbuilding';state.feePage=1;renderFeeComparison();switchView('fees');return;}
 if(el.dataset.jumpView){e.stopPropagation();switchView(el.dataset.jumpView);}
 if(el.dataset.execSearch){e.stopPropagation();openSearch();input.value=el.dataset.execSearch;p0GlobalSearch();return;}
 if(el.dataset.openCornerstone){e.stopPropagation();closeSearch();closeDetail(false);openCornerstoneProfile(el.dataset.openCornerstone,el);}
 if(el.dataset.sameSize){if(p0HasFeeOrigin()){history.back();return;}state.feePhase='listed';state.feeQuery='';state.feeIndustry='all';state.feeInstitution='all';state.feeSponsorRole='all';state.feeCurrency='all';state.feeType='all';state.feeDateFrom='';state.feeDateTo='';state.feeMin='';state.feeMax='';state.sizeBand='600_900';state.shoeBasis='offered';state.feeRoundId=el.dataset.sameSize;state.feePage=1;switchView('fees');}
 if(el.dataset.openRegulatory){switchView('tracker');openDetail(el.dataset.openRegulatory);}
 if(el.dataset.cohortMetric){state.cohortMetric=el.dataset.cohortMetric;state.cohort='';state.daySortField=dayMetricField(state.cohortMetric);state.sortField=state.daySortField;state.page=1;syncControls();renderRows();syncUrl();document.querySelector(`[data-cohort-metric="${state.cohortMetric}"]`)?.focus({preventScroll:true});}
 if(el.hasAttribute('data-cohort-month')){state.cohort=state.cohort===el.dataset.cohortMonth?'':el.dataset.cohortMonth;state.page=1;renderRows();syncUrl();document.querySelector('.tracker-table thead')?.focus({preventScroll:true});}
 if(el.hasAttribute('data-cohort-collapse')){state.cohortCollapsed=!state.cohortCollapsed;renderRows();syncUrl();const target=state.cohortCollapsed?document.querySelector('.tracker-table thead'):document.querySelector('[data-cohort-collapse]');target?.focus({preventScroll:true});target?.scrollIntoView({block:'nearest'});}
 if(el.dataset.sponsorWorkbench)switchView(el.dataset.sponsorWorkbench==='compare'?'sponsorPk':'sponsorLeaderboard');
 });
}

function p0PausedOverview(f){const stat=(label,value,exact="")=>`<div><dt>${label}</dt><dd${exact?` title="${escapeHtml(exact)}"`:""}>${value}</dd></div>`;return `<dl class="deal-kpis">${stat('计划发售总额（HKD 百万）',f.priceLow==null?'最高 '+feeRosterMillion(f.offerShares*f.priceHigh):feeRosterMillion(f.offerShares*f.priceLow)+'–'+feeRosterMillion(f.offerShares*f.priceHigh),f.priceLow==null?'最高 HKD '+offeringNumber(f.offerShares*f.priceHigh):'HKD '+offeringNumber(f.offerShares*f.priceLow)+'–'+offeringNumber(f.offerShares*f.priceHigh))}${stat('计划上市市值（HKD 百万）',feeRosterMillion(f.plannedMarketCap.amountHkd)+`<small>${escapeHtml(f.plannedMarketCap.priceBasis)}</small>`,'HKD '+offeringNumber(f.plannedMarketCap.amountHkd,2))}${stat('发售股份比例',offeringNumber(f.offerShares/f.postShares*100,2)+'%')}${stat('拟定招股价（HKD／股）',f.priceLow==null?'最高 '+offeringNumber(f.priceHigh,2):offeringNumber(f.priceLow,2)+'–'+offeringNumber(f.priceHigh,2))}</dl>`;}

function p0HasFeeOrigin(){try{return new URL(history.state?.fromUrl||"",location.href).searchParams.get("view")==="fees";}catch{return false;}}

const p0ElapsedCache=new Map();
function p0Elapsed(start,mode){const end=state.data?.meta?.generatedAt?.slice(0,10)||P0_WAITING.asOf;if(!start||start>end)return null;if(end===P0_WAITING.asOf&&P0_WAITING.dates[start])return P0_WAITING.dates[start][mode];const key=start+':'+end+':'+mode;if(p0ElapsedCache.has(key))return p0ElapsedCache.get(key);const from=Date.parse(start+'T00:00:00Z'),to=Date.parse(end+'T00:00:00Z');if(!Number.isFinite(from)||!Number.isFinite(to))return null;let n=0;if(mode==='calendar')n=(to-from)/864e5;else{const c=P0_WAITING.calendar,holidays=new Set(c.holidays),workdays=new Set(c.workdays);for(let y=Number(start.slice(0,4));y<=Number(end.slice(0,4));y++)if(!c.years.includes(y))return null;for(let t=from+864e5;t<=to;t+=864e5){const d=new Date(t),iso=d.toISOString().slice(0,10);if(!holidays.has(iso)&&(workdays.has(iso)||![0,6].includes(d.getUTCDay())))n++;}}p0ElapsedCache.set(key,n);return n;}

function p0RoundFeeTerms(r){const field=(label,value)=>`<div><dt>${label}</dt><dd>${value}</dd></div>`,sp=p0EffectiveSponsorFee(r),spRaw=sp?`${sp.approximate?'约 ':''}${sp.currency} ${feeRosterMillion(sp.value)}m`:'';return `<dl class="deal-facts">${field('固定承销佣金',p0FeeRate(r,'fixed'))}${field('额外酌情上限',p0FeeRate(r,'extra'))}${field('承销合计上限',p0FeeRate(r,'upper'))}${field(sp?.scope==='joint_aggregate'?'联席保荐费 · 合计':sp?.scopeLabel?`约定保荐费 · ${sp.scopeLabel}`:'约定保荐费',sp?`<span title="${escapeHtml(spRaw)}">${escapeHtml(formatChineseUnitAmount(sp.value,sp.currency,Boolean(sp.approximate)))}</span>`:p0Missing(r.feeStates?.sponsor))}</dl>`;}

// Hydrate deep-link intent once, before yielding to any user input or fetch.
bindDirectoryControls();
bindCornerstoneControls();
bindPausedOfferingControls();
bindTransactionControls();
applyStateFromUrl();

loadData();

initP0();p0BindInteractions();
