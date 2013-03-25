function pledgeValidator(){

// bind a simple alert window to this controller to display any errors //

	this.pledgeErrors = $('.modal-alert');
	this.pledgeErrors.modal({ show : false, keyboard : true, backdrop : true });

	this.showPlegeError = function(t, m)
	{
		$('.modal-alert .modal-header h3').text(t);
		$('.modal-alert .modal-body p').text(m);
		this.pledgeErrors.modal('show');
	}

}

pledgeValidator.prototype.validateForm = function()
{
	if ($('#firstName-tf').val() == ''){
		this.showPlegeError('Whoops!', 'Please enter a valid first name');
		return false;
	}	else if ($('#lastName-tf').val() == ''){
		this.showPledgeError('Whoops!', 'Please enter a valid last name');
		return false;
	}	else{
		return true;
	}
}