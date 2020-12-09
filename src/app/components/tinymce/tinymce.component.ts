import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


declare const tinymce: any;

@Component({
  selector: 'app-tinymce',
  templateUrl: './tinymce.component.html',
  styleUrls: ['./tinymce.component.scss']
})
export class TinymceComponent implements OnInit {
  isVisible: boolean = false;
  editorInitConfig:any;
  editorId: string = 'tinymceEditor123';
  minHeight = 200;
  initialContent = '<p>testing</p>';
  safeContent:any;
  inline = false;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.initialContent);

    // default config
		var self = this;
		this.editorInitConfig = {
      selector: 'div#'+this.editorId,
      setup: function(editor) {
				console.log('setting up')
				
				editor.on('init', function(e) {
				  console.log('Init!!!')
				});
			},
			height: 150,
			base_url: '/tinymce',
			suffix: '.min',
			inline: this.inline,
			statusbar: false,
			browser_spellcheck: true,
			max_width: '200px',
			images_upload_credentials: false,
			menubar: false,
			convert_urls:true,
			relative_urls:false,
			remove_script_host:false,
			contextmenu: false,
			plugins: 'image link lists save media autolink hr paste',
			default_link_target: "_blank",
			link_assume_external_targets: 'http',
			toolbar: 'formatselect | bold italic underline forecolor backcolor | bullist numlist outdent indent hr | link image media',
			formats: {
				underline: { inline: 'u', exact: true },
				italic: { inline: 'i', exact: true },
				bold: [
					{ inline: 'strong', remove: 'all' },
					{ inline: 'span', styles: { fontWeight: 'bold' } },
					{ inline: 'b', remove: 'all' }
				],
			},
			// init_instance_callback: function (editor) {
			// 	editor.on('Change', function (e) {
			// 		self.tinymceChange();
			// 	});
			// 	editor.on('KeyUp', function (e) {
			// 		setTimeout(() => {
			// 			self.tinymceChange();
			// 		},500)
			// 	});
			// }
		};
  }

  setupEditor() {
    console.log('setup called')

		var self = this;
		setTimeout(function() {
			var oldEditor = tinymce.get(self.editorId);
      if(oldEditor) { oldEditor.remove(); }
      console.log(tinymce, self.editorInitConfig)
      tinymce.init(self.editorInitConfig);
      console.log('after init')
			setTimeout(function() {
        let elem = document.getElementById(self.editorId);
        console.log(elem)
				if(elem) { elem.style.minHeight = self.minHeight+"px"; }
			});
		});

	}

  showModal() {
    this.isVisible = true;

		this.setupEditor();
  }

  handleOk() {
    this.isVisible = false;
  }

  handleCancel() {
    this.handleOk();
  }

}
