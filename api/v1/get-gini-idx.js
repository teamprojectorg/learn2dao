import * as os from 'os';
import { load_dotenv } from 'dotenv';
import { BaseHTTPRequestHandler } from 'http/server';
import { parse_qs, urlparse } from 'urllib/parse';
import * as requests from 'requests';
import { date } from 'datetime';
import { timedelta } from 'datetime';
import * as json from 'json';
var COVALENT_API_KEY;
load_dotenv();
COVALENT_API_KEY = os.getenv("COVALENT_API_KEY");

class handler extends BaseHTTPRequestHandler {
  do_GET() {
    var area_between_the_curves, area_under_curve, area_under_lorenz, balance_list, balance_list_usd, balance_list_usd_refined, balance_list_usd_reverse, block_height, block_height_data, chainId, contractId, contract_decimals, cumulative_population, cumulative_proportion_of_balance, current_price, gini_coefficient, num_list, proportion_of_balance, query, spot_price, ticker, today, token_holders_at_block, total_balance, total_wallets, x1, x2, x3, x4, yesterday;
    var Reverse;
    this.send_response(200);
    this.send_header("Content-type", "application/json");
    this.end_headers();
    query = urlparse(this.path).query;
    chainId = parse_qs(query)["chainId"][0];
    contractId = parse_qs(query)["contractId"][0];
    ticker = parse_qs(query)["ticker"][0];

    Reverse = lst => {
      return function () {
        var _pj_a = [],
            _pj_b = reversed(lst);

        for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
          var ele = _pj_b[_pj_c];

          _pj_a.push(ele);
        }

        return _pj_a;
      }.call(this);
    };

    today = date.today();
    yesterday = today - timedelta({
      "days": 1
    });
    block_height_data = requests.get(`https://api.covalenthq.com/v1/${chainId}/block_v2/${yesterday.toString()}/${today.toString()}/?&key=${COVALENT_API_KEY}`);
    block_height = block_height_data.json()["data"]["items"].slice(-1)[0]["height"];
    token_holders_at_block = requests.get(`https://api.covalenthq.com/v1/${chainId}/tokens/${contractId}/token_holders/?block-height=${block_height.toString()}&page-size=100000&key=${COVALENT_API_KEY}`);
    contract_decimals = token_holders_at_block.json()["data"]["items"][0]["contract_decimals"];
    balance_list = [];

    for (var i, _pj_c = 0, _pj_a = token_holders_at_block.json()["data"]["items"], _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      i = _pj_a[_pj_c];
      balance_list.append(Number.parseInt(i["balance"]) / Math.pow(10, contract_decimals));
    }

    spot_price = requests.get(`https://api.covalenthq.com/v1/pricing/tickers/?tickers=${ticker}&key=${COVALENT_API_KEY}`);
    current_price = spot_price.json()["data"]["items"][0]["quote_rate"];

    balance_list_usd = function () {
      var _pj_a = [],
          _pj_b = balance_list;

      for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
        var element = _pj_b[_pj_c];

        _pj_a.push(element * current_price);
      }

      return _pj_a;
    }.call(this);

    balance_list_usd_reverse = new Reverse(balance_list_usd);
    balance_list_usd_refined = [];

    for (var i, _pj_c = 0, _pj_a = balance_list_usd_reverse, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      i = _pj_a[_pj_c];

      if (i > 10) {
        balance_list_usd_refined.append(i);
      }
    }

    total_wallets = balance_list_usd_refined.length;
    num_list = [];

    for (var i = 1, _pj_a = total_wallets + 1; i < _pj_a; i += 1) {
      num_list.append(i);
    }

    cumulative_population = [];

    for (var i = 1, _pj_a = total_wallets + 1; i < _pj_a; i += 1) {
      x1 = num_list[i - 1] / total_wallets;
      cumulative_population.append(x1 * 100);
    }

    total_balance = sum(balance_list_usd_refined);
    proportion_of_balance = [];

    for (var i, _pj_c = 0, _pj_a = balance_list_usd_refined, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      i = _pj_a[_pj_c];
      x2 = i / total_balance;
      proportion_of_balance.append(x2);
    }

    cumulative_proportion_of_balance = [proportion_of_balance[0]];

    for (var i = 1, _pj_a = proportion_of_balance.length; i < _pj_a; i += 1) {
      x3 = proportion_of_balance[i - 1] + proportion_of_balance[i];
      cumulative_proportion_of_balance.append(x3);
    }

    area_under_curve = [cumulative_proportion_of_balance[0]];

    for (var i = 1, _pj_a = cumulative_proportion_of_balance.length; i < _pj_a; i += 1) {
      x4 = 0.5 * (cumulative_proportion_of_balance[i - 1] + cumulative_proportion_of_balance[i]) * (1 / total_wallets);
      area_under_curve.append(x4);
    }

    area_under_lorenz = sum(area_under_curve);
    area_between_the_curves = 0.5 - area_under_lorenz;
    gini_coefficient = area_between_the_curves / 0.5;
    this.wfile.write(json.dumps({
      "giniIdx": gini_coefficient
    }).encode());
    return;
  }

}
