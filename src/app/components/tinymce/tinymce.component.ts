import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


declare const tinymce: any;

@Component({
  selector: 'app-tinymce',
  templateUrl: './tinymce.component.html',
  styleUrls: ['./tinymce.component.scss']
})
export class TinymceComponent implements OnInit {
  isVisible1: boolean = false;
  isVisible2: boolean = false;
  editorInitConfig1:any;
  editorInitConfig2:any;
  editorId1: string = 'tinymceEditor123';
  editorId2: string = 'tinymceEditor456';
  minHeight = 200;
  initialContent = '<p>testing</p>';
  safeContent:any;
  inline1 = false;
  inline2 = true;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.initialContent);

    // default config
		var self = this;
		this.editorInitConfig1 = {
      selector: 'div#'+this.editorId1,
      setup: function(editor) {
				console.log('setting up')
				
				editor.on('init', function(e) {
				  console.log('Init!!!')
				});
			},
			height: 150,
			base_url: '/tinymce',
			suffix: '.min',
			inline: this.inline1,
			statusbar: false,
			browser_spellcheck: true,
			max_width: '200px',
			images_upload_credentials: false,
			menubar: false,
			convert_urls:true,
			relative_urls:false,
			remove_script_host:false,
			contextmenu: false,
			plugins: 'image link lists save media autolink hr paste quickbars',
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
			}
    };

    this.editorInitConfig2 = {
      selector: 'div#'+this.editorId1,
      setup: function(editor) {
				console.log('setting up')
				
				editor.on('init', function(e) {
				  console.log('Init!!!')
				});
			},
			height: 150,
			base_url: '/tinymce',
			suffix: '.min',
			inline: this.inline2,
			statusbar: false,
			browser_spellcheck: true,
			max_width: '200px',
			images_upload_credentials: false,
			menubar: false,
			convert_urls:true,
			relative_urls:false,
			remove_script_host:false,
			contextmenu: false,
			plugins: 'image link lists save media autolink hr paste quickbars',
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
			}
    };
    
  }

  setupEditor1() {
    console.log('setup called')

		var self = this;
		setTimeout(function() {
			var oldEditor = tinymce.get(self.editorId1);
      if(oldEditor) { oldEditor.remove(); }
      console.log(tinymce, self.editorInitConfig1)
      tinymce.init(self.editorInitConfig1);
      console.log('after init')
			setTimeout(function() {
        let elem = document.getElementById(self.editorId1);
        console.log(elem)
				if(elem) { elem.style.minHeight = self.minHeight+"px"; }
			});
		});

  }
  
  setupEditor2() {

		var self = this;
		setTimeout(function() {
			var oldEditor = tinymce.get(self.editorId2);
      if(oldEditor) { oldEditor.remove(); }
      tinymce.init(self.editorInitConfig2);
			setTimeout(function() {
        let elem = document.getElementById(self.editorId2);
				if(elem) { elem.style.minHeight = self.minHeight+"px"; }
			});
		});

	}

  showModal1() {
    this.isVisible1 = true;

		this.setupEditor1();
  }

  handleOk1() {
    this.isVisible1 = false;
  }

  handleCancel1() {
    this.handleOk1();
  }

  showModal2() {
    this.isVisible1 = true;

		this.setupEditor2();
  }

  handleOk2() {
    this.isVisible2 = false;
  }

  handleCancel2() {
    this.handleOk2();
  }

}
