const expect = chai.expect;

describe('war game', function () {
    describe('HoldsCards', function () {
        describe('deal', function () {
            it('should deal the 0-index card', function (){
                const test = new HoldsCards()
                test.list.push(new Card(suitEnum.clubs, rankEnum.Ace));
                test.list.push(new Card(suitEnum.clubs, rankEnum['5']));
                test.list.push(new Card(suitEnum.clubs, rankEnum.Jack));
                test.list.push(new Card(suitEnum.clubs, rankEnum.King));
                test.list.push(new Card(suitEnum.clubs, rankEnum['9']));

                expect(test.deal().rank).to.equals(rankEnum.Ace);
                expect(test.deal().rank).to.equals(rankEnum['5']);
                expect(test.deal().rank).to.equals(rankEnum.Jack);
                expect(test.deal().rank).to.equals(rankEnum.King);
                expect(test.deal().rank).to.equals(rankEnum['9']);
            })
        })
    })
})
