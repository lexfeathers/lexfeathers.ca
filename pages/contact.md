---
title: ask
order: 5
---
<style>
    .form-container {
        margin: 2rem 0;
    }
    div.columns {
        width: 100%;
    }
    .is-half {
        width: 50%;
    }
    .control {
        margin: 0.5rem 0 1rem;
    }
    label {
        font-size: var(--text-small);
    }
    .control>input, .control>textarea {
        min-width: 100%;
        padding: .5rem !important;
        border: 1px solid var(--colour-text-faded);
    }
    .control>input:focus, button.button:focus {
        outline: none;
        box-shadow: 0 0 0 3px var(--colour-secondary);
        transition: box-shadow 0.1s ease;
    }
    button.button:focus {
        outline: none;
        box-shadow: 0 0 0 4px var(--colour-text);
        transition: box-shadow 0.1s ease;
    }
    textarea {
        height: 150px;
    }
    button.button {
        float: right;
        width: 150px;
        cursor: pointer;
        font-weight: 400;
    }
    @media screen and (max-width: 749px) {
        button.button {
            float: none;
            width: 100%;
        }
        .is-half {
            width: 100%;
        }
    }
</style>

### Feel free to reach out with questions or comments!

<div class="form-container">
  <div class="columns">
    <div class="column">
      <form action="https://api.staticforms.xyz/submit" method="post" id="staticform">
        <!-- Replace with your StaticForms accessKey -->
        <input type="hidden" name="accessKey" value="61dbe216-3314-4916-8708-fa050d0ea84e">
        <input type="hidden" name="subject" value="Contact from Lexfeathers.ca">
        <!-- Replace with the url you want to redirect to -->
        <input type="hidden" name="redirectTo" value="https://lexfeathers.ca/pages/contact">
        <div class="field is-half">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" name="name" placeholder="Egg Bug" required>
          </div>
        </div>
        <div class="field is-half">
          <label class="label">Email address</label>
          <div class="control">
            <input class="input" type="email" name="email" placeholder="me@example.com" required>
          </div>
        </div>
        <div class="field is-half">
            <label class="label">Your website</label>
            <div class="control">
              <input class="input" type="text" name="name" placeholder="Optional">
            </div>
          </div>        
        <div class="field">
          <label class="label">Message</label>
          <div class="control">
            <textarea class="textarea" name="message" placeholder="Enter Your Message" required></textarea>
          </div>
        </div>
        <button class="button is-primary" type="Submit">Submit</button>
      </form>
    </div>
  </div>
</div>