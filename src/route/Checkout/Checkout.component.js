import {
  Checkout as SourceCheckout,
} from 'SourceRoute/Checkout/Checkout.component';
import {
  ContentWrapper as SourceContentWrapper
} from 'SourceComponent/ContentWrapper/ContentWrapper.component';
import ProgressBar from 'src/components/ProgressBar/ProgressBar.component';

export class Checkout extends SourceCheckout {


  renderStep() {
      const { checkoutStep , } = this.props;
      // console.log("steps",this.stepMap)
      const { render } = this.stepMap[checkoutStep];
      if (render) {
          return render();
      }

      return null;
  }

  render() {
      const { checkoutStep } = this.props;
      const checkoutSteps = Object.keys(this.stepMap);
      return (
          <main block="Checkout">
            <ProgressBar steps={checkoutSteps} currentStep={checkoutStep}/>
              <SourceContentWrapper
                wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                label={ __('Checkout page') }
              >
                  { this.renderSummary(true) }
                  <div block="Checkout" elem="Step">
                      { this.renderTitle() }
                      { this.renderGuestForm() }
                      { this.renderStep() }
                      { this.renderLoader() }
                  </div>
                  <div>
                      { this.renderSummary() }
                      { this.renderPromo() }
                      { this.renderCoupon() }
                  </div>
              </SourceContentWrapper>
          </main>
      );
  }
};

export default Checkout;