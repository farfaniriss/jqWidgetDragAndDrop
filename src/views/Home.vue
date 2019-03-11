<template>
  <div>
      <table class="table table-bordered">
          <thead>
              <tr>
                  <th>FORWARDER</th>
                  <th>SERVICES</th>
                  <th>DIVISIONS</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(forwarder, key) in forwarders" :key="key">
                  <td>
                      <h4>{{ forwarder.forwarderId }}</h4>
                      <h5>{{ forwarder.name }}</h5>
                  </td>
                  <td>
                      <table class="table table-borderless table-hover">
                        <tbody>
                            <JqxDragDrop v-for="(service, key) in forwarder.services" :data="service" :key="key"
                                :opacity="opacity"
                                @dragging="onDragging($event)"
                                :onTargetDrop="onTargetDrop"
                                :dropAction="'none'"
                                :dropTarget="'.drop-target'"
                                :restricter="restricter"
                                >
                            <tr>
                                <td style="width: 1%; font-weight:bold;">{{ service.code }}</td>
                                <td style="width: 1%">{{ service.name }}</td>
                                <td style="width: 1%">{{ service.description }}</td>
                            </tr>
                            </JqxDragDrop>
                        </tbody>
                    </table>
                  </td>

                  <td>
                    <table class="table table-borderless table-hover">
                        <tbody>
                        <div v-for="(division, key) in forwarder.divisions" :key="key" > 
                            <tr class='drop-target' :id="division.code">
                                <td style="width: 1%; font-weight:bold;">{{ division.code }}</td>
                                <td style="width: 1%">{{ division.name }}</td>
                                <td style="width: 1%">{{ division.countryCode }}</td>
                            </tr>
                        <table>
                            <tbody>
                            <tr class="row-aligned" v-for="(service, key) in division.services" :key="key">
                                <td> 
                                    <i class="fas fa-play element-aligned" style="font-size: 10px;" ></i>
                                    {{ service.name }}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        </tbody>
                    </table>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Service } from "@/types/Service";
import { Division } from "@/types/Division";
import { Forwarder } from "@/types/Forwarder";
import JqxDragDrop from "jqwidgets-scripts/jqwidgets-vue/vue_jqxdragdrop.vue";

@Component({
  components: {
    JqxDragDrop
  },
})

export default class About extends Vue {

    forwarders: Array<Forwarder> = [
        {
            forwarderId: 'F01', name: 'DHL SUPPLY CHAIN', 
            services: [ 
                { code: 'S_0_1', name: 'Express service', description: 'Description 01', forwarderId: 'F01' },
                { code: 'S_0_2', name: 'Standard service', description: 'Description 02', forwarderId: 'F01' },
                { code: 'S_0_3', name: 'Another service', description: 'Description 03', forwarderId: 'F01' },
                { code: 'S_0_4', name: 'Random service', description: 'Description 04', forwarderId: 'F01' },
                { code: 'S_0_5', name: 'Awesome service', description: 'Description 05', forwarderId: 'F01' },
                { code: 'S_0_6', name: 'Wonderful service', description: 'Description 06', forwarderId: 'F01' },
                { code: 'S_0_7', name: 'Useless service', description: 'Description 07', forwarderId: 'F01' },
                { code: 'S_0_8', name: 'Do not buy me service', description: 'Description 08', forwarderId: 'F01' }
                ], 
            divisions: [
                { code: 'DD1', name: 'DHI', countryCode: '51', services: Array<Service>(), forwarderId: 'F01' },
                { code: 'DD2', name: 'DHT', countryCode: '08', services: Array<Service>(), forwarderId: 'F01' },
                { code: 'DD3', name: 'DHF', countryCode: '07', services: Array<Service>(), forwarderId: 'F01' },
                { code: 'DD4', name: 'DHP', countryCode: '09', services: Array<Service>(), forwarderId: 'F01' },
                { code: 'DD5', name: 'DHQ', countryCode: '05', services: Array<Service>(), forwarderId: 'F01' }
                ]
        },
        {
            forwarderId: 'F02', name: 'SINOTRANS LTD.', 
            services: [ 
                { code: 'S_0_1', name: 'Amazing service', description: 'Description 01', forwarderId: 'F02' },
                { code: 'S_0_2', name: 'Another service', description: 'Description 02', forwarderId: 'F02' },
                { code: 'S_0_3', name: 'Random service', description: 'Description 03', forwarderId: 'F02' },
                { code: 'S_0_4', name: 'Random service', description: 'Description 04', forwarderId: 'F02' },
                { code: 'S_0_5', name: 'Standard service', description: 'Description 05', forwarderId: 'F02' },
                { code: 'S_0_6', name: 'Wonderful service', description: 'Description 06', forwarderId: 'F02' }
            ],
            divisions: [
                { code: 'DD6', name: 'SIN1', countryCode: '51', services: Array<Service>(), forwarderId: 'F02' },
                { code: 'DD7', name: 'SIN2', countryCode: '08', services: Array<Service>(), forwarderId: 'F02' },
                { code: 'DD8', name: 'SIN3', countryCode: '07', services: Array<Service>(), forwarderId: 'F02' },
                { code: 'DD9', name: 'SIN4', countryCode: '09', services: Array<Service>(), forwarderId: 'F02' },
                { code: 'DD10', name: 'SIN5', countryCode: '05', services: Array<Service>(), forwarderId: 'F02' }
            ]
        },
    ];

    targetService = '';
    targetDivision = '';
    targetForwarder = '';
    opacity = 0.6;
    restricter = { left: 500, top: 100, width: 500, height: 1200 };

    onTargetDrop(event: any) {
        this.targetDivision = event[0].id;
        this.sendServiceData(this.targetService);
    }

    onDragging(event: any) {
        this.targetService = event.args.code;
        this.targetForwarder = event.args.forwarderId;
    }
    
    sendServiceData(id: string) {

        let forwarderId = this.targetForwarder;
        let divisionId = this.targetDivision;
        let forwarderIndex = this.forwarders.findIndex(x => x.forwarderId === forwarderId);
        
        var myService = this.forwarders[forwarderIndex].services.filter(function(service) {
            return service.code === id;
        });

        let divisionIndex = this.forwarders[forwarderIndex].divisions.findIndex(x => x.code === divisionId);

        this.forwarders[forwarderIndex].divisions[divisionIndex].services.push(myService[0]);
    }
}
</script>

<style>
.horizontal-aligned {
    display: inline-block;
    width: 50%;
}

.row-aligned {
        vertical-align: middle;
    }

    .element-aligned {
        padding-left: 15px;
    }

</style>
