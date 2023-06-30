export class UserInfo {
	_cohort = null;
	_id = null;

	constructor({ name, about, avatar }) {
		this._name = document.querySelector(name);
		this._about = document.querySelector(about);
		this._avatar = document.querySelector(avatar);
	};

	getUserInfo() {
		return {
			name: this._name.textContent,
			about: this._about.textContent,
			_id: this._id
		}
	}

	setUserAvatar(avatar) {
		if (avatar) this._avatar.src = avatar;
	}

	setUserInfo({ name, about, cohort, _id }) {
		this._name.textContent = name;
		this._about.textContent = about;
		this._cohort = cohort;
		this._id = _id;
	}
}
